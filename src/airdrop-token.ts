import { Transfer as TransferEvent } from "../generated/AirdropToken/AirdropToken";
import { Transfer } from "../generated/schema";
import { loadToken, loadUser } from "./util";

export function handleTransfer(event: TransferEvent): void {
  // Load the token entity, or create if doesn't exist
  let token = loadToken(event.address.toHex());

  // Update the token totalSupply
  token.totalSupply = token.totalSupply.plus(event.params.value);

  // Load the sender and receiver
  let fromUser = loadUser(event.params.from.toHex());
  let toUser = loadUser(event.params.to.toHex());

  // Update balances
  fromUser.balance = fromUser.balance.minus(event.params.value);
  toUser.balance = toUser.balance.plus(event.params.value);

  let transfer = new Transfer(event.transaction.hash.toHex());
  transfer.from = fromUser.id;
  transfer.to = toUser.id;
  transfer.value = event.params.value;
  transfer.token = token.id;
  transfer.timestamp = event.block.timestamp;
  transfer.transactionHash = event.transaction.hash;

  token.save();
  fromUser.save();
  toUser.save();
  transfer.save();
}
