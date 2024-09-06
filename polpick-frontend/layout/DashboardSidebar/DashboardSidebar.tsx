/* eslint-disable react/jsx-no-undef */

"use client";

import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
/* eslint-disable mui-path-imports/mui-path-imports */

import { ToggleSidebarContext } from "@/hooks/utils/useSideToggleContext";
import assest from "@/json/assest";
import events from "@/json/events/events";
import { setAffilateTabValue } from "@/reduxtoolkit/slices/affiliate.slice";
import { DashboardSidebarWrapper } from "@/styles/StyledComponents/DashboardSidebarWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CloseIcon from "@/ui/Icons/CloseIcon";
import DashBoardMenuIcon from "@/ui/Icons/DashBoardMenuIcon";
import DashBoardMenuIconFour from "@/ui/Icons/DashBoardMenuIconFour";
import DashBoardMenuIconOne from "@/ui/Icons/DashBoardMenuIconOne";
import DashBoardMenuIconTwo from "@/ui/Icons/DashBoardMenuIconTwo";
import DiscordSocialIcon from "@/ui/Icons/DiscordSocialIcon";
import GameControllerIcon from "@/ui/Icons/GameControllerIcon";
import LogoMain from "@/ui/Icons/LogoMain";
import PrivacyIcon from "@/ui/Icons/PrivacyIcon";
import TelegramIconSocial from "@/ui/Icons/TelegramIconSocial";
import TwitterIconSocial from "@/ui/Icons/TwitterIconSocial";
import WalletIconHeader from "@/ui/Icons/WalletIconHeader";
import WrittenIcon from "@/ui/Icons/WrittenIcon";
import {
  Box,
  BoxProps,
  Button,
  List,
  ListItem,
  Typography
} from "@mui/material";
import * as ActiveGameButton from "json/lottie/active_game_button.json";
import * as ButtonIdleToClick from "json/lottie/button_idle_to_click.json";
import Lottie from "lottie-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import eventEmitter from "services/event.emitter";
import { toast } from "sonner";

// const commonpath = "/service-provider";

interface sidebarProps extends BoxProps {}

