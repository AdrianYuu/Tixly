import { Helmet } from 'react-helmet-async';
import TicketRectangle from '../../assets/images/festival-rectangle.png';
import { CalendarDaysIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import DocumentIconImage from '../../assets/images/document-icon.png';
import DocumentIconImage2 from '../../assets/images/document-icon-2.png';
import LocationIconImage from '../../assets/images/location-icon.png';
import VenueImage from '../../assets/images/venue.png';
import VenueIconImage from '../../assets/images/venue-icon.png';
import TicketIconImage from '../../assets/images/ticket-icon.png';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import TermsAndCondition from '../../components/TermsAndCondition';
import TicketRedemption from '../../components/TicketRedemption';
import Button from '../../components/Button';
import Ticket from '../../components/Ticket';
import { motion } from 'framer-motion';

function TicketDetail() {
  const [isInfoActive, setIsInfoActive] = useState<boolean>(true);
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const [showLocation, setShowLocation] = useState<boolean>(true);
  const [showVenue, setShowVenue] = useState<boolean>(true);
  const [showTerms, setShowTerms] = useState<boolean>(true);
  const [showTicketRedemption, setShowTicketRedemption] =
    useState<boolean>(true);

    const handleSeeTicket = () => {
      setIsInfoActive(false);
    };

  const [location, _] = useState({
    address:
      'Phantom Ground Park, PIK 2 - Jl. M.H. Thamrin No.69, Salembaran, Tanggerang, Banten',
    lat: -6.123456,
    lng: 106.123456,
  });

  return (
    <>
      <Helmet>
        <title>Tixly | Ticket Details</title>
      </Helmet>

      <motion.section
        className="flex flex-col gap-2 px-16 mt-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

      <div className="flex flex-col px-16">
        <div className="grid grid-cols-3">
          {/* Image Section - 2/3 of the grid */}

          <div className="relative col-span-2 h-full">
            <img
              src={TicketRectangle}
              alt="Product"
              className="w-full h-56 lg:h-80 object-fit rounded-l-3xl border border-transparent"
            />
            <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-full bg-customBlack clip-hole"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-tl-full bg-customBlack clip-hole"></div>
          </div>

          {/* Text Section - 1/3 of the grid */}
          <div className="relative h-56 lg:h-80 flex flex-col bg-customDarkGrey p-8 rounded-r-3xl col-span-1 items-start justify-center border border-none">
            <div className="flex flex-col gap-4 text-start ml-6">
              <p className="text-customWhite text-xl font-semibold">
                WATERBOMB 2024 JAKARTA
              </p>

              <div className="flex flex-col gap-2">
                <p className="flex gap-2 items-center text-customWhite text-md font-medium opacity-50">
                  <MapPinIcon className="w-5 h-5" />
                  Phantom Ground Park, PIK 2
                </p>
                <p className="flex gap-2 items-center text-customLightYellow text-md font-medium">
                  <CalendarDaysIcon className="w-5 h-5" />
                  Saturday, 3rd November 2024
                </p>
              </div>
              <div className="absolute top-0 left-0 w-8 h-8 rounded-br-full bg-customBlack clip-hole"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 rounded-tr-full bg-customBlack clip-hole"></div>
            </div>
          </div>
        </div>

        <div className="flex mt-8 justify-between">
          <div className="flex flex-col w-3/5">
            <div className="relative flex">
              <button
                onClick={() => setIsInfoActive(true)}
                className={`w-32 p-3.5 text-sm text-center rounded-3xl transition-all duration-200 cursor-pointer ${
                  isInfoActive
                    ? 'bg-gradient-to-r from-customDarkYellow to-customLightYellow text-customDarkGrey mr-[-20px] z-10'
                    : 'bg-customDarkGrey text-customLightGrey z-0'
                }`}
              >
                Information
              </button>
              <button
                onClick={() => setIsInfoActive(false)}
                className={`w-32 p-3.5 text-sm text-center rounded-3xl transition-all duration-200 cursor-pointer ${
                  !isInfoActive
                    ? 'bg-gradient-to-r from-customDarkYellow to-customLightYellow text-customDarkGrey ml-[-20px] z-10'
                    : 'bg-customDarkGrey text-customLightGrey z-0'
                }`}
              >
                Ticket
              </button>
            </div>

            <div className="flex flex-col gap-12 pt-12">
              {isInfoActive ? (
                <>
                  {/* Description */}
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img src={DocumentIconImage} className="w-6 h-6" />
                        <p className="text-xl font-semibold text-customWhite">
                          Description
                        </p>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setShowDescription(!showDescription)}
                      >
                        {showDescription ? (
                          <ChevronUpIcon className="w-5 h-5 text-customWhite" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 text-customWhite" />
                        )}
                      </div>
                    </div>
                    {showDescription && (
                      <p className="text-customWhite font-medium text-sm bg-customDarkGrey rounded-3xl p-8">
                        Get ready, Jakarta! For the first time ever, South
                        Korea’s most iconic music festival, WATERBOMB, is making
                        waves in Indonesia! Known for its high-energy blend of
                        live music, entertainment, and epic water battles,
                        WATERBOMB is setting the stage for a splash-filled,
                        unforgettable experience. Join us on November 2, 2024,
                        at PIK2 as Prestige Promotions brings this one-of-a-kind
                        festival to life with an exciting lineup of top South
                        Korean idols and local talent. Expect powerful
                        performances from K-Pop, Hip-Hop, and dance music
                        artists, paired with mind-blowing visuals and nonstop
                        energy. Get ready to dance, get drenched, and experience
                        WATERBOMB Jakarta, the festival event of 2024! This is
                        more than just a concert; it’s a chance to make
                        unforgettable memories with friends, amazing music, and
                        an atmosphere like no other.
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img src={LocationIconImage} className="w-6 h-6" />
                        <p className="text-xl font-semibold text-customWhite">
                          Location
                        </p>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setShowLocation(!showLocation)}
                      >
                        {showLocation ? (
                          <ChevronUpIcon className="w-5 h-5 text-customWhite" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 text-customWhite" />
                        )}
                      </div>
                    </div>
                    {showLocation && (
                      <div className="relative">
                        <LoadScript googleMapsApiKey="AIzaSyBeuR5MrJXCJrLpZ4l2FmynLJcVFY4hGOY">
                          <GoogleMap
                            mapContainerStyle={{
                              height: '400px',
                              width: '100%',
                            }}
                            center={{ lat: location.lat, lng: location.lng }}
                            zoom={14}
                          >
                            <Marker
                              position={{
                                lat: location.lat,
                                lng: location.lng,
                              }}
                            />
                          </GoogleMap>
                        </LoadScript>

                        <div className="w-full flex justify-center gap-2 absolute bottom-10 p-4 bg-opacity-50 text-customWhite rounded-lg">
                          <img src={LocationIconImage} className="w-6 h-6" />
                          {location.address}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Venue */}
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={VenueIconImage}
                          className="w-6 h-6 rounded-3xl"
                        />
                        <p className="text-xl font-semibold text-customWhite">
                          Venue
                        </p>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setShowVenue(!showVenue)}
                      >
                        {showVenue ? (
                          <ChevronUpIcon className="w-5 h-5 text-customWhite" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 text-customWhite" />
                        )}
                      </div>
                    </div>
                    {showVenue && (
                      <img
                        src={VenueImage}
                        className="w-full h-max rounded-xl"
                      />
                    )}
                  </div>

                  {/* Terms & Conditions */}
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img src={DocumentIconImage2} className="w-6 h-6" />
                        <p className="text-xl font-semibold text-customWhite">
                          Terms & Conditions
                        </p>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setShowTerms(!showTerms)}
                      >
                        {showTerms ? (
                          <ChevronUpIcon className="w-5 h-5 text-customWhite" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 text-customWhite" />
                        )}
                      </div>
                    </div>
                    {showTerms && <TermsAndCondition />}
                  </div>

                  {/* Ticket Redemption */}
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img src={TicketIconImage} className="w-6 h-6" />
                        <p className="text-xl font-semibold text-customWhite">
                          Ticket Redemption
                        </p>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          setShowTicketRedemption(!showTicketRedemption)
                        }
                      >
                        {showTicketRedemption ? (
                          <ChevronUpIcon className="w-5 h-5 text-customWhite" />
                        ) : (
                          <ChevronDownIcon className="w-5 h-5 text-customWhite" />
                        )}
                      </div>
                    </div>
                    {showTicketRedemption && <TicketRedemption />}
                  </div>
                </>
              ) : (
                <Ticket />
              )}
            </div>
          </div>
          {isInfoActive ? (
            <div className="flex flex-col gap-4 bg-customDarkGrey p-10 rounded-3xl h-max w-max">
              <p className="text-customWhite opacity-50 text-sm font-medium">
                Start From,
              </p>
              <p className="text-customWhite text-xl font-semibold">
                IDR 1.400.000
              </p>
              <Button className="p-2 px-24" text="See Ticket" onClick={handleSeeTicket}/>
            </div>
          ) : (
            <div className="flex flex-col gap-4 bg-customDarkGrey p-10 rounded-3xl h-max w-max">
              <p className="text-customWhite text-sm font-medium">
                FESTIVAL - General Sale
              </p>

              <div className="flex justify-between text-customWhite opacity-50 text-sm">
                <p>1x ticket</p>
                <p>IDR 1.400.000</p>
              </div>

              <div className="border-dashed border-t-2 border-customWhite opacity-30"></div>

              <div className="flex justify-between text-customWhite text-xl font-semibold">
                <p>Total</p>
                <p>IDR 1.400.000</p>
              </div>

              <Button className="p-2 px-24" text="Buy Ticket" />
            </div>
          )}
        </div>
      </div>
      </motion.section>
    </>
  );
}

export default TicketDetail;