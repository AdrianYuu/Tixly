import { Helmet } from 'react-helmet-async';
import TicketImage from '../../assets/images/ticket.png';
import DummyBannerImage from '../../assets/images/dummy-banner.avif';
import InputBar from '../../components/InputBar';
import { BENEFIT_LIST } from '../../configs/BenefitConfig';
import BenefitCard from '../../components/BenefitCard';
import FeatureSection from '../../components/FeatureSection';

function Home() {
  function onSubmit(query: string) {
    // Handle when search button clicked.
  }

  return (
    <>
      <Helmet>
        <title>Tixly | Home</title>
      </Helmet>

      {/* Section 1 */}
      <section className="flex items-center justify-center text-customWhite">
        <div className="ps-28">
          <p className="text-4xl font-bold mb-4">Grab Your Ticket,</p>
          <p className="text-4xl font-bold mb-8">
            Enjoy Events{' '}
            <span className="bg-gradient-to-r from-customLightPurple to-customLightYellow bg-clip-text text-transparent">
              Easily with Tixly
            </span>
          </p>
          <p className="text-sm font-medium mb-8">
            Why settle for ordinary ticketing when Tixly offers so much more?
            From quick and easy ticket purchases to real-time event updates and
            exclusive perks, we make sure your event journey is simple and
            enjoyable
          </p>
          <InputBar
            placeholder="where do you want to go?"
            buttonText="Search"
            onSubmit={onSubmit}
          />
        </div>
        <img src={TicketImage} alt="" />
      </section>

      {/* Section 2 */}
      <section className="flex w-full text-customWhite mt-16">
        {BENEFIT_LIST.map((benefit, index) => (
          <BenefitCard key={index} benefit={benefit} pos={index} />
        ))}
      </section>

      {/* Section 3 */}
      <section className="flex w-full justify-center items-center mt-32">
        <img
          src={DummyBannerImage}
          alt=""
          className="rounded-2xl w-4/5 max-h-80"
        />
      </section>

      {/* Section 4 */}
      <FeatureSection
        title="Our Popular Events"
        description="Join the Buzz! Discover Our Most-Loved Events and Book Your Spot
          Today!"
      />

      {/* Section 5 */}
      <FeatureSection
        title="Cinema Magic Awaits You"
        description="Don’t miss out on the movies everyone’s raving about! From
          heart-pounding action to heartwarming tales, grab your tickets now!"
      />

      {/* Section 6 */}
      <FeatureSection
        title="Hidden Healing Gems"
        description="Dive into our curated selection of healing attractions that will help
          you relax, reflect, and rejuvenate in stunning settings!"
      />
    </>
  );
}

export default Home;
