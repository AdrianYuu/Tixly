import { backend_activity } from '../declarations/backend_activity';
import { backend_actor } from '../declarations/backend_actor';
import { backend_movie } from '../declarations/backend_movie';
import { backend_tourist_attraction } from '../declarations/backend_tourist_attraction';
import ActivityEnum from '../enums/ActivityEnum';
import { IActivity } from '../interfaces/IActivity';
import { backend_concert } from '../declarations/backend_concert/index';
import { backend_concert_ticket_type } from '../declarations/backend_concert_ticket_type';

export const fetchActivities = async (): Promise<IActivity[] | null> => {
  try {
    const response: any = await backend_activity.getActivities();
    if ('ok' in response) {
      const activities: IActivity[] = response.ok[1];

      const updatedActivities = await Promise.all(
        activities.map(async (activity) => {
          if (
            activity.activityType === ActivityEnum.TOURIST_ATTRACTION &&
            activity.id
          ) {
            const touristAttractionResponse: any =
              await backend_tourist_attraction.getTouristAttractionByActivityId(
                activity.id,
              );

            if ('ok' in touristAttractionResponse) {
              activity.touristAttraction = touristAttractionResponse.ok[1];
            } else {
              console.error(
                'Failed to fetch tourist attraction:',
                touristAttractionResponse.err,
              );
            }
          }

          if (activity.activityType === ActivityEnum.MOVIE && activity.id) {
            const movieResponse: any = await backend_movie.getMovieByActivityId(
              activity.id,
            );
            if ('ok' in movieResponse) {
              activity.movie = movieResponse.ok[1];

              const actorsResponse: any =
                await backend_actor.getActorsByMovieId(activity.movie!.id!);
              if ('ok' in actorsResponse) {
                activity.movie!.actors = actorsResponse.ok[1];
              } else {
                console.error('Failed to fetch actors:', actorsResponse.err);
              }
            } else {
              console.error('Failed to fetch movie:', movieResponse.err);
            }
          }

          if (activity.activityType === ActivityEnum.CONCERT && activity.id) {
            const concertResponse: any =
              await backend_concert.getConcertByActivityId(activity.id);
            if ('ok' in concertResponse) {
              activity.concert = concertResponse.ok[1];

              const ticketTypesResponse: any =
                await backend_concert_ticket_type.getConcertTicketTypesByConcertId(
                  activity.concert.id,
                );
              if ('ok' in ticketTypesResponse) {
                activity.concert.concertTicketTypes = ticketTypesResponse.ok[1];
              } else {
                console.error(
                  'Failed to fetch ticket types:',
                  ticketTypesResponse.err,
                );
              }
            } else {
              console.error('Failed to fetch concert:', concertResponse.err);
            }
          }

          return activity;
        }),
      );
      return updatedActivities;
    } else {
      console.error('Failed to fetch activities:', response.err);
      return null;
    }
  } catch (error) {
    console.error('Error fetching activities:', error);
    return null;
  }
};

export const fetchActivityById = async (
  id: bigint,
): Promise<IActivity | null> => {
  try {
    // Fetch the activity by ID
    const response: any = await backend_activity.getActivityById(id);
    if ('ok' in response) {
      const activity: IActivity = response.ok[1];

      // Enrich activity data based on its type
      if (
        activity.activityType === ActivityEnum.TOURIST_ATTRACTION &&
        activity.id
      ) {
        const touristAttractionResponse: any =
          await backend_tourist_attraction.getTouristAttractionByActivityId(
            activity.id,
          );

        if ('ok' in touristAttractionResponse) {
          activity.touristAttraction = touristAttractionResponse.ok[1];
        } else {
          console.error(
            'Failed to fetch tourist attraction:',
            touristAttractionResponse.err,
          );
        }
      }

      if (activity.activityType === ActivityEnum.MOVIE && activity.id) {
        const movieResponse: any = await backend_movie.getMovieByActivityId(
          activity.id,
        );
        if ('ok' in movieResponse) {
          activity.movie = movieResponse.ok[1];

          const actorsResponse: any = await backend_actor.getActorsByMovieId(
            activity.movie!.id!,
          );
          if ('ok' in actorsResponse) {
            activity.movie!.actors = actorsResponse.ok[1];
          } else {
            console.error('Failed to fetch actors:', actorsResponse.err);
          }
        } else {
          console.error('Failed to fetch movie:', movieResponse.err);
        }
      }

      if (activity.activityType === ActivityEnum.CONCERT && activity.id) {
        const concertResponse: any =
          await backend_concert.getConcertByActivityId(activity.id);
        if ('ok' in concertResponse) {
          activity.concert = concertResponse.ok[1];

          const ticketTypesResponse: any =
            await backend_concert_ticket_type.getConcertTicketTypesByConcertId(
              activity.concert.id,
            );
          if ('ok' in ticketTypesResponse) {
            activity.concert.concertTicketTypes = ticketTypesResponse.ok[1];
          } else {
            console.error(
              'Failed to fetch ticket types:',
              ticketTypesResponse.err,
            );
          }
        } else {
          console.error('Failed to fetch concert:', concertResponse.err);
        }
      }

      return activity;
    } else {
      console.error('Failed to fetch activity:', response.err);
      return null;
    }
  } catch (error) {
    console.error('Error fetching activity:', error);
    return null;
  }
};
