/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import assest from "@/json/assest";
import { ProfileSecWrapper } from "@/styles/StyledComponents/ProfileSecWrapper";
import CameraIcon from "@/ui/Icons/CameraIcon";
import EditIcon from "@/ui/Icons/EditIcon";
import LogoutIcon from "@/ui/Icons/LogoutIcon";
import { Box, BoxProps, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";

import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import {
  queryClient,
  useWeb3Auth,
  walletConfig
} from "@/layout/WalletWrapper/WalletWrapper";
import { addElipsisBetweenLength } from "@/lib/functions/_helpers.lib";
import { logout } from "@/reduxtoolkit/slices/userSlice";
import CopyIcon from "@/ui/Icons/CopyIcon";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useRouter } from "next/router";
import { toast } from "sonner";

import {
  getOrderHistoryByWallet,
  iUserTransaction,
  updateUserDetails
} from "@/api/functions/user.api";
import WalletIconHeader from "@/ui/Icons/WalletIconHeader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDisconnect, useWalletClient } from "wagmi";
import EmailOTPModal from "../EmailOTPModal/EmailOTPModal";
import JackpotTitle from "../JackpotTitle/JackpotTitle";
import PaymentModal from "../PaymentModal/PaymentModal";
import ProfileTable from "../ProfileTable/ProfileTable";

interface ProfileProps {}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

