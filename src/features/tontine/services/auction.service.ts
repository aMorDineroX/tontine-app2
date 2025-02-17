export class AuctionService {
  static async createAuction(tontineId: string, roundNumber: number) {
    const tontine = await prisma.tontine.findUnique({
      where: { 
        id: tontineId,
        type: 'AUCTION' 
      },
      include: { members: true }
    });

    if (!tontine) throw new Error('Tontine not found or not auction type');

    return await prisma.auction.create({
      data: {
        tontineId,
        roundNumber,
        startDate: new Date(),
        endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h duration
        baseAmount: tontine.amount,
        status: 'ACTIVE'
      }
    });
  }

  static async placeBid(auctionId: string, memberId: string, amount: number) {
    const auction = await prisma.auction.findUnique({
      where: { id: auctionId },
      include: {
        tontine: {
          include: { members: true }
        },
        bids: {
          orderBy: { amount: 'desc' },
          take: 1
        }
      }
    });

    if (!auction || auction.status !== 'ACTIVE') {
      throw new Error('Auction not found or not active');
    }

    // Vérifier si le montant est supérieur à l'enchère précédente
    if (auction.bids.length > 0 && amount <= auction.bids[0].amount) {
      throw new Error('Bid amount must be higher than current highest bid');
    }

    // Créer l'enchère
    const bid = await prisma.bid.create({
      data: {
        auctionId,
        memberId,
        amount,
        date: new Date()
      }
    });

    // Notifier les autres membres
    await NotificationService.notifyNewBid(auctionId, bid.id);

    return bid;
  }

  static async finalizeAuction(auctionId: string) {
    const auction = await prisma.auction.findUnique({
      where: { id: auctionId },
      include: {
        bids: {
          orderBy: { amount: 'desc' },
          take: 1,
          include: { member: true }
        }
      }
    });

    if (!auction) throw new Error('Auction not found');

    const winningBid = auction.bids[0];
    if (!winningBid) throw new Error('No bids found');

    // Mettre à jour l'enchère
    await prisma.auction.update({
      where: { id: auctionId },
      data: {
        status: 'COMPLETED',
        winningBid: winningBid.amount,
        winnerId: winningBid.memberId
      }
    });

    // Distribuer les gains
    await this.distributeAuctionGains(auction.id, winningBid.amount);
  }
}