import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

export interface UserPayload extends JwtPayload {
  id: string;
  email: string;
  name: string;
}
