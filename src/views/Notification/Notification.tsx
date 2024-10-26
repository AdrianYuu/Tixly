import { Helmet } from 'react-helmet-async';
import DoubleChecklistImage from '../../assets/images/double-checklist.png';
import NotificationCard from '../../components/NotificationCard';
import NotificationStatus from '../../enums/NotificationStatusEnum';

function Notification() {
  return (
    <>
      <Helmet>
        <title>Tixly | Notification</title>
      </Helmet>

      {/* Section Title */}
      <div className="flex flex-col gap-2 px-16">
        <div className="w-full flex justify-between">
          <p className="font-semibold text-2xl text-customWhite">Notifications</p>
          <div className="flex gap-2 items-center">
            <img src={DoubleChecklistImage} className="w-5" alt="" />
            <p className="text-customLightYellow text-xl font-medium">
              Mark all as read
            </p>
          </div>
        </div>

        <div className="w-full border border-customLightGrey opacity-30"></div>

        <p className='text-xl opacity-50 text-customWhite my-4'>Today's Notifications</p>

        <NotificationCard notificationLogo={''} notificationDetailName={'WATERBOMB 2024 JAKARTA'} notificationTime={'5h'} notificationToday={true} notificationStatus={NotificationStatus.PAYMENT_ACTIVE}/>
        <NotificationCard notificationLogo={''} notificationDetailName={'WATERBOMB 2024 JAKARTA'} notificationTime={"5h"} notificationToday={true} notificationStatus={NotificationStatus.TICKETWAR_ACTIVE}/>



        <p className='text-xl opacity-50 text-customWhite my-4'>Past's Notifications</p>

        <NotificationCard notificationLogo={''} notificationDetailName={'WATERBOMB 2024 JAKARTA'} notificationTime={'5h'} notificationToday={true} notificationStatus={NotificationStatus.PAYMENT_INACTIVE}/>
        <NotificationCard notificationLogo={''} notificationDetailName={'WATERBOMB 2024 JAKARTA'} notificationTime={'5h'} notificationToday={true} notificationStatus={NotificationStatus.PRESALE}/>


      </div>


    </>
  );
}

export default Notification;
