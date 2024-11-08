import { IActivity } from '../interfaces/IActivity';
import LocationImage from '../assets/images/location.png';
import CalendarImage from '../assets/images/calendar.png';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { changeBlobToUrl } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

interface IProps {
  ticket: IActivity;
}

function MovieCard({ ticket }: IProps) {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate(`/ticket-detail/${ticket?.id}`);
  }

  return (
    <div
      className="bg-customDarkGrey rounded-3xl max-w-96 min-h-[30rem]"
      onClick={handleNavigate}
    >
      <img
        src={changeBlobToUrl(ticket.image!)}
        alt=""
        className="h-60 w-96 rounded-3xl"
      />
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
              {ticket.movie?.ageRating}
            </div>
            <p className="text-customWhite opacity-50 text-sm font-medium">
              {ticket.movie?.genre}
            </p>
          </div>
        </div>
        <div className="">
          <SolidHeartIcon className="w-6 h-6 text-red-500" />
          {/* <OutlineHeartIcon className='w-6 h-6 text-customLightGrey'/> */}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
