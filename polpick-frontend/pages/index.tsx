/* eslint-disable no-use-before-define */
/* eslint-disable no-console */

"use client";

/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import { getEthToDollar } from "@/api/functions/congecko.api";
import { getGameType } from "@/api/functions/game.api";
import BetSlider from "@/components/BetSlider/BetSlider";
import GraphSec from "@/components/GraphSec/GraphSec";
import MobilePoolBlock from "@/components/MobilePoolBlock/MobilePoolBlock";
import PoolCard from "@/components/PoolCard/PoolCard";
import TrendSec from "@/components/TrendSec/TrendSec";
import YourBetCard from "@/components/YouBet/YourBetCard";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import abiContracts from "@/json/abi/polpick.abi.json";
import SocketEvents from "@/json/events/socketEvents";
import CardListView from "@/layout/CardListView/CardListView";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";

import JackpotBannerSec from "@/components/JackpotBannerSec/JackpotBannerSec";
import WinningPoolCard from "@/components/WinningPoolCard/WinningPoolCard";
import useDashBoardJackPot from "@/hooks/react-query/useDashBoardJackPot";
import sounds from "@/json/sounds";
import { GameUser, IWinGame } from "@/reduxtoolkit/interfaces/interfaces";
import {
  setGameDetail,
  setWinGameDetails
} from "@/reduxtoolkit/slices/game.slice";
import { setTraderList } from "@/reduxtoolkit/slices/tradeSlice";
import { VictoryContent } from "@/styles/StyledComponents/VictoryContent";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CloseIcon from "@/ui/Icons/CloseIcon";
import DownPoolIcon from "@/ui/Icons/DownPoolIcon";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import {
  Box,
  Grid,
  IconButton,
  List,
  Theme,
  Typography,
  useMediaQuery
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Howl } from "howler";
import * as RocketBetDown from "json/lottie/rocket_bet_amount_down.json";
import * as RocketDown from "json/lottie/rocket_button_down.json";
import * as RocketUp from "json/lottie/rocket_button_up.json";
import * as RocketBetUp from "json/lottie/ur_bet_up_rocket.json";
import * as YouWin from "json/lottie/youwin.json";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import LowBalance from "@/components/LowBalanceModal/LowBalanceModal";
import useUserBetDetails from "@/hooks/utils/useUserBetDetails";
import { TradeListSocketResponse } from "@/interface/socket.interfaces";
import events from "@/json/events/events";
import { contract15, contract30 } from "@/json/smartcontracts/contracts";
import RocketBetIcon from "@/ui/Icons/RocketBetIcon";
import UpPoolIcon from "@/ui/Icons/UpPoolIcon";
import { ethers } from "ethers";
import Lottie from "lottie-react";
import eventEmitter from "services/event.emitter";
import { toast } from "sonner";
import { useAccount, useWriteContract } from "wagmi";
import { GameSocket, GlobalSocket } from "./_app";

