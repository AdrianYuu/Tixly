import TicketDetailEnum from "../enums/TicketDetailEnum";
import IConcert from "./IConcert";
import IMovie from "./IMovie";
import ITouristAttraction from "./ITouristAttraction";

interface ITicketDetail {
  name: string;
  description: string;
  image: string;
  address: string;
  ticketDetailType: TicketDetailEnum;
  concert?: IConcert;
  movie?: IMovie;
  touristAttraction?: ITouristAttraction;
}

export default ITicketDetail