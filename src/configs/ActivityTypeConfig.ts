interface IActivityType {
  imageUrl: string;
  name: string;
  description: string;
}

export const ACTIVITY_TYPE_LIST: IActivityType[] = [
  {
    imageUrl: '../assets/images/guitar.png',
    name: 'Concerts',
    description: 'concert, festivals, theater, exhibitions',
  },
  {
    imageUrl: '../assets/images/movie-clip.png',
    name: 'Movies',
    description: 'cinema tickets, film screenings, film premieres',
  },
  {
    imageUrl: '../assets/images/tent.png',
    name: 'Attractions',
    description: 'zoo, amusement park, museum, aquarium',
  },
];
