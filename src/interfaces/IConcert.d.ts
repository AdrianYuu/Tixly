interface ITicketType {
  ticketTypeId: string;
  name: string;
  price: number;
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
