/* eslint-disable react/no-array-index-key */
import { FooterWrap } from "@/styles/StyledComponents/FooterWrap";
import DiscordSocialIcon from "@/ui/Icons/DiscordSocialIcon";
import TelegramIconSocial from "@/ui/Icons/TelegramIconSocial";
import TwitterIconSocial from "@/ui/Icons/TwitterIconSocial";
import { List, ListItem, Stack, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import Link from "next/link";

const footerLinkList = [
  {
    linkText: "Disclaimer",
    pathName: "#"
  },
  {
    linkText: "Privacy",
    pathName: "#"
  },
  {
    linkText: "Become a Partner",
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

const Footer = () => {
  // const router = useRouter();
  return (
    <FooterWrap>
      <Container fixed>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className="ftr_stack_main"
        >
          <Box className="ftr_left">
            <Typography>Copyright 2024</Typography>
          </Box>
          <Box className="menulist_social">
            <List disablePadding className="listFooter">
              {footerLinkList.map((item, index) => (
                <ListItem disablePadding key={index}>
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
        </Stack>
      </Container>
    </FooterWrap>
  );
};

export default Footer;
