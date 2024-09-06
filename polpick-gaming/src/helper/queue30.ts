import BigNumber from "bignumber.js";
import getContract from "./contract";
const { ethers } = require("ethers");
const async = require("async");
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.DEDICATED_BASE_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY_30, provider);
let countTx = 0;
let maxRetries = 3;


const checkPendingTx = async () => {

  let currentNonce = await provider.getTransactionCount(wallet.address)
  let pendingNonce = await provider.getTransactionCount(wallet.address, 'pending')

  if (currentNonce !== pendingNonce) {
    return pendingNonce;
  } else {
    return currentNonce;
  }
}

export async function trigger(poolObj: any, timeMS: any, new_price: any, batchSize: any, attempt: number, calledFrm: string, hasNonce?: boolean) {
  try {
    const contract = getContract();
    // console.log({ time: new Date().toLocaleString(), calledFrm, poolObj, timeMS, new_price, batchSize, attempt });
    console.time("TxTime");
    let nonce = await checkPendingTx();
    if(hasNonce) {
      nonce += 1;
    }
    // const block = await provider.getBlock("latest");

    // // Extract base fee from block
    // const baseFee = block.baseFeePerGas;

    // console.log('Base Fee (in wei):', baseFee.toString());
    const getFeesData = await provider.getFeeData();
    let maxGasFeeLimit = Number(getFeesData.maxFeePerGas);
    let maxGasFeePriority = Number(getFeesData.maxPriorityFeePerGas);

    if(attempt > 1) {
      maxGasFeeLimit = maxGasFeeLimit + (maxGasFeeLimit * (attempt / 10));
      maxGasFeePriority = maxGasFeePriority + (maxGasFeePriority * (attempt / 10));
    }

    console.log({ getFeesData, maxGasFeeLimit, maxGasFeePriority });

    const triggerTx = await contract.trigger(poolObj, timeMS, new_price, batchSize, {
      // gasLimit: new BigNumber(getFeesData.gasPrice).multipliedBy(3).toFixed(0),
      nonce: nonce,
      maxPriorityFeePerGas: new BigNumber(maxGasFeePriority).multipliedBy(1.5).toFixed(0),
      maxFeePerGas: new BigNumber(maxGasFeeLimit).multipliedBy(1.5).toFixed(0)
    });

    await triggerTx.wait();
    console.timeEnd("TxTime");
    console.log(`Trnsaction Reciept Game 30 Tx: [${new Date().toLocaleString()}] `, triggerTx);
    countTx++;
  } catch (error: any) {
    if ((error?.info?.error?.code === -32000 || error) && attempt < maxRetries) {
      console.log("Transaction Error Retrying...", error.message);

      let isNonceExists = false;
      if(error?.code == 'NONCE_EXPIRED') {
        isNonceExists = true;
      }

      await trigger(poolObj, timeMS, new_price, batchSize, attempt + 1, 'RETRY_ATTEMPT', isNonceExists);
   
      (globalThis as any).txnThirtyErrors.push({ time: Date.now(), message: error.message });
    } else {
      console.error("TriggerError: ", error);
    }
  }
}

// const queue = async.queue(async (task: any, callback: any) => {
//   try {
//     trigger(task.poolObj, task.timeMS, task.new_price, task.batchSize, 1, task.calledFrm);
//   } catch (error) {
//     console.log('ErrorQueue: ', error)
//   }
// }, 1);

export async function addTriggerQueue(poolObj: any, timeMS: any, new_price: any, batchSize: any, calledFrm: string) {
  try {
    await trigger(poolObj, timeMS, new_price, batchSize, 1, calledFrm);

    // queue.push({ poolObj, timeMS, new_price, batchSize, calledFrm }, (error: any) => {
    //   if (error) {
    //     console.error("Error processing transaction:", error);
    //   } else {
    //     console.log("Transaction processed successfully.");
    //   }
    // });
  } catch (error) {
    console.log('addTriggerQueueError: ', error)
  }
}
