import { useState, useEffect } from 'react';

// Area Import Component
import TicketCard from '../../components/TicketCard';
import FilterOptions from '../../components/FilterOptions';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/LoadingSpinner';
import Unauthorized from '../../components/Unauthorized';

// Area Import Interfaces
import { fetchActivities } from '../../services/ActivitiesService';
import { useUserContext } from '../../contexts/UserContext';
import { IActivity } from '../../interfaces/IActivity';

function Tickets() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ticketsPerPage] = useState<number>(10);
  const [tickets, setTickets] = useState<IActivity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUserContext();

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
    window.scrollTo(0, 0);
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
        className="flex flex-col gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {user ? (
          <div className="min-h-screen bg-customBlack text-customWhite p-4">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder={'search your ticket'}
            />
            <div className="flex justify-between items-center mb-4">
              <div className="hidden md:block">
                <FilterOptions
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
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
        ) : (
          <Unauthorized />
        )}
      </motion.section>
    </>
  );
}

export default Tickets;
