module Types {
  public type Actor = {
    id : Nat;
    name : Text;
    role : Text;

    // References
    movieId : Nat;
  };
};
