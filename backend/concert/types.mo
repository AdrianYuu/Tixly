import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Nat "mo:base/Nat";

module Types {

  public type Concert = {
    id : Nat;
    date : Text;
    time : Text;
    location : Text;
    venueImage : Blob;
    concertTicketTypeCount : Nat;
    salesStartDate : Text;
    salesEndDate : Text;

    // References
    activityId : Nat;
  };

};