const DashboardSidebar: React.FC<sidebarProps & BoxProps> = ({ ...props }) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const LogoutRef = useRef<HTMLDivElement>(null);
  const userSelector = useAppSelector((s) => s.userSlice);
  const { tab_id } = useAppSelector((s) => s.affiliateSlice);
  const [getLogoSecHeight, setGetLogoSecHeight] = useState<number>(0);
  const [getLogoutSecheight, setGetLogoutSecheight] = useState<number>(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (logoRef.current && LogoutRef.current) {
      setGetLogoSecHeight(logoRef.current.clientHeight);
      setGetLogoutSecheight(LogoutRef.current.clientHeight);
    }
  }, [logoRef.current, logoRef.current]);

  const router = useRouter();

  const { panelOpen, togglePanel } = useContext(ToggleSidebarContext);

  const footerMobileMenu = [
    // {
    //   name: "Affiliates",
    //   route: "#url",
    //   image: <GlobalIcon />
    // },
    // {
    //   name: "Become a Partner",
    //   route: "#url",
    //   image: <KingRingIcon />
    // },
    {
      name: "Privacy",
      route: "#url",
      image: <PrivacyIcon />
    },
    {
      name: "Contact Us",
      route: "#url",
      image: <WrittenIcon />
    }
  ];
  const socialLinkIcon = [
    {
      iconpath: <TwitterIconSocial />,
      pathName: "#"
    },
    {
      iconpath: <TelegramIconSocial />,
      pathName: "#"
    },
    {
      iconpath: <DiscordSocialIcon />,
      pathName: "#"
    }
  ];

  const redirectToPage = (route: string, subMenuName: string) => {
    // if (subMenuName === "Link Manager") {
    //   if (userSelector.userData?.isAffiliateManager) {
    //     router.push("/referral-program-link-manager");
    //     return;
    //   } else {
    //     router.push(route);
    //     return;
    //   }
    // }

    if (tab_id >= 0) {
      if (subMenuName === "Link Manager") {
        // if (userSelector.userData?.isAffiliateManager) {
        dispatch(setAffilateTabValue(2));
        router.push(route);
        return;
        // }
      } else if (subMenuName === "Dashboard") {
        dispatch(setAffilateTabValue(0));
        router.push(route);
        return;
      } else if (subMenuName === "FAQ") {
        dispatch(setAffilateTabValue(1));
        router.push(route);
        return;
      } else if (subMenuName === "Program Tutorial") {
        if (userSelector.userData?.isAffiliateManager) {
          toast.info("You are already regsitered to affilate program!");
          return;
        } else {
          router.push(route);
          return;
        }
      } else {
        router.push(route);
        return;
      }
    }

    // else {
    //   router.push(route);
    // }
  };

  const [lottieLoad, setLottieLoad] = useState(false);

  const navItems = [
    {
      route: `/`,
      // icon: <GameControllerIcon />,
      icon:
        router.pathname === "/" ? (
          <Lottie
            loop
            autoPlay
            className="btnlottie down"
            animationData={ActiveGameButton}
            // ref={lottieRef}
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice"
            }}
            height={48}
            width={48}
          />
        ) : (
          <>
            {!lottieLoad ? (
              <GameControllerIcon />
            ) : (
              <Lottie
                loop={false}
                autoPlay
                className="btnlottie down"
                animationData={ButtonIdleToClick}
                // ref={lottieRef}
                rendererSettings={{
                  preserveAspectRatio: "xMidYMid slice"
                }}
                height={48}
                width={48}
                // onTransitionEnd={() => console.log("end")}
                // onEnded={setOnEndLottie(true) as any}
              />
            )}
          </>
        ),
      name: "Play Game"
    },
    {
      route: "/leaderboard",
      icon: <DashBoardMenuIconOne />,
      name: "Leaderboard"
      // subMenu: [
      //   {
      //     subMenuName: "Top 10 High Rollers",
      //     route: "/leaderboard"
      //   },
      //   {
      //     subMenuName: "Top 10 Win Ratio",
      //     route: "/leaderboard"
      //   }
      // ]
    },
    {
      route: `/weekly-jackpot`,
      icon: <DashBoardMenuIconTwo />,
      name: "Jackpot",
      subMenu: [
        {
          subMenuName: "Weekly Jackpot",
          route: "/weekly-jackpot"
        },
        {
          subMenuName: "History",
          route: "/weekly-history"
        }
      ]
    },
    // {
    //   route: `/`,
    //   icon: <DashBoardMenuIconThree />,
    //   name: "My Activity"
    // },

    {
      route: "/dashboard",
      icon: <DashBoardMenuIconFour />,
      name: "Referral Program",
      subMenu: [
        {
          subMenuName: "Link Manager",
          route: "/dashboard?section=LinkManager"
        },
        {
          subMenuName: "FAQ",
          route: "/dashboard?section=FAQ"
        },
        {
          subMenuName: "Dashboard",
          route: "/dashboard"
        },
        // {
        //   subMenuName: "Leaderboard",
        //   route: "/winning"
        // },
        {
          subMenuName: "Program Tutorial",
          route: "/affiliate-program"
        }
      ]
    }
  ];

  return (
    <DashboardSidebarWrapper
      logoutSecHeight={getLogoutSecheight}
      listHeight={getLogoSecHeight}
      panelOpen={panelOpen}
      {...props}
    >
      <Box className={panelOpen ? "menuIcon open" : "menuIcon"} ref={logoRef}>
        <Button type="button" onClick={togglePanel}>
          {panelOpen ? <CloseIcon /> : <DashBoardMenuIcon />}
        </Button>
        <Box
          className="logoMenuOpen"
          sx={{ display: { xs: "block", lg: "none" } }}
        >
          <LogoMain />
        </Box>
      </Box>

      <Box className="all_WrapMenu">
        <Box
          className="layerMobile"
          sx={{ display: { xs: "block", lg: "none" } }}
        >
          <img src={assest?.layerMobilesec} alt="no image" />
        </Box>
        <Box
          className="clientInfosec"
          sx={{ display: { xs: "block", lg: "none" } }}
        >
          <Box className="clientDtlsLft">
            {userSelector?.userData?.profile_image ? (
              <figure className="main_img">
                <img
                  src={userSelector?.userData?.profile_image}
                  alt="no image"
                />
              </figure>
            ) : (
              <CustomButtonPrimary
                variant="contained"
                color="primary"
                onClick={() => {
                  eventEmitter.emit(events.openSignUpModal);
                }}
                // onClick={() => onOpen()}
                startIcon={<WalletIconHeader />}
                className="conn_wallet"
              >
                Connect Wallet
              </CustomButtonPrimary>
            )}
            <Box className="clientDlfIn">
              {userSelector?.userData?.username}
            </Box>
          </Box>

          <Box className="clientDtlsRtt">
            <Button className="flag_fig">
              <img src={assest.flagIconhdr} alt="no image" />
            </Button>
          </Box>
        </Box>
        <List
          disablePadding
          className={`${
            panelOpen ? "sidebar_menu panel_open" : "sidebar_menu"
          }`}
        >
          {navItems?.map((data, index) => (
            <React.Fragment key={index}>
              {data?.subMenu ? (
                <ListItem disablePadding key={`${index}${data?.name}`}>
                  <Typography
                    onClick={() => {
                      router.push(data?.route);
                      setTimeout(() => {
                        if (panelOpen) {
                          togglePanel();
                        }
                      }, 150);
                    }}
                    className={router.pathname === data?.route ? "active" : ""}
                  >
                    <i>{data?.icon}</i>
                    <Typography variant="caption"> {data?.name}</Typography>
                  </Typography>
                  <List disablePadding className="sub_list">
                    {data?.subMenu?.map((item, index) => (
                      <ListItem
                        disablePadding
                        key={`${index}${item?.subMenuName}`}
                      >
                        <Button
                          onClick={() => {
                            if (data.name === "Referral Program") {
                              redirectToPage(item?.route, item?.subMenuName);
                              setTimeout(() => {
                                if (panelOpen) {
                                  togglePanel();
                                }
                              }, 150);
                            } else {
                              router.push(data?.route);
                              setTimeout(() => {
                                if (panelOpen) {
                                  togglePanel();
                                }
                              }, 150);
                            }
                          }}
                          // href={item?.route}
                          className={
                            router.pathname === item?.route ? "active" : ""
                          }
                          disableRipple
                        >
                          {item?.subMenuName}
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </ListItem>
              ) : (
                <ListItem disablePadding key={index}>
                  <Button
                    onClick={() => {
                      if (data?.name === "Play Game") {
                        setLottieLoad(true);
                        setTimeout(() => {
                          router.push(data?.route);
                        }, 650);
                      }
                      // else if(data?.name==='')
                      else {
                        router.push(data?.route);
                      }
                      setTimeout(() => {
                        if (panelOpen) {
                          togglePanel();
                        }
                      }, 150);
                    }}
                    className={
                      router.pathname === data?.route
                        ? data?.name === "Play Game"
                          ? "fill_icon active"
                          : "active"
                        : data?.name === "Play Game"
                        ? !lottieLoad
                          ? "fill_icon lottie_disable"
                          : "fill_icon"
                        : ""
                    }
                    startIcon={data?.icon}
                    disableRipple
                  >
                    <Typography variant="caption" className="list_link_txt">
                      {data?.name}
                    </Typography>
                  </Button>
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>

        <Box
          className="becmPartnerBtm"
          sx={{ display: { xs: "block", lg: "none" } }}
        >
          <List>
            {footerMobileMenu.map((item, index) => (
              <ListItem key={`${index}${item?.name}`}>
                <Link href={item?.route}>
                  <i className="iconsc">{item?.image}</i>
                  {item?.name}
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
          className="coprytFoot"
          sx={{ display: { xs: "block", lg: "none" } }}
        >
          <Box className="coprytFoot_lft">
            <Typography variant="body1">Copyright 2024</Typography>
          </Box>

          <Box className="coprytFoot_rtt">
            <Box className="socialIcon">
              <List disablePadding>
                {socialLinkIcon.map((item, index) => (
                  <ListItem disablePadding key={`${index}${item.iconpath}`}>
                    <Link href={item.pathName}>{item.iconpath}</Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Box>
      </Box>
    </DashboardSidebarWrapper>
  );
};

export default DashboardSidebar;
