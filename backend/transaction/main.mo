import RBTree "mo:base/RBTree";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Types "types";

actor Main {

  let rbTree = RBTree.RBTree<Nat, Types.Transaction>(Nat.compare);

  var currId : Nat = 1;

  public func createTransaction(transaction : Types.Transaction) : async Result.Result<(Text, Nat), Text> {
    try {
      let newTransaction : Types.Transaction = {
        id = currId;
        bookingCode = transaction.bookingCode;
        bookingDate = transaction.bookingDate;
        seatNumber = transaction.seatNumber;
        concertTicketType = transaction.concertTicketType;
        activityId = transaction.activityId;
        principalId = transaction.principalId;
      };

      rbTree.put(currId, newTransaction);
      currId := currId + 1;
      return #ok(("Successfully created transaction.", currId - 1));
    } catch (_) {
      return #err(("Failed to create transaction."));
    };
  };

  public func getTransactionsByPrincipalId(principalId : Text) : async Result.Result<(Text, [Types.Transaction]), Text> {
    try {
      var transactions = Buffer.Buffer<Types.Transaction>(0);

      for (entry in RBTree.iter(rbTree.share(), #bwd)) {
        if (entry.1.principalId == principalId) {
          transactions.add(entry.1);
        };
      };

      return #ok(("Successfully retrieved actors for the movie.", Buffer.toArray(transactions)));
    } catch (_) {
      return #err(("Failed to get actors by movieId."));
    };
  };

};
