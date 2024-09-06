"use client";

/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-use-before-define */
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

import Stack, { StackProps } from "@mui/material/Stack";

import RightUserSec from "@/components/RightUserSec/RightUserSec";
import Seo from "@/components/Seo/Seo";
import { ToggleSidebarContext } from "@/hooks/utils/useSideToggleContext";
import assest from "@/json/assest";
import { primaryColors } from "@/themes/_muiPalette";

import PaymentModal from "@/components/PaymentModal/PaymentModal";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import useEventEmitter from "@/hooks/utils/useEventEmitter";
import events from "@/json/events/events";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useState } from "react";
import DashboardFooter from "../DashboardFooter/DashboardFooter";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";

const DashboardHeader = dynamic(
  () => import("../DashboardHeader/DashboardHeader"),
  { ssr: false }
);

interface dashBoardProps extends StackProps {
  headerTitle?: string;
  isChatShow?: boolean;
}

const DashboardWrapper: React.FC<dashBoardProps & StackProps> = ({
  headerTitle,
  isChatShow = true,

  ...props
}) => {
  const dispatch = useAppDispatch();
  const [getHeaderHeight, setGetHeaderHeight] = useState<number>(0);

  const headerHeightCallBack = useCallback((data: number) => {
    setGetHeaderHeight(data);
  }, []);

  const [getFooterHeight, setGetFooterHeight] = useState<number>(0);

  const footerHeightCallBack = useCallback((data: number) => {
    setGetFooterHeight(data);
  }, []);

  const { panelOpen } = useContext(ToggleSidebarContext);

  const router = useRouter();

  const routerText = router.pathname.split("");

  routerText.shift();
  const favText = routerText.join("").toString().toUpperCase();
  const projectName = "Polpick";

  const [openTopUpModal, setOpenTopUpModal] = useState<boolean>(false);

  const [modalTabOpenValue, setModalTabOpenvalue] = useState<number>(0);

  const closePaymentModal = () => {
    setOpenTopUpModal(false);
  };
  const openPaymentModal = () => {
    setTimeout(() => {
      setModalTabOpenvalue(1);
      setOpenTopUpModal(true);
    }, 500);
  };

  useEventEmitter(events.openTopUpModal, openPaymentModal);

  return (
    <DashboardWrapperStyled
      headerHeight={getHeaderHeight}
      footerheight={getFooterHeight}
      panelOpen={panelOpen}
      direction="row"
      flexWrap="wrap"
      {...props}
    >
      <Seo
        title={
          router.pathname === "/"
            ? `${projectName}`
            : `${projectName} || ${favText}`
        }
        canonical=""
        description=""
        url=""
        image=""
      />
      <DashboardSidebar
        className={panelOpen ? "wrapper_lft panelOpenPrnt" : "wrapper_lft"}
      />
      <Box
        className="wrapper_rgt"
        sx={{ pointerEvents: panelOpen ? { xs: "auto", lg: "none" } : "auto" }}
      >
        <DashboardHeader
          headerTitle={headerTitle}
          headerHeightCallBack={headerHeightCallBack}
        />
        <Box className="dashboard_body">
          <Box
            className="mobileLayers"
            sx={{ display: { xs: "block", lg: "none" } }}
          >
            <img src={assest?.innerpageboxs} alt="no image" />
          </Box>
          {isChatShow ? (
            <Stack
              direction="row"
              alignItems="flex-start"
              flexWrap="wrap"
              className="pagebody-grid"
            >
              <Box className="grid-left-col">{props?.children}</Box>
              <Box
                className="grid-right-col"
                sx={{ display: { xs: "none", lg: "block" } }}
              >
                <RightUserSec />
              </Box>
            </Stack>
          ) : (
            <Box>{props?.children}</Box>
          )}
        </Box>
        <DashboardFooter
          footerHeightCallBack={footerHeightCallBack}
          sx={{ display: { xs: "none", lg: "flex" } }}
        />
      </Box>
      <PaymentModal
        open={openTopUpModal}
        closeCallBack={closePaymentModal}
        modalTabValue={modalTabOpenValue}
      />
    </DashboardWrapperStyled>
  );
};

export default DashboardWrapper;

