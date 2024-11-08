import RBTree "mo:base/RBTree";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Types "types";

actor Main {

  let rbTree = RBTree.RBTree<Nat, Types.ConcertTicketType>(Nat.compare);

  var currId : Nat = 1;

  public func createConcertTicketType(concertTicketType : Types.ConcertTicketType) : async Result.Result<(Text, Nat), Text> {
    try {
      let newConcertTicketType : Types.ConcertTicketType = {
        id = currId;
        name = concertTicketType.name;
        price = concertTicketType.price;
        capacity = concertTicketType.capacity;
        concertId = concertTicketType.concertId;
      };

      rbTree.put(currId, newConcertTicketType);
      currId := currId + 1;
      return #ok(("Successfully created concert ticket type.", currId - 1));
    } catch (_) {
      return #err(("Failed to create concert ticket type."));
    };
  };

  public func getConcertTicketTypes() : async Result.Result<(Text, [Types.ConcertTicketType]), Text> {
    try {
      var concertTicketTypes = Buffer.Buffer<Types.ConcertTicketType>(0);

      for (entry in RBTree.iter(rbTree.share(), #bwd)) {
        concertTicketTypes.add(entry.1);
      };

      return #ok(("Successfully get all concert ticket type.", Buffer.toArray(concertTicketTypes)));
    } catch (_) {
      return #err(("Failed to get all concert ticket type."));
    };
  };

  public func getConcertTicketTypesByConcertId(concertId : Nat) : async Result.Result<(Text, [Types.ConcertTicketType]), Text> {
    try {
      var concertTicketTypes = Buffer.Buffer<Types.ConcertTicketType>(0);

      for (entry in RBTree.iter(rbTree.share(), #bwd)) {
        if (entry.1.concertId == concertId) {
          concertTicketTypes.add(entry.1);
        };
      };

      return #ok(("Successfully retrieved concert ticket types for the concert.", Buffer.toArray(concertTicketTypes)));
    } catch (_) {
      return #err(("Failed to get concert ticket types by concertId."));
    };
  };

};
