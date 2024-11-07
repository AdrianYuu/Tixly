import { useState, useEffect } from 'react';
import TicketCard from '../../components/TicketCard';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import TabOptions from '../../components/TabOptions';
import { TICKET_LIST } from '../../configs/TicketConfig';
import { ITicket } from '../../interfaces/IActivity';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

function MyTickets() {
  const [activeTab, setActiveTab] = useState<string>('My Ticket');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('date');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ticketsPerPage] = useState<number>(10);

  const filteredTickets = TICKET_LIST.filter((ticket: ITicket) => {
    const matchesFilter =
      activeFilter === 'All' || ticket.ticketType === activeFilter;
    const matchesSearch = ticket.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortOption === 'priceLowToHigh') {
      return (
        (a.concert?.ticketTypeList[0].price || 0) -
        (b.concert?.ticketTypeList[0].price || 0)
      );
    } else if (sortOption === 'priceHighToLow') {
      return (
        (b.concert?.ticketTypeList[0].price || 0) -
        (a.concert?.ticketTypeList[0].price || 0)
      );
    } else if (sortOption === 'date') {
      return (
        new Date(a.concert?.concertDate || '').getTime() -
        new Date(b.concert?.concertDate || '').getTime()
      );
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedTickets.length / ticketsPerPage);
  const paginatedTickets = sortedTickets.slice(
    (currentPage - 1) * ticketsPerPage,
    currentPage * ticketsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery, sortOption]);

  return (
    <>
      <Helmet>
        <title>Tixly | My Tickets</title>
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
            placeholder={'search your tickets'}
          />
          <TabOptions activeTab={activeTab} onTabChange={setActiveTab} />
          {activeTab === 'My Ticket' && (
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
          )}

          {activeTab === 'Upcoming War' && (
            <div className="flex justify-center items-center h-full">
              <h2 className="text-xl text-customWhite">Upcoming War Content</h2>
            </div>
          )}
        </div>
      </motion.section>
    </>
  );
}

export default MyTickets;
