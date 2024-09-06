/* eslint-disable import/no-cycle */
// /* eslint-disable no-console */
// import { GetProfileDetails } from "@/api/functions/user.api";
// import { logout, setLoginData } from "@/reduxtoolkit/slices/userSlice";
// import { useQuery } from "@tanstack/react-query";
// import { parseCookies } from "nookies";
import { IFormInput, createWalletUser } from "@/api/functions/user.api";
import { sendChatMessage } from "@/lib/functions/sockets.lib";
import { setCookieClient } from "@/lib/functions/storage.lib";
import { IUserChatInterface } from "@/reduxtoolkit/interfaces/interfaces";
import {
  setLoginData,
  setTradeCurrency
} from "@/reduxtoolkit/slices/userSlice";
import { setWalletBalance } from "@/reduxtoolkit/slices/walletSlice";
import { store } from "@/reduxtoolkit/store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount, useBalance } from "wagmi";

import SocketEvents from "@/json/events/socketEvents";
import { useQuery } from "@tanstack/react-query";
import { GlobalSocket } from "pages/_app";
import { useAppSelector } from "../redux/useAppSelector";
import { balanceInterface } from "../utils/useWalletInfo";
import useCurrencyToCoin from "./useCurrencyToCoin";

const useUser = () => {
  const router = useRouter();
  const account = useAccount();

  const ref_link = router.query?.r;

  const userSelector = useAppSelector((state) => state.userSlice);

  const balanceObject: balanceInterface | undefined = useBalance({
    address: account.address as `0x${string}`
  }).data;

  const { refetchDollarPrice: refetch } = useCurrencyToCoin();
  // const {
  //   mutate
  //   // isPending: isCreatingUser,
  //   // data: UserData,
  // } = useMutation({
  //   mutationFn: createWalletUser,
  //   onSuccess: (data) => {
  //     // console.log("createWalletUser response", data);
  //     store.dispatch(setLoginData(data?.data));

  //     const chatPayload: IUserChatInterface = {
  //       avatarUrl: data?.data.profile_image || "",
  //       message: "Has Joined!",
  //       time: Date.now(),
  //       walletId: store.getState().walletSlice.wallet, //walletSelector.wallet,
  //       isNew: true, // user already added to the list when connecting wallet
  //       username: data?.data.username
  //     };

  //     sendChatMessage(chatPayload);
  //     setCookieClient("user_wallet", store.getState().walletSlice.wallet);

  //     store.dispatch(setTradeCurrency("usd"));

  //     // console.log("ss", encryptData(JSON.stringify(data?.data?.data)));
  //     // console.log(
  //     //   "ss2",
  //     //   encryptData(JSON.stringify(data?.data?.data)).toString()
  //     // );

  //     // setCookieClient(
  //     //   "user_wallet",
  //     //   // JSON.stringify(data?.data?.data)
  //     //   encryptData(JSON.stringify(data?.data?.data)).toString()
  //     // );
  //   }
  // });

  const { data: userInfo } = useQuery({
    queryKey: ["fetchUserInfo"],
    queryFn: () => {
      const payload: IFormInput = { walletId: `${account.address}` };
      if (userSelector?.tempAffiliateLink) {
        payload.affiliate_link = userSelector.tempAffiliateLink;
      }

      return createWalletUser(payload);
    },
    enabled: Boolean(account?.address)
  });

  useEffect(() => {
    if (userInfo) {
      store.dispatch(setLoginData(userInfo?.data));

      const chatPayload: IUserChatInterface = {
        avatarUrl: userInfo?.data.profile_image || "",
        message: "Has Joined!",
        time: Date.now(),
        walletId: store.getState().walletSlice.wallet, //walletSelector.wallet,
        isNew: true, // user already added to the list when connecting wallet
        username: userInfo?.data.username
      };

      sendChatMessage(chatPayload);
      setCookieClient("user_wallet", store.getState().walletSlice.wallet);

      store.dispatch(setTradeCurrency("usd"));

      // if (ref_link) {
      //   router.replace("/");
      // }

      // console.log("ss", encryptData(JSON.stringify(data?.data?.data)));
      // console.log(
      //   "ss2",
      //   encryptData(JSON.stringify(data?.data?.data)).toString()
      // );

      // setCookieClient(
      //   "user_wallet",
      //   // JSON.stringify(data?.data?.data)
      //   encryptData(JSON.stringify(data?.data?.data)).toString()
      // );
    }
  }, [userInfo]);

  useEffect(() => {
    // if (balanceObject?.formatted) {
    //   refetchDollarPrice();
    //   store.dispatch(setWalletBalance(Number(balanceObject?.formatted)));
    //   mutate({
    //     walletId: `${account.address}`
    //   });
    //   // new joinee to chat
    // } else {
    //   console.log("THAT");

    //   store.dispatch(setWalletBalance(0));
    //   store.dispatch(setUSDPrice(0));
    // }

    const updateBalanceAndPrice = async () => {
      if (balanceObject?.formatted && account?.address) {
        await refetch();
        store.dispatch(setWalletBalance(Number(balanceObject.formatted)));
        GlobalSocket.emit(SocketEvents.emit.UserActivity, {
          walletId: account.address
        });
        // mutate({
        //   walletId: `${account.address}`
        // });
      } else {
        store.dispatch(setWalletBalance(0));
      }
    };

    updateBalanceAndPrice();
  }, [balanceObject, account?.address]);

  // const cookies = parseCookies();
  // const token: string = cookies[process.env.NEXT_APP_TOKEN_NAME!];
  // const dispatch = useAppDispatch();
  // const { userData } = useAppSelector((s) => s.userSlice);
  // const profileDetails = useQuery({
  //   queryKey: ["userdetails"],
  //   queryFn: GetProfileDetails,
  //   enabled: !!token && userData === null
  //   // onSuccess(data) {
  //   //   if (data?.data?.status === 401) {
  //   //     dispatch(logout());
  //   //   } else {
  //   //     dispatch(setLoginData(data?.data?.data));
  //   //   }
  //   // },
  //   // onError() {
  //   //   dispatch(logout());
  //   // }
  // });
  // useEffect(() => {
  //   if (profileDetails?.data) {
  //     if (profileDetails?.data?.status === 401) {
  //       dispatch(logout());
  //     } else {
  //       dispatch(setLoginData(profileDetails?.data?.data?.data));
  //     }
  //   }
  // }, [profileDetails?.status, profileDetails?.data]);
  // return { ...profileDetails };
};

export default useUser;
