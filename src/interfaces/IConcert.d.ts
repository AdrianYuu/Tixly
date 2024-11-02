interface ITicketType {
  id: string;
  name: string;
  price: string;
  quotas: number;
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
