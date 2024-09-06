/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { ToggleSidebarContext } from "@/hooks/utils/useSideToggleContext";
import assest from "@/json/assest";
import {
  logout,
  setTempAffiliateLink,
  setUserTicketProgress
} from "@/reduxtoolkit/slices/userSlice";
import { DashboardHeaderStyled } from "@/styles/StyledComponents/DashboardHeaderStyled";
import { primaryColors } from "@/themes/_muiPalette";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import AddIcon from "@/ui/Icons/AddIcon";
import BitCoinIcon from "@/ui/Icons/BitCoinIcon";
import DashBoardMenuIcon from "@/ui/Icons/DashBoardMenuIcon";
import LogoMain from "@/ui/Icons/LogoMain";
import TimerIcon from "@/ui/Icons/TimerIcon";
import WalletIconHeader from "@/ui/Icons/WalletIconHeader";
import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  styled,
  useMediaQuery
} from "@mui/material";
import useDetectScroll from "@smakss/react-scroll-direction";
import * as CoinShower from "json/lottie/coins_down_pool.json";
import Lottie from "lottie-react";

import SignUpWalletModal from "@/components/SignUpWalletModal/SignUpWalletModal";
import UserStreakBadge from "@/components/UserStreakBade/UserStreakBadge";
import useUserBetDetails from "@/hooks/utils/useUserBetDetails";

import SocketEvents from "@/json/events/socketEvents";
// import { web3AuthInstance } from "@/lib/Web3AuthConnectorInstance/Web3AuthConnectorInstance";
import AffiliateSignupModal from "@/components/AffiliateSignup/AffiliateSignup";
import useEventEmitter from "@/hooks/utils/useEventEmitter";
import events from "@/json/events/events";
import { getFlag } from "@/lib/functions/_helpers.lib";
import { getWalletBalance } from "@/lib/functions/wagmi.lib";
import { setGameType } from "@/reduxtoolkit/slices/game.slice";
import { toggleMute } from "@/reduxtoolkit/slices/soundSlice";
import { setWalletBalance } from "@/reduxtoolkit/slices/walletSlice";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GlobalSocket } from "pages/_app";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import eventEmitter from "services/event.emitter";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Auth, walletConfig } from "../WalletWrapper/WalletWrapper";

interface headerProps extends BoxProps {
  headerHeightCallBack: any;
  headerTitle?: string;
}

export const AvatarMenu = styled(Menu, {
  shouldForwardProp: (data) => data !== "avatarMenuWidth"
})<{ avatarMenuWidth: number | undefined }>`
  .MuiPaper-root {
    background: ${primaryColors?.white};
    box-shadow: 0px 3px 28px -6px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    ul {
      padding: 10px;
    }
  }
`;

