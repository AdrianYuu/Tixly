import RBTree "mo:base/RBTree";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Types "types";

actor Main {

  let rbTree = RBTree.RBTree<Nat, Types.Actor>(Nat.compare);

  var currId : Nat = 1;

  public func createNewActor(newActor : Types.Actor) : async Result.Result<(Text, Nat), Text> {
    try {
      let new : Types.Actor = {
        id = currId;
        name = newActor.name;
        role = newActor.role;
        movieId = newActor.movieId;
      };

      rbTree.put(currId, new);
      currId := currId + 1;
      return #ok(("Successfully created actor.", currId - 1));
    } catch (_) {
      return #err(("Failed to create actor."));
    };
  };

  public func getActors() : async Result.Result<(Text, [Types.Actor]), Text> {
    try {
      var actors = Buffer.Buffer<Types.Actor>(0);

      for (entry in RBTree.iter(rbTree.share(), #bwd)) {
        actors.add(entry.1);
      };

      return #ok(("Successfully get all actors.", Buffer.toArray(actors)));
    } catch (_) {
      return #err(("Failed to get all actors."));
    };
  };

  public func getActorsByMovieId(movieId : Nat) : async Result.Result<(Text, [Types.Actor]), Text> {
    try {
      var actors = Buffer.Buffer<Types.Actor>(0);

      for (entry in RBTree.iter(rbTree.share(), #bwd)) {
        if (entry.1.movieId == movieId) {
          actors.add(entry.1);
        };
      };

      return #ok(("Successfully retrieved actors for the movie.", Buffer.toArray(actors)));
    } catch (_) {
      return #err(("Failed to get actors by movieId."));
    };
  };

};
