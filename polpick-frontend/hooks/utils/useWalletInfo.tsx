import { useAccount, useBalance } from "wagmi";

export interface balanceInterface {
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
}
const useWalletInfo = () => {
  const account = useAccount();
  const balanceObject: balanceInterface | undefined = useBalance({
    address: account.address as `0x${string}`
  }).data;

  return { balanceObject };
};

export default useWalletInfo;
