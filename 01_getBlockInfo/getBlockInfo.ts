import {
  Connection,
  clusterApiUrl,
  GetVersionedBlockConfig,
  VersionedBlockResponse,
} from "@solana/web3.js";

let connection: Connection = new Connection(
  clusterApiUrl("devnet"),
  "confirmed"
);

let slot = await connection.getSlot();

console.log(`slot is ${slot}`);

let blockTime = await connection.getBlockTime(slot);
console.log(`block time is ${blockTime}`);

let slotLeader = await connection.getSlotLeader();
console.log(slotLeader);

// deprecated
// let block = await connection.getBlock(slot);
let block: VersionedBlockResponse | null = await connection.getBlock(slot, {
  maxSupportedTransactionVersion: 0,
});

console.dir(block);
