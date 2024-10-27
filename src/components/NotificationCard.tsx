import { NotificationImages } from '../configs/NotificationConfig';
import NotificationStatus from '../enums/NotificationStatusEnum';
import { getTimeDifference, isToday } from '../lib/utils';

interface IProps {
  name: string;
  date: string;
  status: NotificationStatus;
}

function NotificationCard({ name, date, status }: IProps) {
  let message;

  switch (status) {
    case NotificationStatus.PAYMENT_ACTIVE:
      message = (
        <>
          🎉 Payment Successful! Your order for{' '}
          <span className="font-bold">
            <span className="text-customLightPurple">{name}</span> tickets is
            confirmed!
          </span>{' '}
          Check the “My Ticket” menu for ticket details and get ready for an
          unforgettable experience. 🎫✨
        </>
      );
      break;
    case NotificationStatus.PAYMENT_INACTIVE:
      message = (
        <>
          🎉 The Ticket War for{' '}
          <span className="font-bold">
            <span className="text-customLightPurple">{name}</span> is now LIVE!
          </span>{' '}
          Secure your spot at the most exciting event of the year – grab your
          tickets before they're gone! 🚀🌊 Don't miss out!
        </>
      );
      break;
    case NotificationStatus.TICKETWAR_ACTIVE:
      message = (
        <>
          🚨 Ticket War! Your order for{' '}
          <span className="font-bold">
            <span className="text-customLightPurple">{name}</span> tickets is
            now active!
          </span>
        </>
      );
      break;
    case NotificationStatus.TICKETWAR_INACTIVE:
      message = (
        <>
          🚨 Ticket War! Your order for{' '}
          <span className="font-bold">
            <span className="text-customLightPurple">{name}</span> tickets is
            now active!
          </span>
        </>
      );
      break;
    case NotificationStatus.PRESALE:
      message = (
        <>
          ⏰ Pre-Sale Countdown! Our exclusive pre-sale for{' '}
          <span className="font-bold">
            <span className="text-customLightPurple">{name}</span> starts soon.
            Be ready to claim your tickets before the general public!
          </span>
        </>
      );
      break;
    default:
      message = 'Testing passive';
  }

  return (
    <div
      className={`flex w-full ${
        isToday(date) ? 'bg-customLightBlack' : ''
      } text-xl justify-between rounded-xl p-5 items-center gap-8`}
    >
      <div className="flex gap-4 lg:items-center justify-center items-start">
        <img
          src={NotificationImages[status]}
          className="w-20 rounded-full"
          alt="Notification Icon"
        />
        <p className="text-xl text-customWhite font-normal pt-4 lg:pt-0">{message}</p>
      </div>
      <p className="text-customWhite text-xl font-medium opacity-50 min-w-36 text-right ">
        {getTimeDifference(date)}
      </p>
    </div>
  );
}

export default NotificationCard;