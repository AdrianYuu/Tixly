import RBTree "mo:base/RBTree";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Types "types";

actor Main {

  let rbTree = RBTree.RBTree<Nat, Types.Concert>(Nat.compare);

  var currId : Nat = 1;

  public func createConcert(concert : Types.Concert) : async Result.Result<(Text, Nat), Text> {
    try {
      let newConcert : Types.Concert = {
        id = currId;
        date = concert.date;
        time = concert.time;
        location = concert.location;
        venueImage = concert.venueImage;
        concertTicketTypeCount = concert.concertTicketTypeCount;
        salesStartDate = concert.salesStartDate;
        salesEndDate = concert.salesEndDate;
        activityId = concert.activityId;
      };

      rbTree.put(currId, newConcert);
      currId := currId + 1;
      return #ok(("Successfully created concert.", currId - 1));

    } catch (_) {
      return #err(("Failed to create concert."));
    };
  };

  public func getConcerts() : async Result.Result<(Text, [Types.Concert]), Text> {
    try {
      var concerts = Buffer.Buffer<Types.Concert>(0);

      for (entry in RBTree.iter(rbTree.share(), #bwd)) {
        concerts.add(entry.1);
      };

      return #ok(("Successfully get all concerts.", Buffer.toArray(concerts)));
    } catch (_) {
      return #err(("Failed to get all concerts."));
    };
  };

  public func getConcertByActivityId(activityId : Nat) : async Result.Result<(Text, Types.Concert), Text> {
    try {
      for (entry in RBTree.iter(rbTree.share(), #bwd)) {
        if (entry.1.activityId == activityId) {
          return #ok(("Successfully retrieved concert for the activity.", entry.1));
        };
      };

      return #err(("No concert found for the given activityId."));
    } catch (_) {
      return #err(("Failed to get concert by activityId."));
    };
  };

};
