import RBTree "mo:base/RBTree";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Types "types";

actor Main {

  let rbTree = RBTree.RBTree<Nat, Types.Activity>(Nat.compare);

  var currId : Nat = 1;

  public func createActivity(activity : Types.Activity) : async Result.Result<(Text, Nat), Text> {
    try {
      let newActivity : Types.Activity = {
        id = currId;
        name = activity.name;
        description = activity.description;
        address = activity.address;
        image = activity.image;
        activityType = activity.activityType;
      };

      rbTree.put(currId, newActivity);
      currId := currId + 1;
      return #ok(("Successfully created activity.", currId - 1));
    } catch (_) {
      return #err(("Failed to create activity."));
    };
  };

  public func getActivities() : async Result.Result<(Text, [Types.Activity]), Text> {
    try {
      var activities = Buffer.Buffer<Types.Activity>(0);

      for (entry in RBTree.iter(rbTree.share(), #bwd)) {
        activities.add(entry.1);
      };

      return #ok(("Successfully get all activities.", Buffer.toArray(activities)));
    } catch (_) {
      return #err(("Failed to get all activities."));
    };
  };

};
