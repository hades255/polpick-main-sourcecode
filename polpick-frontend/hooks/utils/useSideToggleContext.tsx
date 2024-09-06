import { logout } from "@/reduxtoolkit/slices/userSlice";
import { setWallet } from "@/reduxtoolkit/slices/walletSlice";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { useAppDispatch } from "../redux/useAppDispatch";

export interface ToggleContextData {
  panelOpen: boolean;
  togglePanel: () => void;
}

const ToggleSidebarContext = createContext<ToggleContextData>({
  panelOpen: false,
  togglePanel: () => {}
});

const ToggleContext: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [panelOpen, setPanelOpen] = useState(false);

  const togglePanel = () => {
    setPanelOpen((prevPanelOpen) => !prevPanelOpen);
  };

  const contextValue = useMemo(() => {
    return { panelOpen, togglePanel };
  }, [panelOpen]);
  const account = useAccount();
  const dispatch = useAppDispatch();
  // const balance = useBalance();

  // const result: any = useBalance({
  //   address: account.address as `0x${string}`
  // }).data;

  // console.log("result ==>", result);

  // console.log("balance ==>", balance);
  // console.log("account  ==>", account);
  useEffect(() => {
    if (account && account.address !== undefined) {
      dispatch(setWallet(account.address));
    } else {
      dispatch(setWallet(""));
      dispatch(logout());
    }
  }, [account?.address]);

  return (
    <ToggleSidebarContext.Provider value={contextValue}>
      {children}
    </ToggleSidebarContext.Provider>
  );
};

export { ToggleContext, ToggleSidebarContext };
