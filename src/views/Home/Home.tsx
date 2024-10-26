import { Helmet } from 'react-helmet-async';
import TicketImage from '../../assets/images/ticket.png';
import DummyBannerImage from '../../assets/images/dummy-banner.avif';
import SearchBar from '../../components/InputBar';
import { BENEFIT_LIST } from '../../configs/BenefitConfig';
import BenefitCard from '../../components/BenefitCard';

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
          <SearchBar
            placeholder="where do you want to go?"
            buttonText="Search"
            onSubmit={onSubmit}
          />
        </div>
        <img src={TicketImage} alt="" />
      </section>

      {/* Section 2 */}
      <section className="flex w-full text-customWhite">
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
      <section className="mt-32"></section>
    </>
  );
}

export default Home;
