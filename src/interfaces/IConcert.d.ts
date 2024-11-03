export interface ITicketType {
  id?: string;
  name: string;
  price: string;
  capacity: string;
}

export interface IConcert {
  concertDate: string;
  concertTime: string;
  concertLocation: string;
  venueImage: string;
  ticketTypeCount: number;
  startingDatePeriod: string;
  endDatePeriod: string;
  ticketTypeList: ITicketType[];
}