const DashboardHeader: React.FC<headerProps & BoxProps> = ({
  headerHeightCallBack,
  headerTitle,
  ...props
}) => {
  const { disconnect: disconnectWallet } = useDisconnect({
    config: walletConfig
  });

  const { panelOpen, togglePanel } = useContext(ToggleSidebarContext);
  const account = useAccount();

  const router = useRouter();

  const dispatch = useAppDispatch();
  const { isLoggedIn, userData } = useAppSelector((state) => state.userSlice);

  const walletSelector = useAppSelector((state) => state.walletSlice);
  const tradeSelector = useAppSelector((state) => state.tradeSlice);
  const { isMute } = useAppSelector((state) => state.soundSlice);
  const userSelector = useAppSelector((state) => state.userSlice.userData);
  const ticketSelector = useAppSelector(
    (state) => state.userSlice.userTicketProgress
  );

  const { userBet } = useUserBetDetails(account, tradeSelector);

  const { open } = useWeb3Modal();

  const headerRef = useRef<HTMLDivElement>(null);
  const avatarBlockRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState<number | undefined>(0);
  const [avatarMenuWidth, setAvatarMenuWidth] = useState<number | undefined>(0);

  const [currency, setCurrency] = useState(
    (router.query?.game as string) || "15"
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openAvatar = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [showWin, setShowWin] = useState(false);

  const fetchWalletBalance = useCallback(
    async (e: { refreshBalance: boolean; walletId: string; flag: boolean }) => {
      // console.log("ef", e);
      if (account?.address) {
        try {
          const currBalance = await getWalletBalance(
            walletConfig,
            account.address
          );

          if (currBalance?.formatted !== "") {
            dispatch(setWalletBalance(Number(currBalance?.formatted)));
            if (e.flag) {
              setShowWin(true);
              setTimeout(() => {
                setShowWin(false);
              }, 7500);
            }
          }
        } catch (error) {
          console.error("Error fetching wallet balance:", error);
        }
      }
    },
    []
  );
  // useEffect(() => {
  //   fetchWalletBalance();
  // }, [userBet?.tradeAmount]);

  useEffect(() => {
    if (GlobalSocket.connected) {
      GlobalSocket.on(
        SocketEvents.socketRoom.userBalanceRoom(walletSelector?.wallet),
        fetchWalletBalance
      );
    }
    return () => {
      GlobalSocket.off(
        SocketEvents.socketRoom.userBalanceRoom(walletSelector?.wallet),
        fetchWalletBalance
      );
    };
  }, [GlobalSocket.connected]);

  useEffect(() => {
    if (avatarBlockRef.current) {
      setAvatarMenuWidth(avatarBlockRef.current?.clientWidth);
      const adjustWidth = () => {
        setAvatarMenuWidth(avatarBlockRef.current?.clientWidth);
      };

      window.addEventListener("resize", adjustWidth);

      return () => {
        window.removeEventListener("resize", adjustWidth);
      };
    }
    return () => {};
  }, [avatarBlockRef.current]);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current?.clientHeight);
      const adjustHeight = () => {
        setHeaderHeight(headerRef.current?.clientHeight);
      };

      window.addEventListener("resize", adjustHeight);

      return () => {
        window.removeEventListener("resize", adjustHeight);
      };
    }
    return () => {};
  }, [headerRef.current]);

  useEffect(() => {
    if (headerHeight) {
      headerHeightCallBack(headerHeight);
    }
  }, [headerHeight]);

  useEffect(() => {
    if (router.query?.game == "30") {
      dispatch(setGameType("30"));
    } else {
      dispatch(setGameType("15"));
    }
  }, [router.query?.game]);

  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value);
    if (event.target.value === "15") {
      // router.push(`/`);
      const currentPath = router.asPath;
      const basePath = currentPath.split("?")[0];
      router.push(basePath);
    } else {
      router.push(`?game=${event.target.value}`);
    }
  };

  const isXsScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  const { scrollPosition } = useDetectScroll();
  async function onOpen() {
    await open();
  }

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleModalClose = (action: "connect" | "ignore") => {
    // if (action !== "ignore") {
    //   if (isMobile()) {
    //     if (selectedDeepLink) {
    //       window.location.href = selectedDeepLink;
    //       // connect({ connector: selectedConnector });
    //     }
    //   } else if (selectedConnector) {
    //     connect({ connector: selectedConnector });
    //   }
    // }
    // if (selectedConnector && action === "connect") {
    //   connect({ connector: selectedConnector });
    // }
    setOpenModal(false);
    // setSelectedConnector(undefined);
    // setSelectedDeepLink(undefined);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const web3Auth = useWeb3Auth();
  // console.log("web3Auth", web3Auth);

  const LoggedOut = async () => {
    disconnectWallet();
    dispatch(logout());
    handleClose();
    if (web3Auth) {
      web3Auth?.logout({ cleanup: true });
    }
    router.push("/");
  };
  const openTopUpModal = () => {
    eventEmitter.emit(events.openTopUpModal);
  };
  useEventEmitter(events.openSignUpModal, handleModalOpen);

  // const handleLogin = () => {
  //   handleLoginModalOpen();
  // };
  // const { data: walletClient } = useWalletClient();
  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     try {
  //       var userInfo = await web3Auth?.getUserInfo();
  //     } catch (e) {
  //       console.log("Cannot get userInfo.");
  //     }
  //     console.log("/app, userInfo", userInfo);
  //   };
  //   getUserInfo();
  // }, [walletClient]);

  // const getPrivateKey = async () => {
  //   try {
  //     if (web3Auth?.provider) {
  //       const privateKey = await web3Auth?.provider.request({
  //         method: "eth_private_key"
  //       });
  //     }
  //   } catch (e) {
  //     console.log("Cannot get privateKey.");
  //   }
  // };

  const [openAffConfirmModal, setOpenAffConfirmModal] =
    useState<boolean>(false);
  useEffect(() => {
    if (router.query?.r && !walletSelector?.wallet) {
      setOpenAffConfirmModal(true);
    }
  }, [router.query, walletSelector?.wallet]);

  const handleCancelAffliateInit = () => {
    setOpenAffConfirmModal(false);
    router.push("/");
  };

  const handleAffliateInit = () => {
    if (router.query?.r) {
      dispatch(setTempAffiliateLink(router.query?.r as string));
      setOpenModal(true);
    }
    setOpenAffConfirmModal(false);
  };

  const getUserActivity = (e: { [key: string]: number }) => {
    dispatch(setUserTicketProgress(e));
  };

  useEffect(() => {
    if (GlobalSocket.connected && walletSelector?.wallet) {
      GlobalSocket.on(
        SocketEvents.socketRoom.userTicketTrackingRoom(walletSelector.wallet),
        getUserActivity
      );
    }
    return () => {
      GlobalSocket.off(
        SocketEvents.socketRoom.userTicketTrackingRoom(walletSelector.wallet),
        getUserActivity
      );
    };
  }, [GlobalSocket.connected, walletSelector?.wallet]);

  return (
    <DashboardHeaderStyled
      className={scrollPosition?.top > 10 ? "bg-color" : ""}
      panelOpen={panelOpen}
      ref={headerRef}
      {...props}
    >
      {/* <Button
        onClick={() => {
          getPrivateKey();
        }}
      >
        {" "}
        Check
      </Button> */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="dashboardwrprRow"
      >
        <Box className="menuIcon" sx={{ display: { xs: "block", lg: "none" } }}>
          <Button type="button" onClick={togglePanel}>
            <DashBoardMenuIcon />
          </Button>
        </Box>
        <Box className="header_title">
          <Link href="/" className="logoicon">
            <LogoMain />
          </Link>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          className="header_options"
          ref={avatarBlockRef}
        >
          <Box className="currencySelect">
            <Chip
              label={currency === "15" ? "NEW" : currency === "30" ? "VIP" : ""}
              className={`${
                currency === "30" ? "new_chip premium_chip" : "new_chip"
              }`}
            />
            <Select
              value={currency}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              MenuProps={{
                PaperProps: {
                  className: "custom_bitcoin_select"
                }
              }}
            >
              {/* <MenuItem value="" sx={{ display: "none !important" }}>
                Bitcoin 15
              </MenuItem> */}
              <MenuItem value="15">
                <Box className="bitcoin_block">
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    className="bitcoin_block_stack_head"
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      className="bitcoin_block_stack_head_left"
                    >
                      <BitCoinIcon IconColor={primaryColors.color4F80FF} />

                      <Typography> Bitcoin 15</Typography>
                    </Stack>
                    <Chip label="new" className="select_chip" />
                  </Stack>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box className="bitcoin_block_each_info">
                        <Typography variant="h6">Min trade</Typography>
                        <Typography>$ 5</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box className="bitcoin_block_each_info">
                        <Typography variant="h6">Time</Typography>
                        <Typography>
                          <i>
                            <TimerIcon />
                          </i>
                          15 sec
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box className="bitcoin_block_each_info">
                        <Typography variant="h6">Max trade</Typography>
                        <Typography>$ 200</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </MenuItem>
              <MenuItem value="30">
                <Box className="bitcoin_block premium">
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    className="bitcoin_block_stack_head"
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      className="bitcoin_block_stack_head_left"
                    >
                      <BitCoinIcon IconColor={primaryColors.colorF79E34} />
                      <Typography> Bitcoin 30</Typography>
                    </Stack>
                    <Chip label="VIP" className="select_chip" />
                  </Stack>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box className="bitcoin_block_each_info">
                        <Typography variant="h6">Min trade</Typography>
                        <Typography>$ 25</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box className="bitcoin_block_each_info">
                        <Typography variant="h6">Time</Typography>
                        <Typography>
                          <i>
                            <TimerIcon />
                          </i>
                          30 sec
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box className="bitcoin_block_each_info">
                        <Typography variant="h6">Max trade</Typography>
                        <Typography>$ 500</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </MenuItem>
            </Select>
          </Box>

          <Box className="allListHeaderList">
            {walletSelector.wallet ? (
              <>
                <UserStreakBadge />

                <Box
                  className="depositWithdraw"
                  sx={{
                    border: showWin
                      ? "1.5px solid #f0c21d"
                      : "1.5px solid rgba(103, 120, 177, 0.24)"
                  }}
                >
                  {showWin && (
                    <Lottie
                      loop
                      autoPlay
                      animationData={CoinShower}
                      rendererSettings={{
                        preserveAspectRatio: "xMidYMid slice"
                      }}
                      height={250}
                      width={250}
                      className="bgvideo"
                    />
                  )}

                  <Button
                    className="walletIcon"
                    disableRipple
                    // onClick={() => onOpen()}
                  >
                    <WalletIconHeader />
                  </Button>
                  <Box className="currency_info">
                    <Typography variant="body1">
                      {/* <BetIconGreen IconColor="#ECF3FF" /> */}${" "}
                      {walletSelector?.usdBalance?.toFixed(2)}
                    </Typography>
                    <IconButton onClick={openTopUpModal}>
                      <AddIcon />
                      {/* {isXsScreen ? <AddIconGradient /> : <AddIcon />} */}
                    </IconButton>
                  </Box>
                </Box>
              </>
            ) : (
              // <Button className="conn_wallet" onClick={() => onOpen()}>
              <>
                {isXsScreen ? (
                  <CustomButtonPrimary
                    variant="contained"
                    color="primary"
                    onClick={() => handleModalOpen()}
                    // onClick={() => onOpen()}
                    startIcon={<WalletIconHeader />}
                    className="conn_wallet"
                  />
                ) : (
                  <CustomButtonPrimary
                    variant="contained"
                    color="primary"
                    onClick={() => handleModalOpen()}
                    // onClick={() => onOpen()}
                    startIcon={<WalletIconHeader />}
                    className="conn_wallet"
                  >
                    Connect Wallet
                  </CustomButtonPrimary>
                )}
              </>
            )}

            <Box className="avatar_block mblNone">
              {isLoggedIn ? (
                <>
                  <Button
                    id="basic-button"
                    aria-controls={openAvatar ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openAvatar ? "true" : undefined}
                    onClick={handleClick}
                    className="avatar_btn"
                    disableRipple
                  >
                    {/* <Avatar
                      sx={{ height: "48px", width: "48px" }}
                      src={
                        userData?.profile_image
                          ? userData.profile_image
                          : assest.profileImgHeader
                      }
                      alt={userData?.full_name?.toLocaleUpperCase()}
                    /> */}
                    <Image
                      src={
                        userData?.profile_image
                          ? userData.profile_image
                          : assest.profileImgHeader
                      }
                      alt="avatar"
                      width={48}
                      height={48}
                    />
                  </Button>
                  <AvatarMenu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openAvatar}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button"
                    }}
                    avatarMenuWidth={avatarMenuWidth}
                    className="profilemenuHeader"
                  >
                    <MenuItem onClick={() => router.push("/profile")}>
                      Profile
                    </MenuItem>
                    {/* <MenuItem onClick={handleClose}>Update Account</MenuItem> */}
                    <MenuItem
                      onClick={() => {
                        LoggedOut();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </AvatarMenu>
                </>
              ) : (
                <Button onClick={() => {}} className="avatar_btn" disableRipple>
                  <Avatar src="/broken-image.jpg" />
                </Button>
              )}
            </Box>
            {!isXsScreen ? (
              <Button
                id="basic-button"
                aria-controls={openAvatar ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openAvatar ? "true" : undefined}
                onClick={() => dispatch(toggleMute())}
                className="avatar_btn"
                disableRipple
                style={{ marginRight: "1rem" }}
              >
                <Image
                  src={isMute ? assest.soundoff : assest.soundon}
                  alt="AvatarImage"
                  width={48}
                  height={48}
                />
              </Button>
            ) : null}

            <Button className="countryIcon mblNone" disableRipple>
              {/* <Image
                src={assest.flagIconhdr}
                alt="Flag"
                width={28}
                height={28}
              /> */}
              <Image src={getFlag("GB")} alt="Flag" width={28} height={28} />
            </Button>
          </Box>
        </Stack>
      </Stack>
      {/* <Box sx={{ display: { lg: "none", xs: "block" } }}>
        <Box className="depositWithdraw mblVrsn">
          <Box className="btnwrapSepWdt">
            <Button type="button" className="depsitBtn">
              Deposit
            </Button>
            <Button type="button" className="widthDrawBtn">
              Withdraw
            </Button>
          </Box>
        </Box>
      </Box> */}
      {/* <CustomButtonPrimary
        onClick={() => {
          const web3Auth = connectors?.find((s) => s.id === "web3auth");
          connect({ connector: web3Auth as any });
        }}
      >
        {" "}
        check
      </CustomButtonPrimary>
      <CustomButtonPrimary
        onClick={async () => {
          // LoggedOut();
          await web3AuthInstance.logout();
          // setProvider(null);
          // setLoggedIn(false);
          // uiConsole("logged out");
        }}
      >
        {" "}
        disconnect
      </CustomButtonPrimary> */}

      <SignUpWalletModal
        open={openModal}
        handleModalClose={handleModalClose}
        // connectors={connectors}
        // handleSelect={setSelectedConnector}
        // handleSelectDeepLink={setSelectedDeepLink}
      />
      <AffiliateSignupModal
        openModal={openAffConfirmModal}
        cancelAffilateInit={handleCancelAffliateInit}
        initAffiliate={handleAffliateInit}
      />
    </DashboardHeaderStyled>
  );
};

export default memo(DashboardHeader);
