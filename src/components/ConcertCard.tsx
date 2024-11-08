import { IActivity } from '../interfaces/IActivity';
import LocationImage from '../assets/images/location.png';
import CalendarImage from '../assets/images/calendar.png';
import FestivalImage from '../assets/images/festival-rectangle.png';
import { changeBlobToUrl, formatDate, formatToRupiah } from '../lib/utils';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { backend_favorite } from '../declarations/backend_favorite';
import { useUserContext } from '../contexts/UserContext';

interface IProps {
  ticket?: IActivity;
  style?: string;
  isDummy?: boolean;
  isTicketOwned?: boolean;
  transaction?: any;
}

function ConcertCard({
  ticket,
  style,
  isDummy = false,
  isTicketOwned,
  transaction,
}: IProps) {
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
      if (ticket) {
        const response: any = await backend_favorite.getUserFavorites(
          BigInt(ticket.id!),
        );
        if (response.ok) {
          setPrincipalIds(response.ok[1]);
        }
      }
    }
    fetchData();
  }, [ticket]);

  useEffect(() => {
    if (!user) return;
    if (user && principalIds.includes(user.principalId)) {
      setIsFavorited(true);
    }
  }, [principalIds, user]);

  async function handleHeartClick(event: React.MouseEvent) {
    event.stopPropagation();
    if (!user || !ticket) return;

    if (isFavorited) {
      await backend_favorite.removeFavorite(
        user.principalId,
        BigInt(ticket.id!),
      );
      setIsFavorited(false);
      setPrincipalIds(principalIds.filter((id) => id !== user.principalId));
    } else {
      await backend_favorite.createFavorite({
        id: BigInt(0),
        principalId: user.principalId,
        activityId: BigInt(ticket.id!),
      });
      setIsFavorited(true);
      setPrincipalIds([...principalIds, user.principalId]);
    }
  }

  if (isDummy) {
    return (
      <div
        className={`bg-customDarkGrey rounded-3xl max-w-96 ${style} h-[30rem]`}
      >
        <img src={FestivalImage} alt="" className="h-60 w-96 rounded-3xl" />
        <div className="pb-20 p-5 flex justify-between">
          <div>
            <p className="text-customWhite text-xl font-semibold">
              WATERBOMB 2024 JAKARTA
            </p>
            <div className="flex gap-2 mt-4">
              <img src={LocationImage} alt="" className="w-5 h-5" />
              <p className="text-customWhite opacity-50 text-sm font-medium">
                Phantom Ground Park, PIK 2
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              <img src={CalendarImage} alt="" className="w-5 h-5" />
              <p className="text-customLightYellow text-sm font-medium">
                {formatDate('01/01/2024')}
              </p>
            </div>
            <p className="text-xl font-semibold text-customWhite mt-4">
              {formatToRupiah(100000)}
            </p>
          </div>
          <SolidHeartIcon className="w-6 h-6 text-red-500" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-customDarkGrey rounded-3xl max-w-96 ${style} h-[32rem]`}
      onClick={handleNavigate}
    >
      <img
        src={changeBlobToUrl(ticket!.image!)}
        alt=""
        className="h-60 w-96 object-cover rounded-3xl"
      />
      <div className="pb-20 p-5 flex justify-between">
        <div>
          <p className="text-customWhite text-xl font-semibold">
            {ticket!.name}
          </p>
          <div className="flex gap-2 mt-4">
            <img src={LocationImage} alt="" className="w-5 h-5" />
            <p className="text-customWhite opacity-50 text-sm font-medium">
              {ticket!.address}
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            <img src={CalendarImage} alt="" className="w-5 h-5" />
            <p className="text-customLightYellow text-sm font-medium">
              {formatDate(ticket!.concert.date)}
            </p>
          </div>
          <p className="text-xl font-semibold text-customWhite mt-4">
            {formatToRupiah(ticket!.concert.concertTicketTypes[0].price)}
          </p>
        </div>
        <div onClick={handleHeartClick}>
          {isFavorited ? (
            <SolidHeartIcon className="w-6 h-6 text-red-500" />
          ) : (
            <OutlineHeartIcon className="w-6 h-6 text-customLightGrey" />
          )}
        </div>
      </div>
    </div>
  );
}

export default ConcertCard;
