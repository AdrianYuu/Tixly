import Text "mo:base/Text";
import Nat "mo:base/Nat";

module Types {

  public type Movie = {
    id : Nat;
    cinemaName : Text;
    cinemaLocation : Text;
    date : Text;
    time : Text;
    theaterNumber : Nat;
    genre : Text;
    ageRating : Text;
    language : Text;
    trailerUrl : Text;
    duration : Text;
    director : Text;
    price : Nat;

    // References
    activityId : Nat;
  };

};
