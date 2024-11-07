import Text "mo:base/Text";
import Nat "mo:base/Nat";

module Types {

  public type ConcertTicketType = {
    id : Nat;
    name : Text;
    price : Text;
    capacity : Nat;

    // References
    concertId : Nat;
  };

};
