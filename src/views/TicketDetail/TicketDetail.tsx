import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import DocumentIconImage from '../../assets/images/document-icon.png';
import DocumentIconImage2 from '../../assets/images/document-icon-2.png';
import LocationIconImage from '../../assets/images/location-icon.png';
import VenueIconImage from '../../assets/images/venue-icon.png';
import TicketIconImage from '../../assets/images/ticket-icon.png';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import TermsAndCondition from '../../components/TermsAndCondition';
import TicketRedemption from '../../components/TicketRedemption';
import Button from '../../components/Button';
import Ticket from '../../components/Ticket';
import { motion } from 'framer-motion';
import { formatToRupiah } from '../../lib/utils';
import { ITicketType } from '../../interfaces/IConcert';
import { TICKET_LIST } from '../../configs/TicketConfig';
import TicketBanner from '../../components/TicketBanner';
import { Link } from 'react-router-dom';
import TicketEnum from '../../enums/TicketEnum';

const currentTicket = TICKET_LIST[0];

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
    address: currentTicket.address,
    lat: -6.123456,
    lng: 106.123456,
  });

  const [selectedTicket, setSelectedTicket] = useState<ITicketType | null>(
    null,
  );

  const handleTicketSelect = (ticket: ITicketType) => {
    setSelectedTicket(ticket);
  };

  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    console.log(quantity);
    console.log(totalPrice);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const ticketPrice = currentTicket.movie?.ticketPrice
    ? parseInt(currentTicket.movie.ticketPrice)
    : currentTicket.touristAttraction
    ? parseInt(currentTicket.touristAttraction.ticketPrice)
    : 0;

  const totalPrice = ticketPrice * quantity;

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
          <TicketBanner
            image={currentTicket.imageUrl}
            name={currentTicket.name}
            address={currentTicket.address}
            date={
              currentTicket.concert?.endDatePeriod ?? currentTicket.movie?.date
            }
            type={currentTicket.ticketType}
          />

          <div className="flex mt-8 justify-between lg:flex-row flex-col-reverse items-center lg:items-start">
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
                          {currentTicket.description}
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
                          src={currentTicket.concert?.venueImage}
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
                      {showTerms && <TermsAndCondition useTitle={false} />}
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
                ) : currentTicket.concert?.ticketTypeList &&
                  currentTicket.concert.ticketTypeList.length > 0 ? (
                  currentTicket.concert.ticketTypeList.map(
                    (ticket: ITicketType) => (
                      <Ticket
                        key={ticket.name}
                        ticketName={ticket.name}
                        endDate={currentTicket.concert?.endDatePeriod ?? '0'}
                        price={ticket.price}
                        type={currentTicket.ticketType}
                        ticketType={ticket}
                        onClick={handleTicketSelect}
                        isSelected={selectedTicket === ticket}
                      />
                    ),
                  )
                ) : (
                  <Ticket
                    key={currentTicket.name}
                    ticketName={currentTicket.name}
                    price={
                      currentTicket.movie?.ticketPrice ??
                      currentTicket.touristAttraction?.ticketPrice ??
                      ''
                    }
                    type={currentTicket.ticketType}
                    quantity={quantity}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                  />
                )}
              </div>
            </div>
            {isInfoActive ? (
              <div className="flex flex-col gap-4 bg-customDarkGrey p-10 rounded-3xl h-max w-max mb-6 lg:mb-0">
                <p className="text-customWhite opacity-50 text-sm font-medium">
                  Start From
                </p>
                <p className="text-customWhite text-xl font-semibold">
                  {currentTicket.ticketType === TicketEnum.CONCERT ? (
                    <>
                      {formatToRupiah(
                        currentTicket.concert?.ticketTypeList.find(() => true)
                          ?.price,
                      )}
                    </>
                  ) : (
                    formatToRupiah(
                      currentTicket.movie?.ticketPrice ??
                        currentTicket.touristAttraction?.ticketPrice,
                    )
                  )}
                </p>
                <Button
                  className="p-2 px-24"
                  text="See Ticket"
                  onClick={handleSeeTicket}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4 bg-customDarkGrey p-10 rounded-3xl h-max w-max mb-6 lg:mb-0">
                <p className="text-customWhite opacity-50 text-sm font-medium">
                  {selectedTicket &&
                  currentTicket.ticketType === TicketEnum.CONCERT
                    ? selectedTicket.name
                    : ''
                    ? 'Select a ticket'
                    : currentTicket.name}
                </p>
                <div className="flex justify-between text-customWhite opacity-50 text-sm">
                  <p>
                    {selectedTicket
                      ? `1x ${selectedTicket.name} ticket`
                      : quantity > 0
                      ? `${quantity}x ${currentTicket.name} ticket`
                      : ''}
                  </p>
                  <p>{selectedTicket ? formatToRupiah(totalPrice) : ''}</p>
                </div>
                <div className="border-dashed border-t-2 border-customWhite opacity-30"></div>
                <div className="flex justify-between text-customWhite text-xl font-semibold">
                  <p>Total</p>
                  <p>
                    {selectedTicket
                      ? formatToRupiah(selectedTicket.price)
                      : formatToRupiah(totalPrice)}
                  </p>
                </div>
                <Link
                  to={{
                    pathname: `/payment/${currentTicket.id}`,
                    search: `?ticketName=${encodeURIComponent(
                      selectedTicket?.name ?? currentTicket.name,
                    )}&price=${selectedTicket?.price ?? totalPrice}&id=${
                      selectedTicket?.id
                    }&quantity=${quantity ?? 1}`,
                  }}
                >
                  <Button
                    className="p-2 px-24"
                    text="Buy Ticket"
                    disabledState={!selectedTicket && quantity === 0}
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.section>
    </>
  );
}

export default TicketDetail;
