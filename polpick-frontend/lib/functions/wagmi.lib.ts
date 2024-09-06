import { getBalance } from "@wagmi/core";

export const getWalletBalance = async (walletConfig: any, address: string) => {
  return getBalance(walletConfig, {
    address: address as `0x${string}`
  }).then((e: any) => {
    return e;
  });
};
