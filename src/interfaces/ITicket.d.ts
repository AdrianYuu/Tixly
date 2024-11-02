import TicketEnum from '../enums/TicketEnum';
import IConcert from './IConcert';
import IMovie from './IMovie';
import ITouristAttraction from './ITouristAttraction';

export interface ITicket {
  name: string;
  description: string;
  imageUrl: string;
  address: string;
  ticketType: TicketEnum;
  concert?: IConcert;
  movie?: IMovie;
  touristAttraction?: ITouristAttraction;
}
