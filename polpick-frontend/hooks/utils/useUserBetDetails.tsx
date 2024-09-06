import { IMakeTrade } from "@/reduxtoolkit/interfaces/interfaces";
import { tradeInitalState } from "@/reduxtoolkit/slices/tradeSlice";
import { useEffect, useState } from "react";
import { UseAccountReturnType } from "wagmi";

const useUserBetDetails = (
  account: UseAccountReturnType,
  tradeSelector: tradeInitalState
) => {
  const [userTradedUp, setUserTradedUp] = useState<boolean>(false);
  const [userBet, setUserBet] = useState<IMakeTrade | undefined>(undefined);

  const getUserBetDetails = () => {
    if (
      account?.address &&
      (tradeSelector?.down_array?.length || tradeSelector.up_array?.length)
    ) {
      const _temp = [...tradeSelector.down_array, ...tradeSelector.up_array];
      const fndObject = _temp.filter((s) => s.walletId === account.address)[0];
      if (fndObject) {
        setUserTradedUp(fndObject.upOrDown);
        setUserBet(fndObject);
      } else {
        setUserTradedUp(false);
        setUserBet(undefined);
      }
    } else {
      setUserTradedUp(false);
      setUserBet(undefined);
    }
  };
  useEffect(() => {
    getUserBetDetails();
  }, [
    account?.address,
    tradeSelector?.down_array?.length,
    tradeSelector?.up_array?.length
  ]);
  // console.log("userBet",userBet);

  return { userTradedUp, userBet };
};

export default useUserBetDetails;
