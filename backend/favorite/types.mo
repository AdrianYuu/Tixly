import Nat "mo:base/Nat";

module Types {

  public type Favorite = {
    id : Nat;
    principalId : Text;
    activityId : Nat;
  };

};
