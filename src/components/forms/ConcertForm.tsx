import { useState } from 'react';
import FormInput from '../form-component/FormInput';
import EmptyImage from '../../assets/images/empty-image.png';
import PlusPurpleImage from '../../assets/images/plus-purple.png';
import Button from '../Button';
import { IConcertTicketType } from '../../interfaces/IConcert';
import { backend_activity } from '../../declarations/backend_activity';
import ActivityEnum from '../../enums/ActivityEnum';
import { backend_concert } from '../../declarations/backend_concert';
import { backend_concert_ticket_type } from '../../declarations/backend_concert_ticket_type';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';

function ConcertForm() {
  const navigate = useNavigate();

  const [concertDate, setConcertDate] = useState<string | null>(null);
  const [concertTime, setConcertTime] = useState<string | null>(null);
  const [concertName, setConcertName] = useState<string | null>(null);
  const [concertLocation, setConcertLocation] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [concertDescription, setConcertDescription] = useState<string | null>(
    null,
  );
  const [concertAddress, setConcertAddress] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [venueImage, setVenueImage] = useState<File | null>(null);
  const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(
    null,
  );
  const [venueImagePreview, setVenueImagePreview] = useState<string | null>(
    null,
  );
  const [ticketTypes, setTicketTypes] = useState<IConcertTicketType[]>([
    { name: '', price: '', capacity: '' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function handleConcertDate(value: string | File) {
    if (typeof value === 'string') setConcertDate(value);
  }

  function handleConcertTime(value: string | File) {
    if (typeof value === 'string') setConcertTime(value);
  }

  function handleConcertName(value: string | File) {
    if (typeof value === 'string') setConcertName(value);
  }

  function handleConcertLocation(value: string | File) {
    if (typeof value === 'string') setConcertLocation(value);
  }

  function handleStartDate(value: string | File) {
    if (typeof value === 'string') setStartDate(value);
  }

  function handleEndDate(value: string | File) {
    if (typeof value === 'string') setEndDate(value);
  }

  function handleConcertDescription(value: string | File) {
    if (typeof value === 'string') setConcertDescription(value);
  }

  function handleConcertAddress(value: string | File) {
    if (typeof value === 'string') setConcertAddress(value);
  }

  function handleBannerImage(value: string | File) {
    if (value instanceof File) {
      setBannerImage(value);
      setBannerImagePreview(URL.createObjectURL(value));
    }
  }

  function handleVenueImage(value: string | File) {
    if (value instanceof File) {
      setVenueImage(value);
      setVenueImagePreview(URL.createObjectURL(value));
    }
  }

  function handleTicketTypeChange(
    index: number,
    field: 'name' | 'price' | 'capacity',
    value: string,
  ) {
    const updatedTicketTypes = [...ticketTypes];
    updatedTicketTypes[index][field] = value;
    setTicketTypes(updatedTicketTypes);
  }

  function addTicketType() {
    setTicketTypes([...ticketTypes, { name: '', price: '', capacity: '' }]);
  }

  async function handleSubmit() {
    if (!concertName || concertName.trim() === '') {
      toast.error('Concert name is required!', { position: 'top-right' });
      return;
    }

    if (!concertLocation || concertLocation.trim() === '') {
      toast.error('Concert location is required!', { position: 'top-right' });
      return;
    }

    if (!startDate) {
      toast.error('Start date is required!', { position: 'top-right' });
      return;
    }

    if (!endDate) {
      toast.error('End date is required!', { position: 'top-right' });
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error('Start date cannot be after end date!', {
        position: 'top-right',
      });
      return;
    }

    if (!concertDescription || concertDescription.trim() === '') {
      toast.error('Concert description is required!', {
        position: 'top-right',
      });
      return;
    }

    if (!concertAddress || concertAddress.trim() === '') {
      toast.error('Concert address is required!', { position: 'top-right' });
      return;
    }

    if (!bannerImage) {
      toast.error('Banner image is required!', { position: 'top-right' });
      return;
    }

    if (!venueImage) {
      toast.error('Venue image is required!', { position: 'top-right' });
      return;
    }

    for (const ticketType of ticketTypes) {
      if (!ticketType.name || ticketType.name.trim() === '') {
        toast.error('Each ticket type must have a name!', {
          position: 'top-right',
        });
        return;
      }
      if (!ticketType.price || isNaN(Number(ticketType.price))) {
        toast.error('Each ticket type must have a valid price!', {
          position: 'top-right',
        });
        return;
      }
      if (!ticketType.capacity || isNaN(Number(ticketType.capacity))) {
        toast.error('Each ticket type must have a valid capacity!', {
          position: 'top-right',
        });
        return;
      }
    }

    try {
      let response: any;
      response = await backend_activity.createActivity({
        id: BigInt(0),
        name: concertName,
        description: concertDescription,
        address: concertAddress,
        image: new Uint8Array(await bannerImage.arrayBuffer()),
        activityType: ActivityEnum.CONCERT,
      });

      const activityId = response.ok[1];
      response = await backend_concert.createConcert({
        id: BigInt(0),
        date: concertDate!,
        time: concertTime!,
        location: concertLocation,
        venueImage: new Uint8Array(await venueImage.arrayBuffer()),
        concertTicketTypeCount: BigInt(ticketTypes.length),
        salesStartDate: startDate,
        salesEndDate: endDate,
        activityId: activityId,
      });

      const concertId = response.ok[1];
      await Promise.all(
        ticketTypes.map(async (ticketType) => {
          await backend_concert_ticket_type.createConcertTicketType({
            id: BigInt(0),
            name: ticketType.name,
            price: ticketType.price,
            capacity: BigInt(ticketType.capacity),
            concertId: concertId,
          });
        }),
      );

      toast.success('Successfully created concert!', {
        position: 'top-right',
      });

      navigate('/tickets');
    } catch (error) {
      toast.error('Failed to create concert. Please try again.', {
        position: 'top-right',
      });
    }
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <form className="bg-customDarkGrey w-4/5 rounded-3xl py-12 px-6 lg:px-12">
            <p className="bg-gradient-to-r from-customLightPurple to-customLightYellow bg-clip-text text-transparent text-5xl text-center font-bold">
              Concert Form
            </p>
            <p className="text-sm font-medium text-center mt-6">
              Please fill in the following information completely and correctly
            </p>
            <div className="flex md:flex-row flex-col w-full gap-10 mt-12">
              <FormInput
                name="Concert Date"
                type="input"
                onChange={handleConcertDate}
                inputType="date"
              />
              <FormInput
                name="Concert Time"
                type="input"
                onChange={handleConcertTime}
                inputType="time"
              />
            </div>
            <div className="flex md:flex-row flex-col w-full gap-10 mt-8">
              <FormInput
                name="Concert Name"
                type="input"
                onChange={handleConcertName}
                placeholder="Enter the concert name"
                inputType="text"
              />
              <FormInput
                name="Concert Location"
                type="input"
                onChange={handleConcertLocation}
                placeholder="Enter the concert location"
                inputType="text"
              />
            </div>
            <p className="text-sm font-semibold mt-8">Buying period</p>
            <div className="flex md:flex-row flex-col w-full gap-10 mt-4">
              <FormInput
                name="Start Date"
                type="input"
                onChange={handleStartDate}
                nameColor="text-customLightYellow"
                inputType="date"
              />
              <FormInput
                name="End Date"
                type="input"
                onChange={handleEndDate}
                nameColor="text-customLightYellow"
                inputType="date"
              />
            </div>
            <div className="flex md:flex-row flex-col w-full gap-10 mt-8">
              <FormInput
                name="Concert Description"
                type="textarea"
                onChange={handleConcertDescription}
                placeholder="Describe the concert"
              />
              <FormInput
                name="Concert Address"
                type="textarea"
                onChange={handleConcertAddress}
                placeholder="Enter the concert address"
              />
            </div>
            <div className="flex lg:flex-row flex-col w-full gap-10 mt-8">
              <div className="flex gap-10 w-full md:flex-row flex-col">
                <FormInput
                  name="Banner Image"
                  type="file"
                  onChange={handleBannerImage}
                />
                <FormInput
                  name="Venue Image"
                  type="file"
                  onChange={handleVenueImage}
                />
              </div>
              <div className="flex gap-10 w-full md:flex-row flex-col">
                <div className="flex w-full flex-col gap-2">
                  <p className="text-sm font-semibold">Banner Image Preview</p>
                  <img
                    src={bannerImagePreview || EmptyImage}
                    alt=""
                    className="w-full h-[14.5rem] rounded-3xl"
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <p className="text-sm font-semibold">Venue Image Preview</p>
                  <img
                    src={venueImagePreview || EmptyImage}
                    alt=""
                    className="w-full h-[14.5rem] rounded-3xl"
                  />
                </div>
              </div>
            </div>
            {ticketTypes.map((_, index) => (
              <>
                <p className="text-sm font-semibold mt-8">
                  Ticket Type {index + 1}
                </p>
                <div
                  key={index}
                  className="flex flex-col w-full gap-6 mt-6 mb-12"
                >
                  <FormInput
                    name="Name"
                    type="input"
                    onChange={(value) =>
                      handleTicketTypeChange(index, 'name', value as string)
                    }
                    inputType="text"
                    placeholder="Enter the ticket name"
                    nameColor="text-customLightYellow"
                  />
                  <FormInput
                    name="Price"
                    type="input"
                    onChange={(value) =>
                      handleTicketTypeChange(index, 'price', value as string)
                    }
                    inputType="text"
                    placeholder="Enter the ticket price"
                    nameColor="text-customLightYellow"
                  />
                  <FormInput
                    name="Capacity"
                    type="input"
                    onChange={(value) =>
                      handleTicketTypeChange(index, 'capacity', value as string)
                    }
                    inputType="text"
                    placeholder="Enter the ticket capacity"
                    nameColor="text-customLightYellow"
                  />
                </div>
              </>
            ))}
            <div className="flex gap-2 items-center w-full justify-end mt-6">
              <p
                className="text-sm font-semibold text-customLightPurple cursor-pointer"
                onClick={addTicketType}
              >
                Add Ticket Type
              </p>
              <img
                src={PlusPurpleImage}
                alt=""
                className="cursor-pointer"
                onClick={addTicketType}
              />
            </div>
            <Button
              text="Create Activity"
              className="truncate py-3 w-full mt-16"
              onClick={handleSubmit}
            />
          </form>
        </>
      )}

      {isModalOpen && !loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-customDarkGrey p-6 rounded-lg shadow-lg w-96">
            <p className="text-center text-white text-xl">Success!</p>
            <p className="text-center text-white mt-4">
              Your concert has been created successfully.
            </p>
            <Button
              text="Close"
              onClick={() => setIsModalOpen(false)}
              className="mt-6 py-2 px-4 w-full bg-customLightPurple text-white"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ConcertForm;
