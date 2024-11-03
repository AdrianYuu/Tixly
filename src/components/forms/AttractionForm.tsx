import { useState } from 'react';
import FormInput from '../form-component/FormInput';
import EmptyImage from '../../assets/images/empty-image.png';
import PlusPurpleImage from '../../assets/images/plus-purple.png';
import Button from '../Button';
import { ITicketType } from '../../interfaces/IConcert';

function AttractionForm() {
  const [attractionName, setAttractionName] = useState<string | null>(null);
  const [attractionDescription, setAttractionDescription] = useState<
    string | null
  >(null);
  const [attractionAddress, setAttractionAddress] = useState<string | null>(
    null,
  );
  const [attractionImage, setAttractionImage] = useState<File | null>(null);
  const [attractionImagePreview, setAttractionImagePreview] = useState<
    string | null
  >(null);
  const [ticketPrice, setTicketPrice] = useState<string | null>(null);

  function handleAttractionName(value: string | File) {
    if (typeof value === 'string') setAttractionName(value);
  }

  function handleAttractionDescription(value: string | File) {
    if (typeof value === 'string') setAttractionDescription(value);
  }

  function handleAttractionAddress(value: string | File) {
    if (typeof value === 'string') setAttractionAddress(value);
  }

  function handleAttractionImage(value: string | File) {
    if (value instanceof File) {
      setAttractionImage(value);
      setAttractionImagePreview(URL.createObjectURL(value));
    }
  }
  function handleTicketPrice(value: string | File) {
    if (typeof value === 'string') setTicketPrice(value);
  }

  function handleSubmit() {
    console.log();
  }

  return (
    <form className="bg-customDarkGrey w-4/5 rounded-3xl py-12 px-6 lg:px-12">
      <p className="bg-gradient-to-r from-customLightPurple to-customLightYellow bg-clip-text text-transparent text-5xl text-center font-bold">
        Attraction Form
      </p>
      <p className="text-sm font-medium text-center mt-6">
        Please fill in the following information completely and correctly
      </p>
      <div className="flex md:flex-row flex-col w-full gap-10 mt-12">
        <FormInput
          name="Attraction Name"
          type="input"
          onChange={handleAttractionName}
          inputType="text"
          placeholder="Enter the attraction name"
        />
      </div>
      <div className="flex md:flex-row flex-col w-full gap-10 mt-8">
        <FormInput
          name="Attraction Description"
          type="textarea"
          onChange={handleAttractionDescription}
          placeholder="Describe the attraction"
        />
        <FormInput
          name="Attraction Address"
          type="textarea"
          onChange={handleAttractionAddress}
          placeholder="Enter the attraction address"
        />
      </div>
      <div className="flex lg:flex-row flex-col w-full gap-10 mt-8">
        <div className="flex gap-10 w-full md:flex-row flex-col">
          <FormInput
            name="Attraction Image"
            type="file"
            onChange={handleAttractionImage}
          />
          <div className="flex w-full flex-col gap-2">
            <p className="text-sm font-semibold">Banner Image Preview</p>
            <img
              src={attractionImagePreview || EmptyImage}
              alt=""
              className="w-full h-[14.5rem] rounded-3xl"
            />
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col w-full gap-10 mt-8">
        <FormInput
          name="Ticket Price"
          type="input"
          onChange={handleTicketPrice}
          placeholder="Enter the ticket price"
          inputType="text"
        />
      </div>
      <Button
        text="Create Activity"
        className="truncate py-3 w-full mt-16"
        onClick={handleSubmit}
      />
    </form>
  );
}

export default AttractionForm;
