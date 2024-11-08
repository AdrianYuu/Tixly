import { IActivity } from '../interfaces/IActivity';
import TicketEnum from '../enums/ActivityEnum';
import ConcertCard from './ConcertCard';
import MovieCard from './MovieCard';
import TouristAttractionCard from './TouristAttractionCard';
import { useNavigate } from 'react-router-dom';

interface IProps {
  ticket: IActivity;
  isTicketOwned?: boolean;
  transaction?: any;
}

function TicketCard({ ticket, isTicketOwned, transaction }: IProps) {
  return (
    <>
      {ticket.activityType === TicketEnum.CONCERT && (
        <ConcertCard
          ticket={ticket}
          isTicketOwned={isTicketOwned}
          transaction={transaction}
        />
      )}
      {ticket.activityType === TicketEnum.MOVIE && (
        <MovieCard
          ticket={ticket}
          isTicketOwned={isTicketOwned}
          transaction={transaction}
        />
      )}
      {ticket.activityType === TicketEnum.TOURIST_ATTRACTION && (
        <TouristAttractionCard
          ticket={ticket}
          isTicketOwned={isTicketOwned}
          transaction={transaction}
        />
      )}
    </>
  );
}

export default TicketCard;
