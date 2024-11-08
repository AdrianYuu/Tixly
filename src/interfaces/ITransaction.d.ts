import { IActivity } from './IActivity';

export interface ITransaction {
  bookingCode: string;
  bookingDate: string;

  // Kalau ticketnya concert
  ticketTypeNumber?: number;

  // Kalau ticketnya movie (A1, A2, .., L12)
  seatNumber?: string;

  principalId?: string;

  activity: IActivity;
}
