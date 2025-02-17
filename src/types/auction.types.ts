export interface AuctionBid {
  id: string;
  amount: number;
  userId: string;
  tontineId: string;
  roundNumber: number;
  timestamp: Date;
}

export interface AuctionRound {
  roundNumber: number;
  startDate: Date;
  endDate: Date;
  minimumBid: number;
  winner?: AuctionBid;
}