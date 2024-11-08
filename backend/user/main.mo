import RBTree "mo:base/RBTree";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Types "types";

actor Main {

  let rbTree = RBTree.RBTree<Nat, Types.User>(Nat.compare);

  var currId : Nat = 1;

  public func createUser(user : Types.User) : async Result.Result<(Text, Nat), Text> {
    try {
      let newUser : Types.User = {
        id = currId;
        principalId = user.principalId;
        balance = user.balance;
      };

      rbTree.put(currId, newUser);
      currId := currId + 1;
      return #ok(("Successfully created user.", currId - 1));
    } catch (_) {
      return #err(("Failed to create user."));
    };
  };

  public func getUserByPrincipalId(principalId : Text) : async Result.Result<(Text, Types.User), Text> {
    try {
      for (entry in RBTree.iter(rbTree.share(), #bwd)) {
        if (entry.1.principalId == principalId) {
          return #ok(("Successfully retrieved user.", entry.1));
        };
      };

      return #err(("No user found."));
    } catch (_) {
      return #err(("Failed to get user."));
    };
  };

  public func updateUserBalance(principalId : Text, newBalance : Nat) : async Result.Result<Text, Text> {
    try {
      for (entry in RBTree.iter(rbTree.share(), #bwd)) {
        if (entry.1.principalId == principalId) {
          let updatedUser = {
            id = entry.1.id;
            principalId = entry.1.principalId;
            balance = newBalance;
          };

          rbTree.put(entry.0, updatedUser);
          return #ok("Successfully updated user balance.");
        };
      };

      return #err("No user found.");
    } catch (_) {
      return #err("Failed to update user balance.");
    };
  };

};
