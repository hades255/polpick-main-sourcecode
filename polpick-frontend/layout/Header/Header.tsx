/* eslint-disable no-console */

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";

import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { logout } from "@/reduxtoolkit/slices/userSlice";

import assest from "@/json/assest";
import { CustomDrawer } from "@/styles/StyledComponents/CustomDrawer";
import { HeaderWrap } from "@/styles/StyledComponents/HeaderWrapper";
import { primaryColors } from "@/themes/_muiPalette";
import LogoMain from "@/ui/Icons/LogoMain";
import { Button } from "@mui/material";
import { Container } from "@mui/system";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// const CustomButton = dynamic(() => import("@/ui/Buttons/CustomButton"));

const drawerWidth = 240;

export default function Header() {
  const navItems = [
    {
      name: "About",
      route: "#url"
    },
    {
      name: "Become a Partner",
      route: "/affiliate"
    },
    {
      name: "How to Play",
      route: "#url"
    },
    {
      name: "Contact us",
      route: "#url"
    }
  ];

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { userData, isLoggedIn } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box className="logo_sec">
        <Link href="/home" className="headerLogo">
          <LogoMain />
        </Link>
      </Box>
      <Divider sx={{ backgroundColor: primaryColors?.textPrimaryColor }} />
      <List>
        {navItems.map((item) => (
          <ListItem disablePadding>
            <Link href={item?.route} key={item.name}>
              {item?.name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  //for adding class to header while scroll
  // const [scroll, setScroll] = React.useState(false);

  // const detectScroll = React.useCallback(() => {
  //   setScroll(window.scrollY > 100);
  // }, []);

  // React.useEffect(() => {
  //   window.addEventListener("scroll", detectScroll);
  //   return () => {
  //     window.removeEventListener("scroll", detectScroll);
  //   };
  // }, []);

  return (
    <HeaderWrap sx={{ display: "flex" }} className="main_head">
      <AppBar
        component="nav"
        position="static"
        elevation={0}
        className="headerContainer"
      >
        <Container fixed>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/home" className="headerLogo">
              <LogoMain />
            </Link>
            {isLoggedIn ? (
              <Box
                sx={{ display: { xs: "none", md: "block" } }}
                className="navbar"
              >
                {navItems.map((item) => (
                  <Link
                    href={item?.route}
                    key={item?.route}
                    className={router.pathname === item.route ? "active" : ""}
                  >
                    {/* <CustomButton type="button" variant="text"> */}
                    {item?.name}
                    {/* </CustomButton> */}
                  </Link>
                ))}
              </Box>
            ) : (
              <Box
                sx={{ display: { xs: "none", md: "block" } }}
                className="navbar"
              >
                {navItems.map((item) => (
                  <Link
                    href={item?.route}
                    key={item?.route}
                    className={router.pathname === item.route ? "active" : ""}
                  >
                    {/* <CustomButton type="button" variant="text"> */}
                    {item?.name}
                    {/* </CustomButton> */}
                  </Link>
                ))}
              </Box>
            )}
            <Box className="hdr_rgt">
              {/* <CustomButtonPrimary
                type="button"
                variant="contained"
                color="primary"
              >
                Get Started
              </CustomButtonPrimary> */}
              <Button className="countryIcon" disableRipple>
                <Image src={assest.flagIconhdr} alt="" width={28} height={28} />
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <CustomDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </CustomDrawer>
      </Box>
      <Toolbar />
    </HeaderWrap>
  );
}
