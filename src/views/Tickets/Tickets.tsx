import { useState, useEffect } from 'react';
import TicketCard from '../../components/TicketCard';
import FilterOptions from '../../components/FilterOptions';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import { IActivity } from '../../interfaces/IActivity';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { backend_activity } from '../../declarations/backend_activity';
import { backend_tourist_attraction } from '../../declarations/backend_tourist_attraction';
import ActivityEnum from '../../enums/ActivityEnum';
import { backend_movie } from '../../declarations/backend_movie';
import { backend_concert } from '../../declarations/backend_concert';
import { backend_user } from '../../declarations/backend_user';
import { backend_concert_ticket_type } from '../../declarations/backend_concert_ticket_type';
import { backend_actor } from '../../declarations/backend_actor';
import LoadingSpinner from '../../components/LoadingSpinner';
import { fetchActivities } from '../../services/ActivitiesService';
import { useParams } from 'react-router-dom';

function Tickets() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('date');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ticketsPerPage] = useState<number>(10);
  const [tickets, setTickets] = useState<IActivity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { search } = useParams<{ search: string }>();

  const applyFilters = () => {
    if (!tickets) return [];

    const filteredTickets = tickets.filter((ticket: IActivity) => {
      const matchesFilter =
        activeFilter === 'All' || ticket.activityType === activeFilter;
      const matchesSearch = ticket.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    return filteredTickets;
  };

  const totalPages = Math.ceil(applyFilters().length / ticketsPerPage);
  const paginatedTickets = applyFilters().slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery, sortOption]);

  useEffect(() => {
    if (search) {
      setSearchQuery(search);
    }
  }, [location.search]);

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

  return (
    <>
      <Helmet>
        <title>Tixly | Tickets</title>
      </Helmet>

      <motion.section
        className="flex flex-col gap-2 px-4 mt-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
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
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {paginatedTickets && paginatedTickets.length > 0 ? (
                <>
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
                </>
              ) : (
                <p className="text-center text-xl text-customWhite mt-12">
                  No tickets available for the selected filters and search.
                </p>
              )}
            </>
          )}
        </div>
      </motion.section>
    </>
  );
}

export default Tickets;
