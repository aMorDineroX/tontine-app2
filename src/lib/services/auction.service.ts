import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuctionService {
  static async placeBid(auctionId: string, userId: string, amount: number) {
    const auction = await prisma.auction.findUnique({
      where: { id: auctionId },
      include: { bids: true }
    });

    if (!auction) throw new Error('Auction not found');
    if (auction.status !== 'ACTIVE') throw new Error('Auction is not active');
    if (amount <= auction.currentHighestBid) throw new Error('Bid must be higher than current highest bid');

    const bid = await prisma.auctionBid.create({
      data: {
        auctionId,
        userId,
        amount,
      }
    });

    return bid;
  }

  static async getCurrentRound(tontineId: string): Promise<AuctionRound> {
    const currentRound = await prisma.auctionRound.findFirst({
      where: {
        tontineId,
        status: 'ACTIVE'
      },
      include: {
        auction: true,
        winner: true
      }
    });

    if (!currentRound) throw new Error('No active auction round found');
    return currentRound;
  }

  static async getHighestBid(auctionId: string) {
    const highestBid = await prisma.auctionBid.findFirst({
      where: { auctionId },
      orderBy: { amount: 'desc' }
    });

    return highestBid;
  }
}
