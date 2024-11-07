import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Nat "mo:base/Nat";

module Types {

  public type Activity = {
    id : Nat;
    name : Text;
    description : Text;
    address : Text;
    image : Blob;
    activityType : Text;
  };

};