export default function Home() {
  // useGameHook();

  const { isMute } = useAppSelector((s) => s.soundSlice);

  const poolSelectedSoundEffect = new Howl({
    src: [sounds.poolselectAudio],
    mute: isMute
  });

  const RoundStartSoundEffect = new Howl({
    src: [sounds.roundStartAudio],
    mute: isMute
  });

  const RoundEndSoundEffect = new Howl({
    src: [sounds.roundEndAudio],
    mute: isMute
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { jackpotstats } = useDashBoardJackPot();
  const userSelector = useAppSelector((state) => state.userSlice.userData);
  const timerSelector = useAppSelector((state) => state.timerSlice);

  const walletSelector = useAppSelector((state) => state.walletSlice);
  const tradeSelector = useAppSelector((state) => state.tradeSlice);
  const gameSelector = useAppSelector((state) => state.gameSlice);
  const isXsScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  // console.log("tradeSelector", tradeSelector);

  const {
    mutate: fetchCurrentUSDPrice
    // isLoading: isCreatingUser,
    // isPending: isCreatingUser,
    // data: UserData,
  } = useMutation({
    mutationFn: getEthToDollar
  });

  const {
    writeContract,
    error: WriteContractError,
    data: transactionHash
  } = useWriteContract();

  // console.log("WriteContractError", WriteContractError);
  const account = useAccount();
  const { userBet, userTradedUp } = useUserBetDetails(account, tradeSelector);

  const [selectedBetAmt, setSelectedBetAmt] = useState<string>("0");

  const { data: gameDetails, isSuccess } = useQuery({
    enabled: Boolean(gameSelector?.gameType),
    queryKey: ["getGameType", gameSelector?.gameType],
    queryFn: () => getGameType({ gameType: gameSelector?.gameType })
  });
  useEffect(() => {
    if (isSuccess) {
      dispatch(setGameDetail(gameDetails?.data));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (timerSelector?.currentGameStatus?.phase) {
      if (timerSelector.currentGameStatus?.phase === "MiningStart") {
        RoundStartSoundEffect.play();
      }
      if (timerSelector.currentGameStatus?.phase === "MiningEnd") {
        RoundEndSoundEffect.play();
      }
    }
  }, [timerSelector.currentGameStatus?.phase]);

  const initiateTrade = async (type: "UP" | "DOWN") => {
    poolSelectedSoundEffect.play();

    const balance = Number(walletSelector.usdBalance.toFixed(2));

    // if (Number(selectedBetAmt) > balance) {
    //   setOpenLowBalanceModal(true);
    //   return;
    // }

    if (!gameSelector.bettingPhase) {
      toast.error("Bettings are closed");
      return;
    }
    fetchCurrentUSDPrice(undefined, {
      onSuccess: (_price) => {
        if (walletSelector.wallet) {
          let body = {
            poolId:
              router.query?.game === "30"
                ? process.env.NEXT_APP_GAME_THIRTY_POOL_ID
                : process.env.NEXT_APP_GAME_FIFTEEN_POOL_ID, //gameDetails?.data?.poolId, //"0x5157455254590d0a",
            avatarUrl: userSelector?.profile_image || "",
            countryCode: "US",
            upOrDown: false,
            whiteLabelId: "",
            gameId: gameSelector.game_id
          };
          if (type === "UP") {
            body = {
              ...body,
              upOrDown: true
            };
          } else {
            body = {
              ...body,
              upOrDown: false
            };
          }

          const usd_to_eth = _price?.ethereum?.usd
            ? (0.038 / _price.ethereum.usd).toFixed(10) // JSON.stringify(Number(selectedBetAmt) / _price.data.ethereum.usd)
            : "0";

          writeContract({
            address: gameSelector.gameType == "30" ? contract30 : contract15,
            // address: smartContractAddress,
            abi: abiContracts,
            functionName: "makeTrade",
            args: [body],
            value: ethers.parseEther(usd_to_eth) //ethers.parseEther("0.00001")  //ethers.parseEther(selectedBetAmt) // need to be dynamic
          });
        } else {
          eventEmitter.emit(events.openSignUpModal);

          // toast.warning("Please connect your wallet first.");
        }
      }
    });
  };

  const [openLowBalanceModal, setOpenLowBalanceModal] =
    useState<boolean>(false);
  const [openVictoryPopUp, setOpenVictoryPopUp] = useState<boolean>(false);
  const [userRewardData, setUserRewardData] = useState<GameUser | undefined>(
    undefined
  );

  const closeLowBalanceModal = (action: "redirect" | "none") => {
    setOpenLowBalanceModal(false);
    if (action === "redirect") {
      // setOpenTopUpModal(true);
    }
  };

  const handleClose = () => {
    setOpenVictoryPopUp(false);
  };

  useEffect(() => {
    if (GameSocket.connected) {
      if (router?.query?.game === "30") {
        GameSocket.emit(SocketEvents.emit.EmitGetGameData, { gameType: "30" });
      } else {
        GameSocket.emit(SocketEvents.emit.EmitGetGameData, { gameType: "15" });
      }
    }
  }, [GameSocket.connected, router.query?.game]);

  useEffect(() => {
    const traderList = async (data: TradeListSocketResponse) => {
      dispatch(setTraderList(data));
    };

    const dispatchWinData = (data: IWinGame) => {
      dispatch(setWinGameDetails(data));
      if (
        walletSelector.wallet &&
        data?.users?.findIndex((s) => s.walletId === walletSelector.wallet) !==
          -1
      ) {
        setOpenVictoryPopUp(true);
        setTimeout(() => {
          setOpenVictoryPopUp(false);
        }, 5000);
        setUserRewardData(
          data?.users?.find((s) => s.walletId === walletSelector.wallet)
        );
      }
    };
    if (GlobalSocket.connected) {
      if (router.query?.game === "30") {
        GlobalSocket.emit(SocketEvents.listen.TraderList30, null);
        GlobalSocket.on(SocketEvents.listen.TraderList30, traderList);
        GlobalSocket.off(SocketEvents.listen.TraderList15, traderList);
      } else {
        GlobalSocket.emit(SocketEvents.listen.TraderList15, null);
        GlobalSocket.on(SocketEvents.listen.TraderList15, traderList);
        GlobalSocket.off(SocketEvents.listen.TraderList30, traderList);
      }
    }
    if (GameSocket.connected) {
      if (router.query?.game === "30") {
        GameSocket.on(SocketEvents.listen.GameWinner30, dispatchWinData);
        GameSocket.off(SocketEvents.listen.GameWinner15, dispatchWinData);
      } else {
        GameSocket.on(SocketEvents.listen.GameWinner15, dispatchWinData);
        GameSocket.off(SocketEvents.listen.GameWinner30, dispatchWinData);
      }
    }

    return () => {
      GlobalSocket.off(SocketEvents.listen.TraderList30, traderList);
      GlobalSocket.off(SocketEvents.listen.TraderList15, traderList);
      GameSocket.off(SocketEvents.listen.GameWinner15, dispatchWinData);
      GameSocket.off(SocketEvents.listen.GameWinner30, dispatchWinData);
    };
  }, [router.query, GlobalSocket.connected, GameSocket.connected]);

  useEffect(() => {
    if (tradeSelector?.up_array?.length || tradeSelector?.down_array?.length) {
      const poolList = document.querySelectorAll(".pool-list");
      if (poolList) {
        poolList.forEach((data: any) => {
          const arr = Array.from(data?.getElementsByTagName("li"));
          if (arr) {
            arr.map((ele: any, index: number) => {
              setTimeout(() => {
                ele.classList.add("animate");
              }, 500 * index);
            });
          }
        });
      }
    }
  }, [tradeSelector?.up_array, tradeSelector?.down_array]);

  const getWinLoseSide = (side: "up" | "down") => {
    if (
      !gameSelector?.winGameDetails?.totalDownUsers &&
      !gameSelector.winGameDetails?.totalUpUsers
    ) {
      return "no_win";
    } else if (gameSelector?.winGameDetails?.upOrDown === "draw") {
      return "draw";
    } else if (
      side === "up" &&
      gameSelector?.winGameDetails?.upOrDown === "up"
    ) {
      return "win";
    } else if (
      side === "down" &&
      gameSelector?.winGameDetails?.upOrDown === "down"
    ) {
      return "win";
    } else {
      return "lose";
    }
  };

  const [isPlayingRocketUp, setIsPlayingRocketUp] = useState(false);
  const [isPlayingRocketDown, setIsPlayingRocketDown] = useState(false);
  const lottieRef = useRef(null);

  useEffect(() => {
    if (userBet) {
      if (userTradedUp) {
        setIsPlayingRocketUp(true);
      } else {
        setIsPlayingRocketDown(true);
      }
    } else {
      setIsPlayingRocketUp(false);
      setIsPlayingRocketDown(false);
    }
  }, [userBet, userTradedUp]);

  const betIcon: React.ReactNode = isPlayingRocketUp ? (
    <Lottie
      loop={false}
      autoPlay
      className="btnlottie up"
      animationData={RocketBetUp}
      // ref={lottieRef}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice"
      }}
      height={40}
      width={40}
    />
  ) : isPlayingRocketDown ? (
    <Lottie
      loop={false}
      autoPlay
      className="btnlottie down"
      animationData={RocketBetDown}
      // ref={lottieRef}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice"
      }}
      height={40}
      width={40}
    />
  ) : (
    <RocketBetIcon />
  );

  useEffect(() => {
    if (!gameSelector.bettingPhase) {
      setIsPlayingRocketUp(false);
      setIsPlayingRocketDown(false);
    }
  }, [gameSelector]);

  useEffect(() => {
    const addOverflowHidden = () => {
      document.documentElement.style.overflow = "hidden";
    };

    addOverflowHidden();

    // Cleanup function to remove the style when the component is unmounted
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [openVictoryPopUp]);

  return (
    <>
      <DashboardWrapper headerTitle="">
        <Box className="grap_sec">
          <GraphSec />
        </Box>
        <Box className="trend_sec">
          <TrendSec />
        </Box>
        <Box
          className="pool-card-sec"
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4.5}>
              {gameSelector?.winGameDetails ? (
                <WinningPoolCard
                  mainTitle="Up Pool"
                  result={
                    getWinLoseSide("up")
                    // gameSelector?.winGameDetails?.upOrDown ? "win" : "lose"
                  }
                  numberOfPlayers={
                    gameSelector?.winGameDetails?.totalUpUsers || 0
                    // gameSelector?.winGameDetails?.upOrDown !== "draw"
                    //   ? gameSelector?.winGameDetails?.totalUpUsers || 0
                    //   : 0
                  }
                  poolAmount={
                    gameSelector?.winGameDetails?.totalUpAmount
                      ? gameSelector?.winGameDetails?.totalUpAmount.toFixed(5)
                      : 0.0
                  }
                />
              ) : (
                <PoolCard
                  poolName="Up Pool"
                  // countPool="135"
                  countPool={
                    tradeSelector?.up_array?.length
                      ? tradeSelector.up_array.length.toString()
                      : "0"
                  }
                  // maticAmount="1200.00"
                  maticAmount={
                    tradeSelector?.up_total
                      ? (
                          tradeSelector.up_total * walletSelector.usd_price
                        ).toFixed(2)
                      : "0.0"
                  } // "1200.00"
                  buttonTxt="Up"
                  cardBgColor
                  makeTrade={initiateTrade}
                  tradeType="UP"
                  // btnIcon={<UpPoolIcon />}
                  btnIcon={
                    !isPlayingRocketUp ? (
                      <UpPoolIcon className="rckt_up_btn" />
                    ) : (
                      <Lottie
                        loop
                        autoPlay
                        className="btnlottie up"
                        animationData={RocketUp}
                        ref={lottieRef}
                        rendererSettings={{
                          preserveAspectRatio: "xMidYMid slice"
                        }}
                        height={50}
                        width={50}
                      />
                    )
                  }
                >
                  <Box className="scroll-fade">
                    <List disablePadding className="pool-list">
                      {/* {poolDataItem.map((data, index) => (
                    <CardListView index={index} data={data} />
                  ))} */}
                      {tradeSelector?.up_array &&
                      tradeSelector?.up_array?.length
                        ? tradeSelector?.up_array.map((data, index) => (
                            <CardListView index={index} data={data} />
                          ))
                        : null}
                    </List>
                  </Box>
                </PoolCard>
              )}
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <YourBetCard selectBetAmt={setSelectedBetAmt} icon={betIcon} />
            </Grid>
            <Grid item xs={12} md={4} lg={4.5}>
              {gameSelector?.winGameDetails ? (
                <WinningPoolCard
                  mainTitle="Down Pool"
                  result={
                    getWinLoseSide("down")
                    // !gameSelector?.winGameDetails?.upOrDown ? "win" : "lose"
                  }
                  numberOfPlayers={
                    gameSelector?.winGameDetails?.totalDownUsers || 0
                    // gameSelector?.winGameDetails?.upOrDown !== "draw"
                    //   ? gameSelector?.winGameDetails?.totalDownUsers || 0
                    //   : 0
                    // gameSelector?.winGameDetails?.totalDownUsers || 0
                  }
                  poolAmount={
                    gameSelector?.winGameDetails?.totalDownAmount
                      ? gameSelector?.winGameDetails?.totalDownAmount.toFixed(5)
                      : 0.0
                  }
                />
              ) : (
                <PoolCard
                  poolName="Down Pool"
                  countPool={
                    tradeSelector?.down_array?.length
                      ? tradeSelector.down_array.length.toString()
                      : "0"
                  } //135
                  maticAmount={
                    tradeSelector?.down_total
                      ? (
                          tradeSelector.down_total * walletSelector.usd_price
                        ).toFixed(2)
                      : "0.0"
                  }
                  buttonTxt="Down"
                  cardBgColor={false}
                  makeTrade={initiateTrade}
                  tradeType="DOWN"
                  btnIcon={
                    !isPlayingRocketDown ? (
                      <DownPoolIcon />
                    ) : (
                      <Lottie
                        loop
                        autoPlay
                        className="btnlottie down"
                        animationData={RocketDown}
                        ref={lottieRef}
                        rendererSettings={{
                          preserveAspectRatio: "xMidYMid slice"
                        }}
                        height={50}
                        width={50}
                      />
                    )
                  }
                >
                  <List disablePadding className="pool-list">
                    {tradeSelector?.down_array &&
                    tradeSelector?.down_array?.length
                      ? tradeSelector?.down_array.map((data, index) => (
                          <CardListView index={index} data={data} />
                        ))
                      : null}
                    {/* {poolDataItem.map((data, index) => (
                  <CardListView index={index} data={data} />
                ))} */}
                  </List>
                </PoolCard>
              )}
            </Grid>
          </Grid>
        </Box>
        <Box className="poolBoxs" sx={{ display: { xs: "block", md: "none" } }}>
          <Grid container spacing={2.5}>
            <Grid item xs={6} key="dwnPoolMbl">
              {gameSelector?.winGameDetails ? (
                <WinningPoolCard
                  mainTitle="Up Pool"
                  result={
                    getWinLoseSide("up")
                    // gameSelector?.winGameDetails?.upOrDown ? "win" : "lose"
                  }
                  numberOfPlayers={
                    gameSelector?.winGameDetails?.totalUpUsers || 0
                    // gameSelector?.winGameDetails?.upOrDown !== "draw"
                    //   ? gameSelector?.winGameDetails?.totalUpUsers || 0
                    //   : 0
                  }
                  poolAmount={
                    gameSelector?.winGameDetails?.totalUpAmount
                      ? (
                          gameSelector.winGameDetails.totalUpAmount *
                          walletSelector.usd_price
                        ).toFixed(2)
                      : gameSelector?.winGameDetails?.totalUpAmount?.toFixed(
                          2
                        ) || "0.0"
                  }
                />
              ) : (
                <MobilePoolBlock
                  makeTrade={initiateTrade}
                  totalPeople={
                    tradeSelector?.up_array?.length
                      ? tradeSelector.up_array.length.toString()
                      : "0"
                  }
                  status="up"
                  price={
                    tradeSelector?.up_total
                      ? tradeSelector.up_total.toFixed(2)
                      : "0"
                  }
                  betAmt={Number(selectedBetAmt)}
                />
              )}
            </Grid>
            <Grid item xs={6} key="upPoolMbl">
              {gameSelector?.winGameDetails ? (
                <WinningPoolCard
                  mainTitle="Down Pool"
                  result={
                    getWinLoseSide("down")
                    // !gameSelector?.winGameDetails?.upOrDown ? "win" : "lose"
                  }
                  numberOfPlayers={
                    gameSelector?.winGameDetails?.totalDownUsers || 0
                    // gameSelector?.winGameDetails?.upOrDown !== "draw"
                    //   ? gameSelector?.winGameDetails?.totalDownUsers || 0
                    //   : 0
                    // gameSelector?.winGameDetails?.totalDownUsers || 0
                  }
                  poolAmount={
                    gameSelector?.winGameDetails?.totalDownAmount
                      ? (
                          gameSelector.winGameDetails.totalDownAmount *
                          walletSelector.usd_price
                        ).toFixed(2)
                      : gameSelector?.winGameDetails?.totalDownAmount?.toFixed(
                          2
                        ) || "0.0"
                  }
                />
              ) : (
                <MobilePoolBlock
                  makeTrade={initiateTrade}
                  status="down"
                  totalPeople={
                    tradeSelector?.down_array?.length
                      ? tradeSelector.down_array.length.toString()
                      : "0"
                  }
                  price={
                    tradeSelector?.down_total
                      ? tradeSelector.down_total.toFixed(2)
                      : "0"
                  }
                  betAmt={Number(selectedBetAmt)}
                />
              )}
            </Grid>
          </Grid>
        </Box>

        {/* <Box sx={{ display: { xs: "block", md: "none" } }}>
        <BetPointSec />
      </Box> */}
        <Box
          sx={{
            display: {
              xs: "block",
              md: "none"
            }
          }}
        >
          <BetSlider selectBetAmt={setSelectedBetAmt} />
        </Box>
        <JackpotBannerSec />
      </DashboardWrapper>
      <LowBalance
        open={openLowBalanceModal}
        handleModalClose={closeLowBalanceModal}
      />
      <MuiModalWrapper
        className="victory_modal"
        open={openVictoryPopUp}
        onClose={handleClose}
        title=""
      >
        <VictoryContent onClick={handleClose}>
          {/* <Image
            src={assest?.victory_txt}
            alt="victory_txt"
            width={1027}
            height={90}
            className="victory_txt"
          /> */}
          {/* <Image
            src={assest?.victory_cup}
            alt="victory_cup"
            width={1027}
            height={90}
            className="victory_cup"
          /> */}
          <Lottie
            loop={false}
            autoPlay
            animationData={YouWin}
            className="victorylottie"
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice"
            }}
          />
          <Box className="earned_block">
            <IconButton onClick={handleClose} autoFocus className="close_icon">
              <CloseIcon />
            </IconButton>
            <Box className="earned_block_most_otr">
              <Box className="earned_block_otr">
                <Box className="earned_block_inner">
                  <Box className="earned_contents">
                    <Typography variant="h4">Earned</Typography>
                    <Typography variant="h3">
                      {/* <i>
                        <CryptoCoinOrange />
                      </i> */}
                      ${userRewardData?.totalReturn.toFixed(3)}
                    </Typography>
                    <CustomButtonPrimary
                      variant="contained"
                      color="secondary"
                      onClick={handleClose}
                    >
                      <Typography> New Game</Typography>
                    </CustomButtonPrimary>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </VictoryContent>
      </MuiModalWrapper>

      {/* <DemoModalComponent /> */}
    </>
  );
}

// const Home = () => {
//   return <div>index</div>;
// };

// export default Home;
