import { IActivity } from '../interfaces/IActivity';
import TicketEnum from '../enums/ActivityEnum';
import ConcertCard from './ConcertCard';
import MovieCard from './MovieCard';
import TouristAttractionCard from './TouristAttractionCard';

interface IProps {
  ticket: IActivity;
}

function TicketCard({ ticket }: IProps) {
  return (
    <>
      {ticket.activityType === TicketEnum.CONCERT && (
        <ConcertCard ticket={ticket} />
      )}
      {ticket.activityType === TicketEnum.MOVIE && (
        <MovieCard ticket={ticket} />
      )}
      {ticket.activityType === TicketEnum.TOURIST_ATTRACTION && (
        <TouristAttractionCard ticket={ticket} />
      )}
    </>
  );
}

export default TicketCard;
