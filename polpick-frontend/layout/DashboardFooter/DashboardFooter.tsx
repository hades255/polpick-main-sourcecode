/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { ToggleSidebarContext } from "@/hooks/utils/useSideToggleContext";
import { setAffilateTabValue } from "@/reduxtoolkit/slices/affiliate.slice";
import { DashboardFooterWrapper } from "@/styles/StyledComponents/DashboardFooterWrapper";
import DiscordSocialIcon from "@/ui/Icons/DiscordSocialIcon";
import TelegramIconSocial from "@/ui/Icons/TelegramIconSocial";
import TwitterIconSocial from "@/ui/Icons/TwitterIconSocial";
import { Box, List, ListItem, StackProps, Typography } from "@mui/material";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";

interface DashboradFooterPoprs {
  footerHeightCallBack: any;
}

const DashboardFooter: React.FC<DashboradFooterPoprs & StackProps> = ({
  footerHeightCallBack,
  ...props
}) => {
  const dispatch = useAppDispatch();
  const [getFooterHeight, setGetFooterHeight] = useState<number>(0);

  const footerRef = useRef<HTMLDivElement>(null);

  const { panelOpen } = useContext(ToggleSidebarContext);

  useEffect(() => {
    if (footerRef.current) {
      setGetFooterHeight(footerRef.current.clientHeight);
    }
  }, [footerRef.current]);

  useEffect(() => {
    if (getFooterHeight) {
      footerHeightCallBack(getFooterHeight);
    }
  }, [getFooterHeight]);

  const footerLinkList = [
    {
      linkText: "Affiliates",
      pathName: "/dashboard?section=LinkManager",
      tabValue: 2
    },
    {
      linkText: "Become a Partner",
      pathName: "/affiliate-program",
      tabValue: -1
    },
    {
      linkText: "FAQ",
      pathName: "/dashboard",
      tabValue: 1
    },
    {
      linkText: "Privacy",
      pathName: "#"
    },
    {
      linkText: "Contact Us",
      pathName: "#"
    }
  ];

  const socialLinkIcon = [
    {
      iconpath: <TwitterIconSocial />,
      pathName: "#"
    },
    {
      iconpath: <TelegramIconSocial />,
      pathName: "https://t.me/polpickofficial"
    },
    {
      iconpath: <DiscordSocialIcon />,
      pathName: "#"
    }
  ];

  return (
    <DashboardFooterWrapper panelOpen={panelOpen} ref={footerRef} {...props}>
      <Box className="ftr_left">
        <Typography>Copyright 2024</Typography>
      </Box>
      <Box className="menulist_social">
        <List disablePadding className="listFooter">
          {footerLinkList.map((item, index) => (
            <ListItem
              disablePadding
              key={index}
              onClick={() => {
                if (item?.tabValue && item?.tabValue !== -1) {
                  dispatch(setAffilateTabValue(item.tabValue));
                }
              }}
            >
              <Link href={item.pathName}>{item.linkText}</Link>
            </ListItem>
          ))}
        </List>
        <Box className="socialIcon">
          <List disablePadding>
            {socialLinkIcon.map((item, index) => (
              <ListItem disablePadding key={index}>
                <Link href={item.pathName} target="_blank">
                  {item.iconpath}
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </DashboardFooterWrapper>
  );
};

export default DashboardFooter;
