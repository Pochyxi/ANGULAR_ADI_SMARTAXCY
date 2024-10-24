import { User } from './User';

// RISPOSTA DEL SERVER AL LOGIN
export interface JwtAuthResponseInterface {
  accessToken: string;

  tokenType: string;

  user: User;
}
