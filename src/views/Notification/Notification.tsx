import { Helmet } from 'react-helmet-async';
import DoubleChecklistImage from '../../assets/images/double-checklist.png';
import NotificationCard from '../../components/NotificationCard';
import NotificationStatus from '../../enums/NotificationStatusEnum';
import { motion } from 'framer-motion';

function Notification() {
  return (
    <>
      <Helmet>
        <title>Tixly | Notification</title>
      </Helmet>

      {/* Section Title */}
      <motion.section
        className="flex flex-col gap-2 px-16 mt-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full flex justify-between">
          <p className="font-semibold text-2xl text-customWhite">
            Notifications
          </p>
          <div className="flex gap-2 items-center">
            <img src={DoubleChecklistImage} className="w-5" alt="" />
            <p className="text-customLightYellow text-xl font-medium">
              Mark all as read
            </p>
          </div>
        </div>
        <div className="w-full border border-customLightGrey opacity-30"></div>
        <p className="text-xl opacity-50 text-customWhite my-4">
          Today's Notifications
        </p>
        <NotificationCard
          name={'WATERBOMB 2024 JAKARTA'}
          date={'Saturday, 26th October 2024 | 19.00'}
          status={NotificationStatus.PAYMENT_ACTIVE}
        />
        <NotificationCard
          name={'WATERBOMB 2024 JAKARTA'}
          date={'Saturday, 26th October 2024 | 19.00'}
          status={NotificationStatus.TICKETWAR_ACTIVE}
        />
        <p className="text-xl opacity-50 text-customWhite my-4">
          Past's Notifications
        </p>
        <NotificationCard
          name={'WATERBOMB 2024 JAKARTA'}
          date={'Saturday, 26th September 2024 | 19.00'}
          status={NotificationStatus.PAYMENT_INACTIVE}
        />
        <NotificationCard
          name={'WATERBOMB 2024 JAKARTA'}
          date={'Saturday, 26th October 2024 | 19.00'}
          status={NotificationStatus.PRESALE}
        />
      </motion.section>
    </>
  );
}

export default Notification;
