import RBTree "mo:base/RBTree";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Types "types";

actor Main {

  let rbTree = RBTree.RBTree<Nat, Types.Favorite>(Nat.compare);

  var currId : Nat = 1;

  public func createFavorite(activity : Types.Favorite) : async Result.Result<Text, Text> {
    try {
      let newFavorite : Types.Favorite = {
        id = currId;
        principalId = activity.principalId;
        activityId = activity.activityId;
      };

      rbTree.put(currId, newFavorite);
      currId := currId + 1;
      return #ok(("Successfully created favorite."));
    } catch (_) {
      return #err(("Failed to create favorite."));
    };
  };

  public func getUserFavorites(activityId : Nat) : async Result.Result<(Text, [Text]), Text> {
    try {
      var favorites = Buffer.Buffer<Text>(0);

      for (entry in RBTree.iter(rbTree.share(), #bwd)) {
        if (entry.1.activityId == activityId) favorites.add(entry.1.principalId);
      };

      return #ok(("Successfully get all favorites.", Buffer.toArray(favorites)));
    } catch (_) {
      return #err(("Failed to get all favorites."));
    };
  };

  public func getFavoritesUser(principalId : Text) : async Result.Result<(Text, [Nat]), Text> {
    try {
      var favorites = Buffer.Buffer<Nat>(0);

      for (entry in RBTree.iter(rbTree.share(), #bwd)) {
        if (entry.1.principalId == principalId) favorites.add(entry.1.activityId);
      };

      return #ok(("Successfully get all favorites.", Buffer.toArray(favorites)));
    } catch (_) {
      return #err(("Failed to get all favorites."));
    };
  };

  public func removeFavorite(principalId : Text, activityId : Nat) : async Result.Result<Text, Text> {
    try {
      var foundKey : Nat = 0;

      for (entry in RBTree.iter(rbTree.share(), #fwd)) {
        if (entry.1.principalId == principalId and entry.1.activityId == activityId) {
          foundKey := entry.0;
        };
      };

      if (foundKey == 0) {
        return #err("Failed to remove favorite.");
      };

      rbTree.delete(foundKey);
      return #ok("Successfully removed favorite.");
    } catch (_) {
      return #err("Failed to remove favorite.");
    };
  };

};
