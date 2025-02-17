export class AuctionService {
  placeBid(tontineId: string, amount: number): Promise<AuctionBid>;
  getCurrentRound(tontineId: string): Promise<AuctionRound>;
  getWinningBid(tontineId: string, roundNumber: number): Promise<AuctionBid>;
}