const ProfileSec: React.FC<ProfileProps & BoxProps> = ({ ...props }) => {
  const { open } = useWeb3Modal();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { disconnect: disconnectWallet } = useDisconnect({
    config: walletConfig
  });
  const userSelector = useAppSelector((state) => state.userSlice.userData);
  const walletSelector = useAppSelector((state) => state.walletSlice);
  const copyWalletAddress = () => {
    navigator.clipboard.writeText(walletSelector.wallet);
    toast.success("Link Copied!");
  };
  const profileImgRef = useRef<HTMLInputElement | null>(null);
  const [curimg, setCurimg] = React.useState<File>();

  const { mutate: mutateUserInfo } = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["fetchUserInfo"] });
      // fetchUpdatedUserInfo({
      //   walletId: walletSelector.wallet
      // });
    }
  });
  const onButtonClick = () => {
    const temp = profileImgRef.current?.files
      ? profileImgRef.current?.files[0]
      : undefined;
    // const jpeg = "image/jpeg";
    // const png = "image/png";
    // const jpg = "image/jpg";
    // console.log("temp", temp);
    setCurimg(temp);

    if (profileImgRef.current?.files?.length) {
      const formData = new FormData();
      formData.append("userpic", profileImgRef.current?.files[0]);
      formData.append("walletId", walletSelector.wallet);
      formData.append("country", "GB");

      // console.log("formData", formData);

      mutateUserInfo(formData);
    }
  };

  const previewUrl = useMemo(() => {
    if (!curimg) {
      return null;
    }
    return URL.createObjectURL(curimg);
  }, [curimg]);

  async function onOpen() {
    await open();
  }

  const userLogOut = () => {
    disconnectWallet();
    dispatch(logout());
  };

  const [globalOpenModal, setGlobalOpenModal] = useState<boolean>(false);

  const [modalTabOpenValue, setModalTabOpenvalue] = useState<number>(0);

  const globalModalClose = () => {
    setGlobalOpenModal(false);
  };
  const globalModalOpen = (data: number) => {
    setTimeout(() => {
      setModalTabOpenvalue(data);
      setGlobalOpenModal(true);
    }, 500);
  };

  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] =
    useState<keyof iUserTransaction>("profitAmount");

  const sortTable = (data: keyof iUserTransaction) => {
    setOrder(orderBy === data && order === "asc" ? "desc" : "asc");
    setOrderBy(data);
  };

  const { data: OrderList } = useQuery({
    queryKey: ["getOrderHistoryByWallet", order, orderBy],
    enabled: !!walletSelector.wallet,
    queryFn: () =>
      getOrderHistoryByWallet({
        page: 1,
        limit: 10,
        sort: {
          order,
          field: orderBy
        },
        walletId: walletSelector.wallet
      })
  });
  const [openKeyModal, setOpenKeyModal] = useState(false);
  const toggleOTPModal = () => {
    setOpenKeyModal(!openKeyModal);
  };
  const web3Auth = useWeb3Auth();
  const { data: walletClient } = useWalletClient();
  const [isWeb3AuthUser, setIsWeb3AuthUser] = useState<boolean>(false);

  // const {
  //   mutate: fetchUpdatedUserInfo
  //   // isPending: isCreatingUser,
  //   // data: UserData,
  // } = useMutation({
  //   mutationFn: createWalletUser
  // });

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = await web3Auth?.getUserInfo();
        if (userInfo?.verifier === "web3auth") {
          setIsWeb3AuthUser(true);
        }
      } catch (e) {
        console.error("Cannot get userInfo.");
      }
      // console.log("/app, userInfo", userInfo);
    };
    getUserInfo();
  }, [walletClient]);

  return (
    <ProfileSecWrapper {...props}>
      <Grid container spacing={5}>
        <Grid item lg={6} xs={12}>
          <Box className="lft_box">
            <Box className="profile_img">
              <figure>
                <Image
                  src={
                    previewUrl ||
                    (userSelector?.profile_image
                      ? userSelector?.profile_image
                      : assest.profileImgHeader)
                    // assest.profileImgHeader
                  }
                  alt="avatar_image"
                  width={193}
                  height={193}
                />
                <input
                  className="form-control"
                  placeholder="profileImage"
                  style={{ display: "none" }}
                  type="file"
                  ref={profileImgRef}
                  onChange={onButtonClick}
                  accept="image/*"
                />
                <Button
                  className="camera_icon"
                  onClick={() => {
                    profileImgRef.current && profileImgRef.current.click();
                  }}
                >
                  <CameraIcon />
                </Button>
              </figure>
              <Typography variant="body1">
                {/* Alex <br /> Mitch132 */}
                {userSelector?.username}
              </Typography>
            </Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              className="title"
            >
              {/* href="/profile" */}
              <Button onClick={userLogOut}>
                <i>
                  <LogoutIcon />
                </i>
              </Button>
            </Stack>

            <Box className="profile_content">
              <Box className="mdl_sec">
                <Box className="each_details">
                  <Typography variant="h6" color="initial">
                    Country
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    flexWrap="wrap"
                    className="details"
                  >
                    <i className="flag_icon">
                      <Image
                        src={assest?.flag_icon_profile}
                        alt="flag icon"
                        width={120}
                        height={120}
                      />
                    </i>

                    <Typography>England</Typography>
                    <Button className="edit_icon">
                      <EditIcon />
                    </Button>
                  </Stack>
                </Box>

                <Box className="each_details">
                  <Typography variant="h6">Balance</Typography>
                  <Box className="each_inr">
                    <Typography variant="h4" className="blue_span">
                      {/* <i>
                        <CryptoIconStyle2 />
                      </i> */}
                      $ {walletSelector.usdBalance?.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                <Box className="each_details">
                  <Typography variant="h6">PnL</Typography>
                  <Box className="each_inr">
                    <Typography variant="h4" className="grn_span">
                      {/* <i>
                        <DollarIcon />
                      </i> */}
                      {/* 125.55 */} $ {userSelector?.pnlPercentage.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="btm_sec">
                <Link href="/profile">
                  <i>
                    <LogoutIcon />
                  </i>
                  Log Out
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Box className="lft_box">
            <Box className="each_info">
              <Box className="info_lft">
                <Typography variant="body1" color="initial">
                  My Balance
                </Typography>
                <Typography variant="h4" color="initial">
                  {/* 0.0 */}
                  {walletSelector?.walletBalance.toFixed(6)}
                </Typography>
              </Box>
              <Box className="outline_btn">
                <CustomButtonPrimary
                  fullWidth
                  variant="outlined"
                  color="primary"
                  // startIcon={<WhiteBitCoinIcon />}
                >
                  <Typography variant="caption">$</Typography>
                  Transfer
                </CustomButtonPrimary>
              </Box>
            </Box>
            <Box className="each_info">
              <Box className="info_lft">
                <Typography variant="body1" color="initial">
                  My Wallet Address
                </Typography>
                <Typography variant="h4" color="initial">
                  {addElipsisBetweenLength(walletSelector?.wallet, 8, 3)}
                </Typography>
              </Box>
              {isWeb3AuthUser ? (
                <Box className="outline_btn_grp">
                  <CustomButtonPrimary
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={copyWalletAddress}
                  >
                    <CopyIcon />
                  </CustomButtonPrimary>

                  <CustomButtonPrimary
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      toggleOTPModal();
                    }}
                  >
                    <WalletIconHeader />
                  </CustomButtonPrimary>
                </Box>
              ) : (
                <Box className="outline_btn">
                  <CustomButtonPrimary
                    fullWidth
                    variant="outlined"
                    color="primary"
                    startIcon={<CopyIcon />}
                    onClick={copyWalletAddress}
                  >
                    Copy
                  </CustomButtonPrimary>
                </Box>
              )}
              {/* <Box className="outline_btn">
                <CustomButtonPrimary
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<CopyIcon />}
                  onClick={copyWalletAddress}
                >
                  Copy
                </CustomButtonPrimary>
              </Box> */}
            </Box>
            <Box className="btn_grp">
              <Grid container columnSpacing={4} rowSpacing={2.5}>
                <Grid item xs={12}>
                  <CustomButtonPrimary
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon="$"
                    onClick={() => {
                      globalModalOpen(0);
                    }}
                  >
                    Topup
                  </CustomButtonPrimary>
                </Grid>
                {/* <Grid item xs={12} md={6}>
                  <CustomButtonPrimary
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<WhiteWalletIcon />}
                    onClick={() => {
                      globalModalOpen(1);
                    }}
                  >
                    Topup with card
                  </CustomButtonPrimary>
                </Grid> */}
                <Grid item xs={12}>
                  <CustomButtonPrimary
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon="$"
                  >
                    Withdraw Balance
                  </CustomButtonPrimary>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box className="profile_table_sec">
        <JackpotTitle gridSplitNumber={3}>
          <Box className="each_item_otr red_color">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              className="each_item"
            >
              <Typography variant="h3" sx={{ maxWidth: "122px !important" }}>
                Highest win streak
              </Typography>
              <Box className="rgt_block">
                <Typography variant="h4">
                  {OrderList?.user_data?.highestWinStreak}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box className="each_item_otr green_color">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              className="each_item"
            >
              <Typography variant="h3" sx={{ maxWidth: "115px !important" }}>
                Total number of wins
              </Typography>
              <Box className="rgt_block">
                <Typography variant="h4">
                  {OrderList?.user_data?.totalNumberOfWins}
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box className="each_item_otr blue_color">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              className="each_item"
            >
              <Typography variant="h3" sx={{ maxWidth: "172px !important" }}>
                Highest winning from 1 bet
              </Typography>
              <Box className="rgt_block">
                <Typography variant="h4">
                  $ {OrderList?.user_data?.highestWinning?.toFixed(2)}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </JackpotTitle>
        <ProfileTable
          profileDataList={OrderList?.data || []}
          sortTable={sortTable}
        />
      </Box>

      <PaymentModal
        open={globalOpenModal}
        closeCallBack={globalModalClose}
        modalTabValue={modalTabOpenValue}
      />
      <EmailOTPModal openModal={openKeyModal} toggleOpen={toggleOTPModal} />
    </ProfileSecWrapper>
  );
};

export default ProfileSec;
