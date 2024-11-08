import { motion } from 'framer-motion';
import StarParticleImage from '../../assets/images/star-particle.png';
import { Helmet } from 'react-helmet-async';
import { ACTIVITY_TYPE_LIST } from '../../configs/ActivityTypeConfig';
import { useState } from 'react';
import ConcertForm from '../../components/forms/ConcertForm';
import MovieForm from '../../components/forms/MovieForm';
import AttractionForm from '../../components/forms/AttractionForm';
import { useUserContext } from '../../contexts/UserContext';
import Unauthorized from '../../components/Unauthorized';

function CreateActivities() {
  const [chosenIndex, setChosenIndex] = useState<number | null>(-1);
  const { user } = useUserContext();

  return (
    <>
      <Helmet>
        <title>Tixly | Create Activities</title>
      </Helmet>

      {user ? (
        <div>
          <motion.section
            className="relative flex flex-col items-center justify-center mt-12 text-customWhite px-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-bold text-5xl text-center">
              Create New{' '}
              <span className="bg-gradient-to-r from-customLightPurple to-customLightYellow bg-clip-text text-transparent">
                Activity with Tixly!
              </span>
            </p>
            <p className="max-w-4xl text-center mt-8 text-sm font-medium">
              Ready to create a moment worth remembering? Whether it’s a movie
              night, a live concert, or a scenic getaway, we’re here to help you
              share it with everyone! Choose your activity type, add in all the
              exciting details, and we’ll handle the rest. Let’s make this the
              next big experience people can’t wait to join!
            </p>
            <img
              src={StarParticleImage}
              className="absolute -top-6 left-24 w-20 h-26 hidden lg:flex"
            />
          </motion.section>

          <motion.section
            className="relative flex md:flex-row flex-col items-center justify-center mt-20 text-customWhite px-10 gap-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {ACTIVITY_TYPE_LIST.map((activityType, index) => (
              <div
                key={index}
                className={`relative w-72 h-72 rounded-3xl flex justify-center cursor-pointer transition-all duration-200 ${
                  chosenIndex === index
                    ? 'bg-customDarkPurpleV2 outline outline-customLightPurple'
                    : 'bg-customDarkGrey'
                }`}
                onClick={() => setChosenIndex(index)}
              >
                <img
                  src={activityType.imageUrl}
                  alt=""
                  className="absolute -top-6"
                />
                <div className="mt-44 px-8">
                  <p className="text-customLightYellow text-xl font-semibold text-center">
                    {activityType.name}
                  </p>
                  <p className="text-center text-sm font-medium mt-2">
                    {activityType.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.section>

          <section className="mt-24 text-customWhite flex justify-center">
            {chosenIndex == 0 && <ConcertForm />}
            {chosenIndex == 1 && <MovieForm />}
            {chosenIndex == 2 && <AttractionForm />}
          </section>
        </div>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}

export default CreateActivities;
