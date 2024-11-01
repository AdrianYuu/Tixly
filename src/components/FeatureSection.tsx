import { useEffect, useState } from 'react';
import TicketEnum from '../enums/TicketEnum';
import TicketCard from './TicketCard';
import { ITicket } from '../interfaces/ITicket';
import { TICKET_LIST } from '../configs/TicketConfig';

interface IProps {
  title: string;
  description: string;
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 px-16">
        {tickets.map((ticket, index) => (
          <TicketCard key={index} ticket={ticket} />
        ))}
      </div>
    </section>
  );
}

export default FeatureSection;
