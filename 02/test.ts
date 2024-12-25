import {
  Keypair,
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  TransactionSignature,
  BlockheightBasedTransactionConfirmationStrategy,
  BlockhashWithExpiryBlockHeight,
  RpcResponseAndContext,
  SignatureResult,
} from "@solana/web3.js";

let payer: Keypair = Keypair.generate();

let connection: Connection = new Connection("http://127.0.0.1:8899");

let airdropSignature: TransactionSignature = await connection.requestAirdrop(
  payer.publicKey,
  5 * LAMPORTS_PER_SOL
);

const latestBlockHash: BlockhashWithExpiryBlockHeight =
  await connection.getLatestBlockhash();

const strategy: BlockheightBasedTransactionConfirmationStrategy = {
  signature: airdropSignature,
  blockhash: latestBlockHash.blockhash,
  lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
};

let result: RpcResponseAndContext<SignatureResult> =
  await connection.confirmTransaction(strategy);

console.log(result);

console.log(await connection.getBalance(payer.publicKey));
