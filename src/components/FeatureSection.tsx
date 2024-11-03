import { useEffect, useState } from 'react';
import TicketEnum from '../enums/TicketEnum';
import TicketCard from './TicketCard';
import { ITicket } from '../interfaces/ITicket';
import { TICKET_LIST } from '../configs/TicketConfig';
import ArrowRightYellowImage from '../assets/images/arrow-right-yellow.png';
import { Link } from 'react-router-dom';

interface IProps {
  title?: string;
  description?: string;
  ticketType: TicketEnum;
}

function FeatureSection({ title, description, ticketType }: IProps) {
  const [tickets, setTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    setTickets(
      TICKET_LIST.filter((ticket) => ticket.ticketType === ticketType),
    );
  }, []);

  return (
    <section className="mt-24 text-customWhite flex justify-center items-center flex-col">
      <span className="text-5xl min-h-16 text-center font-bold bg-gradient-to-r from-customLightPurple to-customLightYellow bg-clip-text text-transparent">
        {title}
      </span>
      <p className="text-sm font-medium mt-4 text-center px-8">{description}</p>
      <div className="mt-16 flex flex-col gap-4">
        <Link
          to="/tickets"
          className="flex items-center gap-2 justify-end pe-16 cursor-pointer"
        >
          <p className="text-base font-semibold hover:underline underline-offset-4 text-customLightYellow">
            See All
          </p>
          <img src={ArrowRightYellowImage} alt="" className="w-5 h-5" />
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-16 ">
          {tickets.map((ticket, index) => (
            <TicketCard key={index} ticket={ticket} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
