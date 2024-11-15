interface IMovie {
  id?: bigint;
  cinemaName: string;
  cinemaLocation: string;
  date: string;
  time: string;
  theaterNumber: number;
  genre: string;
  ageRating: string;
  language: string;
  trailerUrl: string;
  duration: string;
  director: string;
  price: string;

  actors?: Actor[];

  activityId?: bigint;
}

export default IMovie;
