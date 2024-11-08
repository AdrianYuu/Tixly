import { IActivity } from './IActivity';

export interface ITransaction {
  bookingCode: string;
  bookingDate: string;

  ticketTypeNumber?: number;

  seatNumber?: string;

  principalId?: string;

  activity: IActivity;
}
