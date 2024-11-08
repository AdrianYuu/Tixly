import { useState, useEffect } from 'react';

// Area Import Components
import TicketCard from '../../components/TicketCard';
import FilterOptions from '../../components/FilterOptions';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import { IActivity } from '../../interfaces/IActivity';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Unauthorized from '../../components/Unauthorized';
import LoadingSpinner from '../../components/LoadingSpinner';

// Area Import Backend Service
import { fetchActivityById } from '../../services/ActivitiesService';
import { backend_transaction } from '../../declarations/backend_transaction';
import { useUserContext } from '../../contexts/UserContext';

function MyTickets() {
  const { user } = useUserContext();

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ticketsPerPage] = useState<number>(10);
  const [tickets, setTickets] = useState<IActivity[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isTicketOwned = true;

  const [transactions, setTransactions] = useState<any[]>();

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

  const fetchUserTransactions = async (principalId: string) => {
    try {
      const response = await backend_transaction.getTransactionsByPrincipalId(
        principalId,
      );

      if ('ok' in response) {
        const transactionsData: any = response.ok[1];

        const updatedTransactions = await Promise.all(
          transactionsData.map(async (transaction: any) => {
            const activity = await fetchActivityById(transaction.activityId);
            if (activity) {
              transaction.activity = activity;
            }
            return transaction;
          }),
        );
        return updatedTransactions;
      } else {
        console.error('Failed to fetch transactions:', response.err);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const principalId = user?.principalId;
      const r = await fetchUserTransactions(principalId!);

      const mappedTickets = r
        ?.filter((transaction) => transaction.activity)
        .map((transaction) => transaction.activity);

      setTickets(mappedTickets!);
      setTransactions(r);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Tixly | Tickets</title>
      </Helmet>

      {user ? (
        <motion.section
          className="flex flex-col gap-2 px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
                {transactions &&
                transactions.length > 0 &&
                paginatedTickets &&
                paginatedTickets.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-4 place-items-center">
                      {paginatedTickets.map((ticket, index) => {
                        const relatedTransaction = transactions!.find(
                          (transaction: any) =>
                            transaction.activityId === ticket.id,
                        );

                        return (
                          <TicketCard
                            key={index}
                            ticket={ticket}
                            isTicketOwned={isTicketOwned}
                            transaction={relatedTransaction}
                          />
                        );
                      })}
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
      ) : (
        <Unauthorized />
      )}
    </>
  );
}

export default MyTickets;
