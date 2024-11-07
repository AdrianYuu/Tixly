import RBTree "mo:base/RBTree";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Types "types";

actor Main {

  let rbTree = RBTree.RBTree<Nat, Types.TouristAttraction>(Nat.compare);

  var currId : Nat = 1;

  public func createTouristAttraction(touristAttraction : Types.TouristAttraction) : async Result.Result<Text, Text> {
    try {
      let newTouristAttraction : Types.TouristAttraction = {
        id = currId;
        price = touristAttraction.price;
        activityId = touristAttraction.activityId;
      };

      rbTree.put(currId, newTouristAttraction);
      currId := currId + 1;
      return #ok(("Successfully created tourist attraction."));

    } catch (_) {
      return #err(("Failed to create tourist attraction."));
    };
  };

  public func getTouristAttractions() : async Result.Result<(Text, [Types.TouristAttraction]), Text> {
    try {
      var touristAttractions = Buffer.Buffer<Types.TouristAttraction>(0);

      for (entry in RBTree.iter(rbTree.share(), #bwd)) {
        touristAttractions.add(entry.1);
      };

      return #ok(("Successfully get all tourist attractions.", Buffer.toArray(touristAttractions)));
    } catch (_) {
      return #err(("Failed to get all tourist attractions."));
    };
  };

  public func getTouristAttractionByActivityId(activityId : Nat) : async Result.Result<(Text, Types.TouristAttraction), Text> {
    try {
      for (entry in RBTree.iter(rbTree.share(), #bwd)) {
        if (entry.1.activityId == activityId) {
          return #ok(("Successfully retrieved tourist attraction for the activity.", entry.1));
        };
      };

      return #err(("No tourist attraction found for the given activityId."));
    } catch (_) {
      return #err(("Failed to get tourist attraction by activityId."));
    };
  };

  public func ping() {

  };

};
