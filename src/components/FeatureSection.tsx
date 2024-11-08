import { useEffect, useState } from 'react';
import TicketEnum from '../enums/ActivityEnum';
import TicketCard from './TicketCard';
import { IActivity } from '../interfaces/IActivity';
import ArrowRightYellowImage from '../assets/images/arrow-right-yellow.png';
import { Link } from 'react-router-dom';
import { backend_movie } from '../declarations/backend_movie';
import ActivityEnum from '../enums/ActivityEnum';
import { backend_tourist_attraction } from '../declarations/backend_tourist_attraction';
import { backend_concert } from '../declarations/backend_concert';
import { backend_activity } from '../declarations/backend_activity';
import LoadingSpinner from './LoadingSpinner';
import { backend_actor } from '../declarations/backend_actor';
import { backend_concert_ticket_type } from '../declarations/backend_concert_ticket_type';
import { fetchActivities } from '../services/ActivitiesService';

interface IProps {
  title?: string;
  description?: string;
  ticketType: TicketEnum;
}

function FeatureSection({ title, description, ticketType }: IProps) {
  const [tickets, setTickets] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State to track loading

  useEffect(() => {
    async function fetchData() {
      const updatedActivities = await fetchActivities();
      if (updatedActivities) {
        setTickets(updatedActivities);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredTickets = tickets.filter(
    (ticket) => ticket.activityType === ticketType,
  );

  return (
    <section className="mt-24 text-customWhite flex justify-center items-center flex-col">
      <span className="text-5xl min-h-16 text-center font-bold bg-gradient-to-r from-customLightPurple to-customLightYellow bg-clip-text text-transparent">
        {title}
      </span>
      <p className="text-sm font-medium mt-4 text-center px-8">{description}</p>
      <div className="mt-16 flex flex-col gap-4">
        {loading ? (
          <LoadingSpinner />
        ) : filteredTickets.length === 0 ? (
          <p className="text-center text-xl font-semibold text-customLightYellow">
            No tickets available.
          </p>
        ) : (
          <>
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
              {filteredTickets.slice(0, 4).map((ticket, index) => (
                <TicketCard key={index} ticket={ticket} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default FeatureSection;
