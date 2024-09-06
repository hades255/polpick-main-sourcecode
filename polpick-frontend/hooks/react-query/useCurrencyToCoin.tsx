// import { getCurrencyToCoin } from "@/api/functions/coinexchange.api";
// import { useMutation } from "@tanstack/react-query";
import { getCurrencyToCoin } from "@/api/functions/coinexchange.api";
import { setUSDPrice } from "@/reduxtoolkit/slices/walletSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/useAppDispatch";

const useCurrencyToCoin = () => {
  const dispatch = useAppDispatch();
  const { data: ethToDollarAmt, refetch: refetchDollarPrice } = useQuery({
    queryKey: ["CBeth2Dollar"],
    queryFn: () => {
      return getCurrencyToCoin("eth");
    }
  });
  useEffect(() => {
    if (ethToDollarAmt && ethToDollarAmt?.data?.rates) {
      dispatch(setUSDPrice(Number(ethToDollarAmt?.data?.rates[`USD`])));
    }
  }, [ethToDollarAmt]);

  return {
    ethToDollarAmt,
    refetchDollarPrice
  };
};

export default useCurrencyToCoin;
