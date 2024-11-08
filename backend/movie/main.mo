import RBTree "mo:base/RBTree";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Types "types";

actor Main {

  let rbTree = RBTree.RBTree<Nat, Types.Movie>(Nat.compare);

  var currId : Nat = 1;

  public func createMovie(movie : Types.Movie) : async Result.Result<(Text, Nat), Text> {
    try {
      let newMovie : Types.Movie = {
        id = currId;
        cinemaName = movie.cinemaName;
        cinemaLocation = movie.cinemaLocation;
        date = movie.date;
        time = movie.time;
        theaterNumber = movie.theaterNumber;
        genre = movie.genre;
        ageRating = movie.ageRating;
        language = movie.language;
        trailerUrl = movie.trailerUrl;
        duration = movie.duration;
        director = movie.director;
        price = movie.price;
        activityId = movie.activityId;
      };

      rbTree.put(currId, newMovie);
      currId := currId + 1;
      return #ok(("Successfully created movie.", currId - 1));

    } catch (_) {
      return #err(("Failed to create movie."));
    };
  };

  public func getMovies() : async Result.Result<(Text, [Types.Movie]), Text> {
    try {
      var movies = Buffer.Buffer<Types.Movie>(0);

      for (entry in RBTree.iter(rbTree.share(), #bwd)) {
        movies.add(entry.1);
      };

      return #ok(("Successfully get all movies.", Buffer.toArray(movies)));
    } catch (_) {
      return #err(("Failed to get all concerts."));
    };
  };

  public func getMovieByActivityId(activityId : Nat) : async Result.Result<(Text, Types.Movie), Text> {
    try {
      for (entry in RBTree.iter(rbTree.share(), #bwd)) {
        if (entry.1.activityId == activityId) {
          return #ok(("Successfully retrieved movie for the activity.", entry.1));
        };
      };

      return #err(("No movie found for the given activityId."));
    } catch (_) {
      return #err(("Failed to get movie by activityId."));
    };
  };

};
