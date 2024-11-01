import { ITicket } from '../interfaces/ITicket';
import TicketEnum from '../enums/TicketEnum';
import ConcertCard from './ConcertCard';
import MovieCard from './MovieCard';
import TouristAttractionCard from './TouristAttractionCard';

interface IProps {
  ticket: ITicket;
}

function TicketCard({ ticket }: IProps) {
  return (
    <>
      {ticket.ticketType === TicketEnum.CONCERT && (
        <ConcertCard ticket={ticket} />
      )}
      {ticket.ticketType === TicketEnum.MOVIE && <MovieCard ticket={ticket} />}
      {ticket.ticketType === TicketEnum.TOURIST_ATTRACTION && (
        <TouristAttractionCard ticket={ticket} />
      )}
    </>
  );
}

export default TicketCard;
