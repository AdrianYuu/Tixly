import { useState, useEffect } from 'react';
import TicketCard from '../../components/TicketCard';
import FilterOptions from '../../components/FilterOptions';
import SearchBar from '../../components/SearchBar';
import SortOptions from '../../components/SortOptions';
import Pagination from '../../components/Pagination';
import { IActivity } from '../../interfaces/IActivity';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { backend_activity } from '../../declarations/backend_activity';
import { backend_tourist_attraction } from '../../declarations/backend_tourist_attraction';
import ActivityEnum from '../../enums/ActivityEnum';
import { backend_movie } from '../../declarations/backend_movie';
import { backend_concert } from '../../declarations/backend_concert';

function Tickets() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('date');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ticketsPerPage] = useState<number>(10);
  const [tickets, setTickets] = useState<IActivity[] | null>(null);

  const applyFiltersAndSorting = () => {
    if (!tickets) return [];

    const filteredTickets = tickets.filter((ticket: IActivity) => {
      const matchesFilter =
        activeFilter === 'All' || ticket.activityType === activeFilter;
      const matchesSearch = ticket.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    const sortedTickets = [...filteredTickets].sort((a, b) => {
      if (sortOption === 'priceLowToHigh') {
        return (
          (a.concert?.ticketTypeList[0]?.price || 0) -
          (b.concert?.ticketTypeList[0]?.price || 0)
        );
      } else if (sortOption === 'priceHighToLow') {
        return (
          (b.concert?.ticketTypeList[0]?.price || 0) -
          (a.concert?.ticketTypeList[0]?.price || 0)
        );
      } else if (sortOption === 'date') {
        return (
          new Date(a.concert?.concertDate || '').getTime() -
          new Date(b.concert?.concertDate || '').getTime()
        );
      }
      return 0;
    });

    return sortedTickets;
  };

  const totalPages = Math.ceil(
    applyFiltersAndSorting().length / ticketsPerPage,
  );
  const paginatedTickets = applyFiltersAndSorting().slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery, sortOption]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response: any = await backend_activity.getActivities();
        if ('ok' in response) {
          const activities: IActivity[] = response.ok[1];

          const updatedActivities = await Promise.all(
            activities.map(async (activity) => {
              if (
                activity.activityType === ActivityEnum.TOURIST_ATTRACTION &&
                activity.id
              ) {
                const touristAttractionResponse: any =
                  await backend_tourist_attraction.getTouristAttractionByActivityId(
                    activity.id,
                  );

                if ('ok' in touristAttractionResponse) {
                  activity.touristAttraction = touristAttractionResponse.ok[1];
                } else {
                  console.error(
                    'Failed to fetch tourist attraction:',
                    touristAttractionResponse.err,
                  );
                }
              }

              if (activity.activityType === ActivityEnum.MOVIE && activity.id) {
                const movieResponse: any =
                  await backend_movie.getMovieByActivityId(activity.id);
                if ('ok' in movieResponse) {
                  activity.movie = movieResponse.ok[1];
                } else {
                  console.error('Failed to fetch movie:', movieResponse.err);
                }
              }

              if (
                activity.activityType === ActivityEnum.CONCERT &&
                activity.id
              ) {
                const concertResponse: any =
                  await backend_concert.getConcertByActivityId(activity.id);
                if ('ok' in concertResponse) {
                  activity.concert = concertResponse.ok[1];
                } else {
                  console.error(
                    'Failed to fetch concert:',
                    concertResponse.err,
                  );
                }
              }

              return activity;
            }),
          );
          setTickets(updatedActivities);
        } else {
          console.error('Failed to fetch activities:', response.err);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Tixly | Tickets</title>
      </Helmet>

      <motion.section
        className="flex flex-col gap-2 px-16 mt-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="min-h-screen bg-customBlack text-customWhite p-4">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder={'where you want to go?'}
          />
          <div className="flex justify-between items-center mb-4">
            <div className="hidden md:block">
              <FilterOptions
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            </div>
            <div className="hidden md:block">
              <SortOptions onSortChange={setSortOption} />
            </div>
          </div>
          <div className="md:hidden mb-4 flex lg:justify-start ml-2 justify-center">
            <FilterOptions
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
          <div className="md:hidden mb-8 flex lg:justify-start justify-center">
            <SortOptions onSortChange={setSortOption} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-4 place-items-center">
            {paginatedTickets.map((ticket, index) => (
              <TicketCard key={index} ticket={ticket} />
            ))}
          </div>

          <br />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </motion.section>
    </>
  );
}

export default Tickets;
