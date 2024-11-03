import { Helmet } from 'react-helmet-async';
import TicketImage from '../../assets/images/ticket.png';
import DummyBannerImage from '../../assets/images/dummy-banner.avif';
import InputBar from '../../components/InputBar';
import { BENEFIT_LIST } from '../../configs/BenefitConfig';
import BenefitCard from '../../components/BenefitCard';
import FeatureSection from '../../components/FeatureSection';
import { motion } from 'framer-motion';
import Carousel from '../../components/Carousel';
import TicketEnum from '../../enums/TicketEnum';
import ConcertCard from '../../components/ConcertCard';
import Button from '../../components/Button';
import { TICKET_LIST } from '../../configs/TicketConfig';
import { useUserContext } from '../../contexts/UserContext';
import StarImage from '../../assets/images/star.png';

function Home() {
  const { user } = useUserContext();

  function onSubmit(query: string) {
    // Handle when search button clicked.
  }

  return (
    <>
      <Helmet>
        <title>Tixly | Home</title>
      </Helmet>

      {!user ? (
        // Section 1 (Before Login)
        <>
          <motion.section
            className="flex flex-col xl:flex-row items-center justify-center text-customWhite xl:mt-0 mt-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-20 xl:pe-0">
              <p className="text-4xl font-bold mb-4">Grab Your Ticket,</p>
              <p className="text-4xl font-bold mb-8">
                Enjoy Events{' '}
                <span className="bg-gradient-to-r from-customLightPurple to-customLightYellow bg-clip-text text-transparent">
                  Easily with Tixly
                </span>
              </p>
              <p className="text-sm font-medium mb-8">
                Why settle for ordinary ticketing when Tixly offers so much
                more? From quick and easy ticket purchases to real-time event
                updates and exclusive perks, we make sure your event journey is
                simple and enjoyable.
              </p>
              <InputBar
                placeholder="where do you want to go?"
                buttonText="Search"
                onSubmit={onSubmit}
              />
            </div>
            <img src={TicketImage} alt="" className="hidden xl:block" />
          </motion.section>
          {/* Section 2 */}
          <motion.section
            className="flex w-full text-customWhite mt-16 xl:flex-row flex-col"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {BENEFIT_LIST.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} pos={index} />
            ))}
          </motion.section>
        </>
      ) : (
        // Section 1 (After Login) - Event Section
        <motion.section
          className="flex flex-col md:flex-row xl:flex-row items-center justify-between text-customWhite xl:mt-0 mt-8 md:mt-4 px-4 md:px-6 xl:px-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`absolute inset-0 w-48 md:w-64 xl:w-96 h-48 md:h-64 xl:h-96 bg-customGlowingThree opacity-10 rounded-full blur-2xl z-0 top-60 md:top-72 xl:top-96 left-6 md:left-16 xl:left-28`}
          ></div>

          <div className="w-full xl:w-1/2 xl:pe-10 relative z-20">
            <p className="text-xl md:text-2xl xl:text-4xl font-bold mb-3 leading-tight md:leading-normal">
              <span className="bg-gradient-to-r from-customLightPurple to-customLightYellow bg-clip-text text-transparent">
                Catch Your Next Event
              </span>
              , See Your
              <br />
              Latest and Upcoming Tickets Here!
            </p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center">
              <Button
                text="Shop More Tickets"
                className="truncate px-10 md:px-12 py-2 md:py-3"
              />
              <Button
                text="View My Tickets"
                className="truncate px-10 md:px-12 py-2 md:py-3"
                type="transparent"
              />
            </div>
          </div>

          <div className="relative w-[200px] sm:w-[250px] md:w-[350px] xl:w-[500px] h-[450px] sm:h-[500px] md:h-[450px] xl:h-[580px] mt-8 md:mt-0">
            <div
              className={`absolute inset-0 w-[250px] sm:w-[300px] md:w-[400px] xl:w-[600px] h-[250px] sm:h-[300px] md:h-[400px] xl:h-[500px] bg-customGlowingTwo opacity-20 rounded-full blur-2xl z-0 top-12 sm:top-16 md:top-20 xl:top-30`}
            ></div>
            <div className="absolute inset-0 z-20 mx-2 sm:mx-4 md:mx-10">
              <ConcertCard
                ticket={TICKET_LIST[0]}
                style="transform-gpu hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 z-10 mx-2 sm:mx-4 md:mx-10">
              <ConcertCard
                ticket={TICKET_LIST[1]}
                style="transform-gpu translate-x-1 md:translate-x-3 bottom-2 sm:bottom-4 md:bottom-6 translate-y-2 sm:translate-y-3 opacity-60 rotate-3"
              />
            </div>

            <img
              src={StarImage}
              alt="Star"
              className="absolute z-0 -bottom-12 sm:-bottom-16 md:-bottom-20 opacity-80 left-1/2 transform -translate-x-1/2 w-[300px] sm:w-[500px] md:w-[700px] xl:w-[900px]"
            />
          </div>
        </motion.section>
      )}

      {/* Section 3 */}
      <section className="flex w-full justify-center items-center mt-32">
        <Carousel />
      </section>

      {/* Section 4 */}
      <FeatureSection
        title="Unforgettable Concert Experiences Await!"
        description="Dive into the electrifying world of our most adored concerts today!"
        ticketType={TicketEnum.CONCERT}
      />

      {/* Section 5 */}
      <FeatureSection
        title="Cinema Magic Awaits You"
        description="Don’t miss out on the movies everyone’s raving about! From heart-pounding action to heartwarming tales, grab your tickets now!"
        ticketType={TicketEnum.MOVIE}
      />

      {/* Section 6 */}
      <FeatureSection
        title="Hidden Healing Gems"
        description="Dive into our curated selection of healing attractions that will help you relax, reflect, and rejuvenate in stunning settings!"
        ticketType={TicketEnum.TOURIST_ATTRACTION}
      />
    </>
  );
}

export default Home;
