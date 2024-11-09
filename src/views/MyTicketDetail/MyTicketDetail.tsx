import { Helmet } from 'react-helmet-async';
import QRCodeImage from '../../assets/images/qr-code.png';
import TermsAndCondition from '../../components/TermsAndCondition';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import ActivityEnum from '../../enums/ActivityEnum';
import { changeBlobToUrl } from '../../lib/utils';
import Unauthorized from '../../components/Unauthorized';
import { useUserContext } from '../../contexts/UserContext';
import { useEffect } from 'react';

function MyTicketDetail() {
  const location = useLocation();
  const transaction = location.state?.transaction;

  const concert = ActivityEnum.CONCERT === transaction.activity.activityType;
  const movie = ActivityEnum.MOVIE === transaction.activity.activityType;
  const touristAttraction =
    ActivityEnum.TOURIST_ATTRACTION === transaction.activity.activityType;

  const { user } = useUserContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Tixly | My Ticket Detail</title>
      </Helmet>

      <motion.section
        className="flex flex-col gap-2 mt-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {user ? (
          <div className="flex flex-col px-16 pt-4">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <img
                src={changeBlobToUrl(transaction.activity.image)}
                alt=""
                className="w-64 h-64"
              />
              <div className="flex flex-col gap-8 lg:items-start items-center">
                <div className="w-max bg-customDarkGrey p-2 px-12 rounded-full">
                  <p className="bg-gradient-to-r from-customLightPurple to-customLightYellow bg-clip-text text-transparent font-medium text-xl">
                    {transaction.activity.activityType.replace('_', ' ')}
                  </p>
                </div>
                <div className="flex flex-col gap-2 lg:text-start text-center">
                  <p className="text-3xl text-customWhite font-semibold">
                    {transaction.activity.name}
                  </p>
                  <p className="text-customWhite opacity-70 text-xl">
                    {movie
                      ? transaction.activity.movie.cinemaName
                      : transaction.activity.address}
                  </p>

                  <p className="text-customWhite opacity-70 text-xl">
                    {movie ? transaction.seatNumber.join(', ') : ''}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex lg:flex-row flex-col text-customWhite items-center justify-between gap-8">
              <div className="flex flex-col gap-4 mt-6 w-full lg:text-start text-center">
                <div className="flex flex-col gap-2">
                  <p className="text-xl opacity-50">Location</p>
                  <p className="text-3xl font-semibold">
                    {concert
                      ? transaction.activity.concert.location
                      : transaction.activity.address}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl opacity-50">
                    {concert ? 'Ticket Type' : 'Description'}
                  </p>
                  <p className="text-3xl font-semibold">
                    {concert
                      ? transaction.concertTicketType
                      : transaction.activity.description}
                    {}
                  </p>
                </div>
                {!touristAttraction ? (
                  <div className="flex flex-col gap-2">
                    <p className="text-xl opacity-50">Date</p>
                    <p className="text-3xl font-semibold">
                      {concert
                        ? transaction.activity.concert.date
                        : transaction.activity.movie.date}
                    </p>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="flex flex-col gap-4 mt-6 w-full lg:text-start text-center">
                <div className="flex flex-col gap-2">
                  <p className="text-xl opacity-50">Booking Code</p>
                  <p className="text-3xl font-semibold">
                    {transaction.bookingCode}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xl opacity-50">Booking Date</p>
                  <p className="text-3xl font-semibold">
                    {transaction.bookingDate}
                  </p>
                </div>
                {!touristAttraction ? (
                  <div className="flex flex-col gap-2">
                    <p className="text-xl opacity-50">Time</p>
                    <p className="text-3xl font-semibold">
                      {concert
                        ? transaction.activity.concert.time
                        : transaction.activity.movie.time}
                    </p>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <img src={QRCodeImage} alt="" className="w-80" />
            </div>
            <div className="mt-6">
              <TermsAndCondition useTitle={true} />
            </div>
          </div>
        ) : (
          <Unauthorized />
        )}
      </motion.section>
    </>
  );
}

export default MyTicketDetail;
