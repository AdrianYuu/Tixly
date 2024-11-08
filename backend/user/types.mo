import Text "mo:base/Text";

module Types {

  public type User = {
    id : Nat;
    principalId : Text;
    balance : Nat;
  };

};
