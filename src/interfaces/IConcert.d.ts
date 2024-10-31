interface ITicketType {
    name: string;
    price: number;
    quotas: number;
}

interface IConcert {
    concertDate: string;
    concertTime: string;
    concertLocation: string;
    venueImage: string;
    ticketTypeCount: number;
    startingDatePeriod: string;
    endDatePeriod: string;
    ticketTypeList: ITicketType[];
}

export { IConcert, ITicketType };