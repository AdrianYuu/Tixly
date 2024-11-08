import Text "mo:base/Text";
import Nat "mo:base/Nat";

module Types {

  public type Transaction = {
    id : Nat;
    bookingCode : Text;
    bookingDate : Text;

    seatNumber : [Text];
    concertTicketType : Text;

    activityId : Nat;
    principalId : Text;
  };

};
