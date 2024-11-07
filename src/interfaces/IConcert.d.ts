export interface IConcertTicketType {
  id?: bigint;
  name: string;
  price: string;
  capacity: string;

  // Reference
  concertId?: bigint;
}

export interface IConcert {
  id?: bigint;
  date: string;
  time: string;
  location: string;
  venueImage: string;
  concertTicketTypeCount: number;
  salesStartDate: string;
  salesEndDate: string;
  activityId?: bigint;

  concertTicketTypes: ITicketType[];
}
