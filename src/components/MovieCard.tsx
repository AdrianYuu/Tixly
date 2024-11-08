import { IActivity } from '../interfaces/IActivity';
import LocationImage from '../assets/images/location.png';
import CalendarImage from '../assets/images/calendar.png';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { changeBlobToUrl } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { backend_favorite } from '../declarations/backend_favorite';
import { useUserContext } from '../contexts/UserContext';
import { useEffect, useState } from 'react';

interface IProps {
  ticket: IActivity;
  isTicketOwned?: boolean;
  transaction?: any;
}

function MovieCard({ ticket, isTicketOwned, transaction }: IProps) {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [principalIds, setPrincipalIds] = useState<string[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);

  function handleNavigate() {
    if (isTicketOwned) {
      navigate(`/my-ticket-detail/${ticket?.id}`, { state: { transaction } });
    } else {
      navigate(`/ticket-detail/${ticket?.id}`);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const response: any = await backend_favorite.getUserFavorites(
        BigInt(ticket.id!),
      );
      if (response.ok) {
        setPrincipalIds(response.ok[1]);
      }
    }
    fetchData();
  }, [ticket.id]);

  useEffect(() => {
    if (!user) return;

    if (principalIds.includes(user!.principalId)) {
      setIsFavorited(true);
    }
  }, [principalIds, user]);

  async function handleHeartClick(event: React.MouseEvent) {
    event.stopPropagation();
    if (isFavorited) {
      await backend_favorite.removeFavorite(
        user!.principalId,
        BigInt(ticket!.id!),
      );
      setIsFavorited(false);
      setPrincipalIds(principalIds.filter((id) => id !== user!.principalId));
    } else {
      await backend_favorite.createFavorite({
        id: BigInt(0),
        principalId: user!.principalId,
        activityId: BigInt(ticket!.id!),
      });
      setIsFavorited(true);
      setPrincipalIds([...principalIds, user!.principalId]);
    }
  }

  return (
    <div
      className="bg-customDarkGrey rounded-3xl max-w-96 h-[32rem]"
      onClick={handleNavigate}
    >
      <img
        src={changeBlobToUrl(ticket.image!)}
        alt=""
        className="h-60 w-96 object-cover rounded-3xl"
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
        
        {user ? (
          <div onClick={handleHeartClick}>
            {isFavorited ? (
              <SolidHeartIcon className="w-6 h-6 text-red-500" />
            ) : (
              <OutlineHeartIcon className="w-6 h-6 text-customLightGrey" />
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default MovieCard;
