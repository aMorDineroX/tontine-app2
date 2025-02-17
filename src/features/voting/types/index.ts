export interface Poll {  id: string;
  title: string;  description?: string;
  options: PollOption[];  endDate: Date;
  status: 'ACTIVE' | 'CLOSED';  type: 'SINGLE' | 'MULTIPLE';
}
export interface PollOption {  id: string;
  text: string;  voteCount: number;
}
export interface Vote {  pollId: string;
  optionId: string;  userId: string;
  createdAt: Date;
}










export interface Poll {
  id: string;
  title: string;
  description?: string;
  options: PollOption[];
  endDate: Date;
  status: 'ACTIVE' | 'CLOSED';
  type: 'SINGLE' | 'MULTIPLE';
}

export interface PollOption {
  id: string;
  text: string;
  voteCount: number;
}

export interface Vote {
  pollId: string;
  optionId: string;
  userId: string;
  createdAt: Date;
}
