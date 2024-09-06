import { getEthToDollar } from "@/api/functions/congecko.api";
import { setUSDPrice } from "@/reduxtoolkit/slices/walletSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/useAppDispatch";

const useEthToDollar = () => {
  const dispatch = useAppDispatch();
  const { data: ethToDollarAmt, refetch: refetchDollarPrice } = useQuery({
    queryKey: ["eth2Dollar"],
    queryFn: () => {
      return getEthToDollar();
    }
  });
  useEffect(() => {
    if (ethToDollarAmt && ethToDollarAmt?.ethereum?.usd) {
      dispatch(setUSDPrice(ethToDollarAmt.ethereum.usd));
    }
  }, [ethToDollarAmt]);

  return {
    ethToDollarAmt,
    refetchDollarPrice
  };
};

export default useEthToDollar;
