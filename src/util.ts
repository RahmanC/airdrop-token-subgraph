import { BigInt } from "@graphprotocol/graph-ts";
import { Token, User } from "../generated/schema";

export const loadUser = (id: string): User => {
  let user = User.load(id);
  if (user == null) {
    user = new User(id);
    user.balance = BigInt.fromI32(0);
  }

  return user;
};

export const loadToken = (id: string): Token => {
  let token = Token.load(id);
  if (token == null) {
    token = new Token(id);
    token.totalSupply = BigInt.fromI32(0);
  }

  return token;
};
