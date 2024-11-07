import Nat "mo:base/Nat";

module Types {

  public type TouristAttraction = {
    id : Nat;
    price : Nat;

    // References
    activityId : Nat;
  };

};
