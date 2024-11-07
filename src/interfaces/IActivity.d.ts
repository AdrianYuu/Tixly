import ActivityEnum from '../enums/ActivityEnum';
import IConcert from './IConcert';
import IMovie from './IMovie';
import ITouristAttraction from './ITouristAttraction';

export interface IActivity {
  id?: bigint;
  name: string;
  description: string;
  address: string;
  image?: File;
  activityType: ActivityEnum;

  concert?: IConcert;
  movie?: IMovie;
  touristAttraction?: ITouristAttraction;
}
