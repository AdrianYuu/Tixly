import DollarSignActiveImage from '../assets/images/dollar-sign-active.png';
import DollarSignImage from '../assets/images/dollar-sign.png';
import AlarmSignActiveImage from '../assets/images/alarm-sign-active.png';
import AlarmSignImage from '../assets/images/alarm-sign.png';
import ExclamationSign from '../assets/images/exclamation-sign.png';
import NotificationStatus from '../enums/NotificationStatusEnum';

export const NotificationImages = {
  [NotificationStatus.PAYMENT_ACTIVE]: DollarSignActiveImage,
  [NotificationStatus.PAYMENT_INACTIVE]: DollarSignImage,
  [NotificationStatus.TICKETWAR_ACTIVE]: AlarmSignActiveImage,
  [NotificationStatus.TICKETWAR_INACTIVE]: AlarmSignImage,
  [NotificationStatus.PRESALE]: ExclamationSign,
};