export const DashboardWrapperStyled = styled(Stack, {
  shouldForwardProp: (data) =>
    data !== "headerHeight" &&
    data !== "getFooterHeight" &&
    data !== "panelOpen"
})<{ headerHeight: number; footerheight: number; panelOpen: boolean }>`
  padding: 20px 20px 0;
  min-height: 100vh;
  background: linear-gradient(180deg, #55609c 0%, #353c65 100%);

  @media (max-width: 1199px) {
    padding: 0;
    display: block;
  }
  .wrapper_rgt {
    width: calc(100% - 100px);
    flex-basis: calc(100% - 100px);
    /* padding-left: 20px; */
    padding-top: ${({ headerHeight }) =>
      headerHeight ? `${headerHeight}px` : `87px`};
    padding-bottom: ${({ footerheight }) => `${footerheight}px`};
    margin-left: auto;
    background: url(${assest?.dashboard_body_bg}) no-repeat center;
    background-size: 100% 100%;
    border-radius: 32px 32px 0 0;
    overflow: hidden;
    /* transform: ${({ panelOpen }) =>
      panelOpen ? "translateX(200px)" : "translateX(0px)"}; */
    margin-right: ${({ panelOpen }) => (panelOpen ? "-200px" : "0px")};
    transition: all 0.5s ease;
    @media (min-width: 1921px) {
      margin-right: ${({ panelOpen }) => (panelOpen ? "-11vw" : "0px")};
    }
    @media (max-width: 1199px) {
      width: 100%;
      flex-basis: 100%;
      border-radius: 0;
      background: linear-gradient(145.86deg, #313963 4.73%, #171c31 79.8%);
      margin: 0;
      overflow: inherit;
      padding: 0;
      padding-top: ${({ headerHeight }) => `${headerHeight}px`};
    }
  }
  .dashboard_body {
    padding: 0px 30px 30px 50px;
    background: transparent;
    border-radius: 0;
    height: calc(
      100vh -
        (
          20px + ${({ headerHeight }) => `${headerHeight}px`} +
            ${({ footerheight }) => `${footerheight}px`}
        )
    );
    overflow-y: auto;
    overflow-x: hidden;
    /* scrollbar-width: thin;
    scrollbar-color: #6c769c transparent; */

    @media (max-width: 1599px) {
      padding: 0 25px 30px 25px;
    }
    @media (max-width: 1199px) {
      /* height: 100%;
      overflow: inherit; */
      /* padding: 18px 30px 50px 30px; */
      height: calc(
        100vh -
          (
            0px + ${({ headerHeight }) => `${headerHeight}px`} +
              ${({ footerheight }) => `${footerheight}px`}
          )
      );
      padding: 18px 30px 0px 30px;
      position: relative;
      z-index: 1;
    }
    @media (max-width: 599px) {
      /* padding: 18px 12px 30px 12px; */
      padding: 18px 12px 0px 12px;
    }
    @media (max-width: 379px) {
      /* padding: 18px 6px 30px 6px; */
      padding: 18px 6px 0px 6px;
    }
    .mobileLayers {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      img {
        width: 100%;
      }
    }
  }
  /* span {
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
  } */
  .common_box {
    padding: 16px 20px;
    border-radius: 10px;
    background-color: ${primaryColors?.white};
  }

  .pagebody-grid {
    margin: 0 -24px;
    @media (max-width: 1199px) {
      margin: 0;
    }
    .grid-left-col {
      flex-basis: calc(100% - 353px);
      max-width: calc(100% - 353px);
      padding: 0 24px;
      @media (min-width: 1921px) {
        flex-basis: calc(100% - 20vw);
        max-width: calc(100% - 20vw);
      }
      @media (max-width: 1199px) {
        flex-basis: 100%;
        max-width: 100%;
        padding: 0;
      }
    }

    .grid-right-col {
      padding: 0 24px;
      flex-basis: 353px;
      max-width: 353px;
      @media (min-width: 1921px) {
        flex-basis: 20vw;
        max-width: 20vw;
      }
    }
  }
  span {
    font-weight: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  .pool-card-sec {
  }

  .cmn_tab {
    .tab_hdr {
      padding-right: 22px;
      .MuiButtonBase-root {
        color: ${primaryColors.white};
        font-size: 13px;
        font-weight: 600;
        border-radius: 16px;
        min-height: auto;
        padding: 11px 10px;
        width: 50%;
        @media (min-width: 1921px) {
          font-size: 0.75vw;
          padding: 1vh 10px;
        }
        &.Mui-selected {
          background: radial-gradient(
            95.83% 95.83% at 16.67% 4.17%,
            #769bff 0%,
            #326aff 100%
          );

          border-radius: 16px;
        }
      }
      .MuiTabs-flexContainer {
        border: 1.5px solid rgba(103, 120, 177, 0.3);
        border-radius: 16px;
        background-color: rgba(40, 44, 70, 0.2);
        height: 100%;
      }
    }
    &.cmn_tab_page {
      .tab_hdr {
        max-width: 350px;
        margin-bottom: 35px;
      }
    }
    .MuiTabs-indicator {
      display: none;
    }
    .tab_content {
      height: 195px;
      overflow-y: auto;
      padding-right: 22px;
      @media (min-width: 1921px) {
        height: 20vh;
      }
      @media (max-width: 1699px) {
        height: 135px;
      }
    }
  }
`;
