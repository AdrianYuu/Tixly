import _Types "./types";
import Text "mo:base/Text";

actor UserMain {

  public func ping() : async Text {
    return "Pong";
  };

  public func pong() : async Text {
    return "Ping";
  };

};
