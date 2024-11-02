import React from 'react';
import { ITicket } from '../interfaces/ITicket';
import LocationImage from '../assets/images/location.png';
import CalendarImage from '../assets/images/calendar.png';
import FavoriteNotActiveImage from '../assets/images/favorite-not-active.png';
import { formatDate } from '../lib/utils';

interface IProps {
  ticket: ITicket;
  style?: string;
}

function FestivalCard({ ticket, style = "" }: IProps) {
  return (
    <div className={`bg-customDarkGrey rounded-2xl max-w-[280px] relative ${style}`}>
      <div className="relative">
        <img 
          src={ticket.imageUrl} 
          alt="" 
          className="h-48 w-full object-cover rounded-t-2xl"
        />
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold text-white">
            {ticket.name}
          </h2>
          <div className="bg-purple-600 rounded-full p-1.5">
            <img 
              src={FavoriteNotActiveImage} 
              alt="" 
              className="w-5 h-5"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <img src={LocationImage} alt="" className="w-5 h-5 opacity-60" />
          <p className="text-gray-400 text-sm">
            {ticket.address}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <img src={CalendarImage} alt="" className="w-5 h-5" />
          <p className="text-yellow-400 text-sm">
            {formatDate(ticket.concert.concertDate)}
          </p>
        </div>

        <p className="text-purple-400 text-sm font-medium">
          {/* {ticket.festival.section} - {ticket.festival.row} */}
          FESTIVAL - 2
        </p>

        <div className="space-y-1">
          <p className="text-gray-400 text-sm">
            Booking Code
          </p>
          <p className="text-white text-sm font-mono">
            {/* {ticket.festival.bookingCode} */}
            BK-0xA1B2-654321-9f4d2e
          </p>
        </div>
      </div>
    </div>
  );
}

export default FestivalCard;