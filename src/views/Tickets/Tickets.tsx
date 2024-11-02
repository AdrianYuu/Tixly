import React, { useState, useEffect } from 'react';
import TicketCard from '../../components/TicketCard';
import FilterOptions from '../../components/FilterOptions';
import SearchBar from '../../components/SearchBar';
import SortOptions from '../../components/SortOptions';
import Pagination from '../../components/Pagination';
import { TICKET_LIST } from '../../configs/TicketConfig';
import { ITicket } from '../../interfaces/ITicket';

function Tickets() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('date');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ticketsPerPage] = useState<number>(8);

  const filteredTickets = TICKET_LIST.filter((ticket: ITicket) => {
    const matchesFilter = activeFilter === 'All' || ticket.ticketType === activeFilter;
    const matchesSearch = ticket.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortOption === 'priceLowToHigh') {
      return (a.concert?.ticketTypeList[0].price || 0) - (b.concert?.ticketTypeList[0].price || 0);
    } else if (sortOption === 'priceHighToLow') {
      return (b.concert?.ticketTypeList[0].price || 0) - (a.concert?.ticketTypeList[0].price || 0);
    } else if (sortOption === 'date') {
      return new Date(a.concert?.concertDate || '').getTime() - new Date(b.concert?.concertDate || '').getTime();
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedTickets.length / ticketsPerPage);
  const paginatedTickets = sortedTickets.slice((currentPage - 1) * ticketsPerPage, currentPage * ticketsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery, sortOption]);

  return (
    <div className="min-h-screen bg-customBlack text-customWhite p-4">
      <SearchBar onSearch={setSearchQuery} />
      
      <div className="flex justify-between items-center mb-6">
        <FilterOptions activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <SortOptions onSortChange={setSortOption} />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
        {paginatedTickets.map((ticket, index) => (
          <TicketCard key={index} ticket={ticket} />
        ))}
      </div>
      
      <br />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default Tickets;
