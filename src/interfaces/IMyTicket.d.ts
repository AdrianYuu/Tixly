import Ticket from '../components/Ticket';

interface IMyTicket {
  bookingCode: string;
  bookingDate: string;

  // Kalau ticketnya concert
  ticketTypeNumber?: number;

  // Kalau ticketnya movie (A1, A2, .., L12)
  seatNumber?: string;

  ticket: Ticket;
}
