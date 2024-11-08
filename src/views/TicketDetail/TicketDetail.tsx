import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

// Area Import Components & Icon
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
import TicketBanner from '../../components/TicketBanner';
import { FilmIcon } from '@heroicons/react/24/solid';
import LoadingSpinner from '../../components/LoadingSpinner';
import Unauthorized from '../../components/Unauthorized';
import Ticket from '../../components/Ticket';

// Area Import Utils & Enum
import { motion } from 'framer-motion';
import { changeBlobToUrl, formatToRupiah } from '../../lib/utils';
import { IConcertTicketType } from '../../interfaces/IConcert';
import { Link, useParams } from 'react-router-dom';
import TicketEnum from '../../enums/ActivityEnum';
import ISeat from '../../interfaces/ISeat';
import { IActivity } from '../../interfaces/IActivity';
import { fetchActivityById } from '../../services/ActivitiesService';
import { useUserContext } from '../../contexts/UserContext';

function TicketDetail() {
  const [activity, setActivity] = useState<IActivity>();
  const [isInfoActive, setIsInfoActive] = useState<boolean>(true);
  const [showDescription, setShowDescription] = useState<boolean>(true);
  const [showLocation, setShowLocation] = useState<boolean>(true);
  const [showVenue, setShowVenue] = useState<boolean>(true);
  const [showTerms, setShowTerms] = useState<boolean>(true);
  const [showTicketRedemption, setShowTicketRedemption] =
    useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();

  const { user } = useUserContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      const updatedActivities = await fetchActivityById(BigInt(id!));

      if (updatedActivities) {
        setActivity(updatedActivities);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSeeTicket = () => {
    setIsInfoActive(false);
  };

  const [currentLocation, _] = useState({
    lat: -6.123456,
    lng: 106.123456,
  });

  const [selectedTicket, setSelectedTicket] =
    useState<IConcertTicketType | null>(null);

  const handleTicketSelect = (ticket: IConcertTicketType) => {
    setSelectedTicket(ticket);
  };

  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const takenSeats = ['A1', 'A2', 'B3'];

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const ticketPrice = activity?.movie?.price!
    ? parseInt(activity.movie.price)
    : activity?.touristAttraction?.price!
    ? parseInt(activity.touristAttraction.price)
    : 0;

  const totalPrice = ticketPrice * quantity;

  const handleSeatSelect = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      decreaseQuantity();
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      increaseQuantity();
    }
  };

  const Seat = ({ label, isSelected, onClick, isTaken }: ISeat) => (
    <button
      onClick={!isTaken ? onClick : undefined}
      className={`w-10 h-10 flex items-center justify-center text-white rounded-full transition-colors
                ${
                  isSelected
                    ? 'bg-green-500'
                    : isTaken
                    ? 'bg-red-500 cursor-not-allowed'
                    : 'bg-gray-400'
                } mx-1`}
      disabled={isTaken}
    >
      {label}
    </button>
  );

  return (
    <>
      <Helmet>
        <title>Tixly | Ticket Details</title>
      </Helmet>

      {user ? (
        <>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <motion.section
              className="flex flex-col gap-2 px-16 mt-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* <p>{selected}</p> */}
              <div className="flex flex-col px-16">
                <TicketBanner
                  image={changeBlobToUrl(activity!.image!)}
                  name={activity!.name}
                  address={activity!.address}
                  date={activity!.concert?.date ?? activity!.movie?.date}
                  type={activity!.activityType}
                />

                <div className="flex mt-8 justify-between lg:flex-row flex-col-reverse items-center lg:items-start">
                  <div className="flex flex-col lg:w-3/5 ">
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
                                <img
                                  src={DocumentIconImage}
                                  className="w-6 h-6"
                                />
                                <p className="text-xl font-semibold text-customWhite">
                                  Description
                                </p>
                              </div>
                              <div
                                className="cursor-pointer"
                                onClick={() =>
                                  setShowDescription(!showDescription)
                                }
                              >
                                {showDescription ? (
                                  <ChevronUpIcon className="w-5 h-5 text-customWhite" />
                                ) : (
                                  <ChevronDownIcon className="w-5 h-5 text-customWhite" />
                                )}
                              </div>
                            </div>
                            {showDescription && (
                              <p className="text-customWhite font-medium text-sm bg-customDarkGrey rounded-3xl p-8 w-full sm:w-auto">
                                {activity!.description}
                              </p>
                            )}
                          </div>

                          {/* Location */}
                          <div className="flex flex-col gap-6">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <img
                                  src={LocationIconImage}
                                  className="w-6 h-6"
                                />
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
                                    center={{
                                      lat: currentLocation.lat,
                                      lng: currentLocation.lng,
                                    }}
                                    zoom={14}
                                  >
                                    <Marker
                                      position={{
                                        lat: currentLocation.lat,
                                        lng: currentLocation.lng,
                                      }}
                                    />
                                  </GoogleMap>
                                </LoadScript>

                                <div className="w-full flex justify-center gap-2 absolute bottom-10 p-4 bg-opacity-50 text-customWhite rounded-lg">
                                  <img
                                    src={LocationIconImage}
                                    className="w-6 h-6"
                                  />
                                  {activity!.address}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Venue */}
                          {activity!.activityType === TicketEnum.CONCERT ? (
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
                                  src={changeBlobToUrl(
                                    activity!.concert?.venueImage,
                                  )}
                                  className="w-full h-max rounded-xl"
                                />
                              )}
                            </div>
                          ) : (
                            ''
                          )}

                          {/* Terms & Conditions */}
                          <div className="flex flex-col gap-6">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <img
                                  src={DocumentIconImage2}
                                  className="w-6 h-6"
                                />
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
                            {showTerms && (
                              <TermsAndCondition useTitle={false} />
                            )}
                          </div>

                          {/* Ticket Redemption */}
                          <div className="flex flex-col gap-6">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <img
                                  src={TicketIconImage}
                                  className="w-6 h-6"
                                />
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
                      ) : activity!.concert?.concertTicketTypes &&
                        activity!.concert.concertTicketTypes.length > 0 ? (
                        activity!.concert.concertTicketTypes.map(
                          (ticket: IConcertTicketType) => (
                            <Ticket
                              key={ticket.name}
                              ticketName={ticket.name}
                              endDate={activity!.concert!.salesEndDate ?? '0'}
                              price={ticket.price}
                              type={activity!.activityType}
                              ticketType={ticket}
                              onClick={handleTicketSelect}
                              isSelected={selectedTicket === ticket}
                            />
                          ),
                        )
                      ) : activity!.activityType === TicketEnum.MOVIE ? (
                        <div>
                          <div className="flex flex-col text-customWhite">
                            <p className="font-semibold text-lg">
                              Seat Status:
                            </p>

                            <div className="flex items-center mb-2">
                              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                              <p>Taken Seats</p>
                            </div>

                            <div className="flex items-center mb-2">
                              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                              <p>Selected Seats</p>
                            </div>
                            <div className="flex items-center mb-2">
                              <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                              <p>Available Seats</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-center ">
                            <FilmIcon className="w-10 h-10 text-customWhite mb-6" />
                            {Array.from({ length: 12 }, (_, rowIndex) => (
                              <div
                                key={rowIndex}
                                className="flex justify-center mb-2 gap-2"
                              >
                                {Array.from({ length: 12 }, (_, seatIndex) => {
                                  const seatLabel =
                                    String.fromCharCode(76 - rowIndex) +
                                    (seatIndex + 1);
                                  const isTaken =
                                    takenSeats.includes(seatLabel);
                                  return (
                                    <Seat
                                      key={seatLabel}
                                      label={seatLabel}
                                      isSelected={selectedSeats.includes(
                                        seatLabel,
                                      )}
                                      onClick={() =>
                                        handleSeatSelect(seatLabel)
                                      }
                                      isTaken={isTaken}
                                    />
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 text-customWhite">
                            <p>Selected Seat:</p>
                            <p>
                              {selectedSeats.length > 0
                                ? selectedSeats.join(', ')
                                : 'None'}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <Ticket
                          key={activity!.name}
                          ticketName={activity!.name}
                          price={activity!.touristAttraction!.price.toString()}
                          type={activity!.activityType}
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
                        {activity!.activityType === TicketEnum.CONCERT ? (
                          <>
                            {formatToRupiah(
                              activity!.concert.concertTicketTypes[0].price,
                            )}
                          </>
                        ) : (
                          formatToRupiah(
                            activity!.movie?.price ??
                              activity!.touristAttraction?.price,
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
                        activity!.activityType === TicketEnum.CONCERT
                          ? selectedTicket.name
                          : TicketEnum.CONCERT
                          ? 'Select a ticket'
                          : activity!.name}
                      </p>
                      <div className="flex justify-between text-customWhite opacity-50 text-sm">
                        <p>
                          {selectedTicket
                            ? `1x ${selectedTicket.name} ticket`
                            : quantity > 0
                            ? `${quantity}x ${activity!.name} ticket`
                            : ''}
                        </p>
                        <p>{selectedTicket ? formatToRupiah(0) : ''}</p>
                      </div>
                      <div className="border-dashed border-t-2 border-customWhite opacity-30"></div>
                      <div className="flex justify-between text-customWhite text-xl font-semibold">
                        <p>Total</p>
                        <p>
                          {selectedTicket
                            ? formatToRupiah(selectedTicket.price)
                            : formatToRupiah(String(totalPrice))}
                        </p>
                      </div>
                      <Link
                        to={{
                          pathname: `/payment/${activity!.id}`,
                          search: `?ticketName=${encodeURIComponent(
                            selectedTicket?.name ?? activity!.name,
                          )}&activityId=${activity!.id}&price=${
                            selectedTicket?.price ?? totalPrice
                          }&id=${selectedTicket?.id}&quantity=${
                            quantity == 0 ? 1 : quantity
                          }&seats=${encodeURIComponent(
                            selectedSeats.join(','),
                          )}`,
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
          )}
        </>
      ) : (
        <Unauthorized />
      )}
    </>
  );
}

export default TicketDetail;
