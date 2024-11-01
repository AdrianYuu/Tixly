import { ITicket } from '../interfaces/ITicket';
import LocationImage from '../assets/images/location.png';
import CalendarImage from '../assets/images/calendar.png';
import FavoriteNotActiveImage from '../assets/images/favorite-not-active.png';

interface IProps {
  ticket: ITicket;
}

function MovieCard({ ticket }: IProps) {
  return (
    <div className="bg-customDarkGrey rounded-3xl max-w-96">
      <img src={ticket.imageUrl} alt="" className="h-60 w-96 rounded-3xl" />
      <div className="pb-20 p-5 flex justify-between">
        <div>
          <p className="text-customWhite text-xl font-semibold">
            {ticket.name}
          </p>
          <div className="flex gap-2 mt-4">
            <img src={LocationImage} alt="" className="w-5 h-5" />
            <p className="text-customWhite opacity-50 text-sm font-medium">
              {ticket.movie?.cinemaName}
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            <img src={CalendarImage} alt="" className="w-5 h-5" />
            <p className="text-customLightYellow text-sm font-medium">
              {ticket.movie?.date} | {ticket.movie?.time}
            </p>
          </div>
          <div className="flex mt-4 items-center gap-3">
            <div className="bg-customLightPurple px-1 py-1.5 min-w-20 rounded-lg flex justify-center text-sm font-medium text-customWhite">
              {ticket.movie?.ratingAge}
            </div>
            <p className="text-customWhite opacity-50 text-sm font-medium">
              {ticket.movie?.movieGenre.join(', ')}
            </p>
          </div>
        </div>
        <div className="">
          <img src={FavoriteNotActiveImage} alt="" />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
