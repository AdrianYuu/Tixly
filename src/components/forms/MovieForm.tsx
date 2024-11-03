import { useState } from 'react';
import FormInput from '../form-component/FormInput';
import EmptyImage from '../../assets/images/empty-image.png';
import PlusPurpleImage from '../../assets/images/plus-purple.png';
import Button from '../Button';
import { ITicketType } from '../../interfaces/IConcert';
import { IActor } from '../../interfaces/IActor';
import FormSelect from '../form-component/FormSelect';
import {
  MOVIE_AGE_RATING_LIST,
  MOVIE_GENRE_LIST,
  MOVIE_LANGUAGE_LIST,
} from '../../configs/MovieInformationConfig';

function MovieForm() {
  const [movieDate, setMovieDate] = useState<string | null>(null);
  const [movieTime, setMovieTime] = useState<string | null>(null);
  const [cinemaName, setCinemaName] = useState<string | null>(null);
  const [cinemaLocation, setCinemaLocation] = useState<string | null>(null);
  const [theaterNumber, setTheaterNumber] = useState<string | null>(null);
  const [movieName, setMovieName] = useState<string | null>(null);
  const [movieSynopsis, setMovieSynopsis] = useState<string | null>(null);
  // Movie Genre, Movie Age Rating, Movie Language,
  const [movieGenre, setMovieGenre] = useState<string | null>(null);
  const [movieAgeRating, setMovieAgeRating] = useState<string | null>(null);
  const [movieLanguage, setMovieLanguage] = useState<string | null>(null);
  const [movieTrailerLink, setMovieTrailerLink] = useState<string | null>(null);
  const [posterImage, setPosterImage] = useState<File | null>(null);
  const [posterImagePreview, setPosterImagePreview] = useState<string | null>(
    null,
  );
  const [movieDuration, setMovieDuration] = useState<string | null>(null);
  const [movieDirector, setMovieDirector] = useState<string | null>(null);
  const [ticketPrice, setTicketPrice] = useState<string | null>(null);
  const [actors, setActors] = useState<IActor[]>([{ name: '', role: '' }]);

  function handleMovieDate(value: string | File) {
    if (typeof value === 'string') setMovieDate(value);
  }

  function handleMovieTime(value: string | File) {
    if (typeof value === 'string') setMovieTime(value);
  }

  function handleCinemaName(value: string | File) {
    if (typeof value === 'string') setCinemaName(value);
  }

  function handleCinemaLocation(value: string | File) {
    if (typeof value === 'string') setCinemaLocation(value);
  }

  function handleTheaterNumber(value: string | File) {
    if (typeof value === 'string') setTheaterNumber(value);
  }

  function handleMovieName(value: string | File) {
    if (typeof value === 'string') setMovieName(value);
  }

  function handleMovieSynopsis(value: string | File) {
    if (typeof value === 'string') setMovieSynopsis(value);
  }

  function handleMovieTrailerLink(value: string | File) {
    if (typeof value === 'string') setMovieTrailerLink(value);
  }

  function handleMovieDuration(value: string | File) {
    if (typeof value === 'string') setMovieDuration(value);
  }

  function handleMovieDirector(value: string | File) {
    if (typeof value === 'string') setMovieDirector(value);
  }

  function handleTicketPrice(value: string | File) {
    if (typeof value === 'string') setTicketPrice(value);
  }

  function handlePosterImage(value: string | File) {
    if (value instanceof File) {
      setPosterImage(value);
      setPosterImagePreview(URL.createObjectURL(value));
    }
  }

  function handleActorChange(
    index: number,
    field: 'name' | 'role',
    value: string,
  ) {
    const updatedActors = [...actors];
    updatedActors[index][field] = value;
    setActors(updatedActors);
  }

  function addActor() {
    setActors([...actors, { name: '', role: '' }]);
  }

  function handleSubmit() {
    console.log(actors);
  }

  return (
    <form className="bg-customDarkGrey w-4/5 rounded-3xl py-12 px-6 lg:px-12">
      <p className="bg-gradient-to-r from-customLightPurple to-customLightYellow bg-clip-text text-transparent text-5xl text-center font-bold">
        Movie Form
      </p>
      <p className="text-sm font-medium text-center mt-6">
        Please fill in the following information completely and correctly
      </p>
      <div className="flex md:flex-row flex-col w-full gap-10 mt-12">
        <FormInput
          name="Movie Date"
          type="input"
          onChange={handleMovieDate}
          inputType="date"
        />
        <FormInput
          name="Movie Time"
          type="input"
          onChange={handleMovieTime}
          inputType="time"
        />
      </div>
      <div className="flex md:flex-row flex-col w-full gap-10 mt-8">
        <FormInput
          name="Cinema Name"
          type="input"
          onChange={handleCinemaName}
          placeholder="Enter the cinema name"
          inputType="text"
        />
        <FormInput
          name="Cinema Location"
          type="input"
          onChange={handleCinemaLocation}
          placeholder="Enter the cinema location"
          inputType="text"
        />
      </div>
      <div className="flex md:flex-row flex-col w-full gap-10 mt-8">
        <FormInput
          name="Theater Number"
          type="input"
          onChange={handleTheaterNumber}
          placeholder="Select theater number"
          inputType="text"
        />
        <FormInput
          name="Movie Name"
          type="input"
          onChange={handleMovieName}
          placeholder="Enter the movie name"
          inputType="text"
        />
      </div>
      <div className="flex md:flex-row flex-col w-full gap-10 mt-8">
        <FormInput
          name="Movie Synopsis"
          type="textarea"
          onChange={handleTheaterNumber}
          placeholder="Describe the movie"
        />
      </div>
      <div className="flex md:flex-row flex-col w-full gap-10 mt-8">
        <FormSelect
          name="Movie Genre"
          options={MOVIE_GENRE_LIST}
          onChange={setMovieGenre}
        />
        <FormSelect
          name="Movie Age Rating"
          options={MOVIE_AGE_RATING_LIST}
          onChange={setMovieAgeRating}
        />
      </div>
      <div className="flex md:flex-row flex-col w-full gap-10 mt-8">
        <FormSelect
          name="Movie Language"
          options={MOVIE_LANGUAGE_LIST}
          onChange={setMovieLanguage}
        />
        <FormInput
          name="Movie Trailer Link"
          type="input"
          onChange={handleMovieTrailerLink}
          placeholder="Enter the movie trailer link"
        />
      </div>
      <div className="flex md:flex-row flex-col w-full gap-10 mt-8">
        <FormInput
          name="Movie Poster"
          type="file"
          onChange={handlePosterImage}
        />
        <div className="flex w-full flex-col gap-2">
          <p className="text-sm font-semibold">Movie Poster Preview</p>
          <img
            src={posterImagePreview || EmptyImage}
            alt=""
            className="w-full h-[14.5rem] rounded-3xl"
          />
        </div>
      </div>
      <div className="flex md:flex-row flex-col w-full gap-10 mt-8">
        <FormInput
          name="Movie Duration"
          type="input"
          onChange={handleTheaterNumber}
          placeholder="Select theater number"
          inputType="time"
        />
        <FormInput
          name="Movie Director"
          type="input"
          onChange={handleMovieName}
          placeholder="Enter the movie director"
          inputType="text"
        />
      </div>
      <div className="flex md:flex-row flex-col w-full gap-10 mt-8">
        <FormInput
          name="Ticket Price"
          type="input"
          onChange={handleTheaterNumber}
          placeholder="Enter the ticket price"
          inputType="text"
        />
      </div>
      {actors.map((_, index) => (
        <>
          <p className="text-sm font-semibold mt-8">Actor {index + 1}</p>
          <div key={index} className="flex flex-col w-full gap-6 mt-6 mb-12">
            <FormInput
              name="Name"
              type="input"
              onChange={(value) =>
                handleActorChange(index, 'name', value as string)
              }
              inputType="text"
              placeholder="Enter the actor name"
              nameColor="text-customLightYellow"
            />
            <FormInput
              name="Role"
              type="input"
              onChange={(value) =>
                handleActorChange(index, 'role', value as string)
              }
              inputType="text"
              placeholder="Enter the actor role"
              nameColor="text-customLightYellow"
            />
          </div>
        </>
      ))}
      <div className="flex gap-2 items-center w-full justify-end mt-6">
        <p
          className="text-sm font-semibold text-customLightPurple cursor-pointer"
          onClick={addActor}
        >
          Add Actor
        </p>
        <img
          src={PlusPurpleImage}
          alt=""
          className="cursor-pointer"
          onClick={addActor}
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

export default MovieForm;
