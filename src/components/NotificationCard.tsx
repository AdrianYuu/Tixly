import NotificationStatus from '../enums/NotificationStatusEnum';

// Region Import Assets Image
import DollarSignActiveImage from '../assets/images/dollar-sign-active.png';
import DollarSignImage from '../assets/images/dollar-sign.png';
import AlarmSignActiveImage from '../assets/images/alarm-sign-active.png';
import AlarmSignImage from '../assets/images/alarm-sign.png';
import ExclamationSign from '../assets/images/exclamation-sign.png';

interface IProps {
  notificationLogo: string;
  notificationDetailName: string;
  notificationTime: string;
  notificationToday: boolean;
  notificationStatus: NotificationStatus;
}

const NotificationImages = {
    [NotificationStatus.PAYMENT_ACTIVE]: DollarSignActiveImage,
    [NotificationStatus.PAYMENT_INACTIVE]: DollarSignImage,
    [NotificationStatus.TICKETWAR_ACTIVE]: AlarmSignActiveImage,
    [NotificationStatus.TICKETWAR_INACTIVE]: AlarmSignImage,
    [NotificationStatus.PRESALE]: ExclamationSign,
};


function NotificationCard({
  notificationLogo,
  notificationDetailName,
  notificationTime,
  notificationToday,
  notificationStatus,
}: IProps) {
  let message;

  switch (notificationStatus) {
    case NotificationStatus.PAYMENT_ACTIVE:
      message = (
        <>
          🎉 Payment Successful! Your order for{' '}
          <span className="font-bold">
            <span className="text-customLightPurple">
              {notificationDetailName}
            </span>{' '}
            tickets is confirmed!
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
            <span className="text-customLightPurple">
              {notificationDetailName}
            </span>{' '}
            is now LIVE!
          </span>{' '}
          Secure your spot at the most exciting event of the year – grab your tickets before they're gone! 🚀🌊 Don't miss out!
        </>
      );
      break;
    case NotificationStatus.TICKETWAR_ACTIVE:
      message = (
        <>
          🚨 Ticket War! Your order for{' '}
          <span className="font-bold">
            <span className="text-customLightPurple">
              {notificationDetailName}
            </span>{' '}
            tickets is now active!
          </span>
        </>
      );
      break;
    case NotificationStatus.TICKETWAR_INACTIVE:
      message = (
        <>
          🚨 Ticket War! Your order for{' '}
          <span className="font-bold">
            <span className="text-customLightPurple">
              {notificationDetailName}
            </span>{' '}
            tickets is now active!
          </span>
        </>
      );
      break;
    case NotificationStatus.PRESALE:
      message = (
        <>
          ⏰ Pre-Sale Countdown! Our exclusive pre-sale for{' '}
          <span className="font-bold">
            <span className="text-customLightPurple">
              {notificationDetailName}
            </span>{' '}
            starts soon. Be ready to claim your tickets before the general public!
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
        notificationToday ? 'bg-customLightBlack' : ''
      } text-xl justify-between rounded-xl p-5 items-center gap-8`}
    >
      <div className="flex gap-4 items-center">
          <img src={NotificationImages[notificationStatus]} className="w-20 rounded-full" alt="Notification Icon" />
          <p className="text-xl text-customWhite font-normal">{message}</p>
      </div>

      <p className="text-customWhite text-xl font-medium opacity-50">{notificationTime}</p>
    </div>
  );
}

export default NotificationCard;