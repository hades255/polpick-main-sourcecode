/* eslint-disable @next/next/no-img-element */
// import assest from "@/json/assest";
import { primaryColors } from "@/themes/_muiPalette";
// import InputFieldCommon from "@/ui/CommonInput/CommonInput";
// import ChatIcon from "@/ui/Icons/ChatIcon";
// import CrossIcon from "@/ui/Icons/CrossIcon";
import { getRecentWins, getTopTenWinnersList } from "@/api/functions/game.api";
import { addElipsisBetweenLength, getFlag } from "@/lib/functions/_helpers.lib";
import RightArrowIcon2 from "@/ui/Icons/RightArrowIcon2";
import {
  Box,
  Button,
  Skeleton,
  // List,
  // ListItem,
  Tab,
  Tabs,
  Typography,
  styled
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useInView } from "react-intersection-observer";
import DashboardChatSection from "../DashboardChatSection/DashboardChatSection";
import SingleBadge from "../SingleBadge/SingleBadge";

const RightUserSecWrap = styled(Box)`
  position: relative;
  max-width: 305px;
  padding-left: 20px;
  @media (min-width: 1921px) {
    max-width: 100%;
  }
  .arw_icon2 {
    position: absolute;
    top: 14px;
    left: -13px;
    min-width: auto;
    height: 55px;
    width: auto;
    border-radius: 50px;
    background-color: ${primaryColors.primary};
    padding: 20px 50px 20px 20px;

    &:hover {
      background-color: ${primaryColors.primary};
    }
  }
  .rgt_card_lower {
    background-color: ${primaryColors.primary};
    border-radius: 32px;
    padding: 22px;
    padding-right: 0;

    ul {
      height: 215px;
      overflow-y: auto;
      padding-right: 22px;
      @media (min-width: 1921px) {
        height: 20vh;
      }
      @media (max-width: 1699px) {
        height: 160px;
      }

      li {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        figure {
          width: 32px;
          height: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100%;
          overflow: hidden;
          flex-shrink: 0;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        @media (max-width: 1699px) {
          margin-bottom: 15px;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .status {
      margin-left: auto;
      color: ${primaryColors.color6c769c};
      font-size: 12px;
      font-weight: 500;
    }
    .user_name {
      margin-left: 20px;
      h5 {
        font-size: 12px;
        font-weight: 600;
        color: ${primaryColors.white};
        @media (min-width: 1921px) {
          font-size: 0.75vw;
        }
      }
      p {
        color: ${primaryColors.white};
        font-size: 12px;
        @media (min-width: 1921px) {
          font-size: 0.65vw;
        }
      }
      .join {
        font-weight: 500;
        font-size: 12px;
        color: ${primaryColors.colorff7424};
        @media (min-width: 1921px) {
          font-size: 0.65vw;
        }
      }
    }
  }
  .rgt_card_upper {
    background-color: ${primaryColors.primary};
    border-radius: 32px;
    padding: 22px;
    padding-right: 0;
  }

  .cross_icon {
    margin: 6px 0;
    text-align: end;
    button {
      padding: 0;
      min-width: auto;
    }
  }
`;

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
      {value === index && <Box className="tab_content">{children}</Box>}
    </div>
  );
}

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export const CardOutr = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  margin-top: 15px;

  @media (max-width: 1699px) {
    margin-bottom: 15px;
  }
  &:last-child {
    margin-bottom: 0;
  }
  p {
    font-size: 13px;
    font-weight: 600;
    color: ${primaryColors.white};
    @media (min-width: 1921px) {
      font-size: 0.75vw;
    }
    &.name {
      font-weight: 500;
      padding-left: 15px;
    }
    &.price {
      margin-left: auto;
      padding-left: 5px;
    }
    &.id {
      padding-right: 10px;
    }
  }
`;

// const FormSec = styled(Box)`
//   margin-top: 10px;
//   @media (min-width: 1921px) {
//     margin-top: 2vh;
//   }
//   .form-group {
//     background-color: rgba(40, 44, 70, 0.2);
//     border: 1.5px solid rgba(103, 120, 177, 0.3);
//     border-radius: 20px;
//     position: relative;
//     height: 63px;
//     @media (min-width: 1921px) {
//       height: 7vh;
//     }
//     .MuiFormControl-root {
//       height: 100%;
//       &.MuiTextField-root {
//         .MuiInputBase-root {
//           min-width: auto;
//           background-color: rgba(40, 44, 70, 0.2);
//           border: 0;
//           height: 100%;
//           padding-right: 70px;
//           font-size: 12px;

//           input {
//             @media (min-width: 1921px) {
//               font-size: 0.75vw;
//             }
//             &::placeholder {
//               /* Chrome, Firefox, Opera, Safari 10.1+ */
//               color: rgba(236, 243, 255, 0.3) !important;
//               opacity: 1;
//               /* Firefox */
//             }

//             &:-ms-input-placeholder {
//               /* Internet Explorer 10-11 */
//               color: rgba(236, 243, 255, 0.3) !important;
//             }

//             &::-ms-input-placeholder {
//               /* Microsoft Edge */
//               color: rgba(236, 243, 255, 0.3) !important;
//             }
//           }
//           fieldset {
//             display: none;
//           }
//         }
//       }
//     }

//     .chat_btn {
//       height: 44px;
//       width: 44px;
//       min-width: auto;
//       display: inline-flex;
//       align-items: center;
//       justify-content: center;
//       border-radius: 10px;
//       padding: 0;
//       position: absolute;
//       top: 9.5px;
//       right: 9.5px;

//       /* 3 */
//       background: radial-gradient(
//           95.83% 95.83% at 16.67% 4.17%,
//           #769bff 0%,
//           #326aff 100%
//         )
//         /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
//       box-shadow: -32px 32px 18px rgba(9, 9, 17, 0.01),
//         -18px 18px 15px rgba(9, 9, 17, 0.04), -8px 8px 11px rgba(9, 9, 17, 0.06),
//         -2px 2px 6px rgba(9, 9, 17, 0.07), 0px 0px 0px rgba(9, 9, 17, 0.07);
//       &:hover {
//         background: radial-gradient(
//           95.83% 95.83% at 16.67% 4.17%,
//           #326aff 0%,
//           #769bff 100%
//         );
//       }
//       @media (min-width: 1921px) {
//         width: 5vh;
//         height: 5vh;
//         border-radius: 0.65vw;
//         svg {
//           width: 1vw;
//           height: 1vw;
//         }
//       }
//     }
//   }
// `;

interface singleCardProps {
  id: string;
  flagimage: string;
  userImage: string;
  price: string;
  name: string;
  isUp: boolean;
}

function SingleCard({
  id,
  flagimage,
  userImage,
  price,
  name,
  isUp
}: singleCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.9,
    rootMargin: "-75px"
  });
  return (
    <CardOutr ref={ref} className={!inView ? "opacityShow" : ""}>
      <Typography variant="body1" className="id">
        {id}
      </Typography>

      <SingleBadge
        flagImage={flagimage}
        userImage={userImage}
        isIcon
        isDown={isUp}
      />
      <Typography variant="body1" className="name">
        {name}
      </Typography>
      <Typography variant="body1" className="price">
        {price}
      </Typography>
    </CardOutr>
  );
}

export default function RightUserSec() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data: recentWinners } = useQuery({
    queryKey: ["recentWins"],
    queryFn: getRecentWins
  });

  const { data: topFiveWinners } = useQuery({
    queryKey: ["toptenwinners"],
    queryFn: getTopTenWinnersList
  });
  // console.log("topFiveWinners", topFiveWinners);

  return (
    <RightUserSecWrap>
      <Button className="arw_icon2">
        <RightArrowIcon2 />
      </Button>
      <Box className="rgt_card">
        <Box className="rgt_card_upper">
          <Box className="cmn_tab">
            <Box className="tab_hdr">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Recent Wins" {...a11yProps(0)} />
                <Tab label="Top 5" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {recentWinners?.data.length ? (
                recentWinners?.data.map((data, index) => (
                  <SingleCard
                    key={`${index + 1 + data.walletId}`}
                    id={`${index + 1}`}
                    flagimage={getFlag(data?.country)}
                    userImage={data.profile_image}
                    price={`${data.tradeAmount}`}
                    name={
                      data.walletId
                        ? addElipsisBetweenLength(data.walletId, 5, 2)
                        : "N/A"
                    }
                    isUp={data.betFor === "up"}
                  />
                ))
              ) : (
                <Box sx={{ marginTop: "15px" }}>
                  {Array.from({ length: 5 }, (_, index) => index + 1).map(
                    () => (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px"
                        }}
                      >
                        <Skeleton
                          variant="circular"
                          animation="wave"
                          width={20}
                          height={20}
                        />
                        <Skeleton
                          width="calc(100% - 30px)"
                          sx={{
                            marginLeft: "10px"
                          }}
                        />
                      </Box>
                    )
                  )}
                </Box>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {topFiveWinners?.data.length ? (
                topFiveWinners?.data.map((data, index) => (
                  <SingleCard
                    id={`${index + 1}`}
                    key={`${index + 1 + data.walletId}`}
                    flagimage={getFlag(data?.country)}
                    userImage={data.profile_image}
                    price={`${data.tradeAmount}`}
                    name={
                      data.walletId
                        ? addElipsisBetweenLength(data.walletId, 5, 2)
                        : "N/A"
                    }
                    isUp={data.betFor === "up"}
                  />
                ))
              ) : (
                <Box sx={{ marginTop: "15px" }}>
                  {Array.from({ length: 5 }, (_, index) => index + 1).map(
                    () => (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px"
                        }}
                      >
                        <Skeleton
                          variant="circular"
                          animation="wave"
                          width={20}
                          height={20}
                        />
                        <Skeleton
                          width="calc(100% - 30px)"
                          sx={{
                            marginLeft: "10px"
                          }}
                        />
                      </Box>
                    )
                  )}
                </Box>
              )}
              {/* {singleCardData.map((data) => (
                <SingleCard
                  key={data.id}
                  id={data.id}
                  flagimage={data.flagimage}
                  userImage={data.userImage}
                  price={data.price}
                  name={data.name}
                  isUp={data.up}
                />
              ))} */}
            </CustomTabPanel>
          </Box>
        </Box>

        <DashboardChatSection />
        {/* <Box className="chat_sec">
          <Box className="cross_icon">
            <Button>
              <CrossIcon />
            </Button>
          </Box>

          <Box className="rgt_card_lower">
            <List disablePadding>
              <ListItem disablePadding>
                <figure>
                  <img src={assest.singleCardImage1} alt="" />
                </figure>
                <Box className="user_name">
                  <Typography variant="h5">Palino</Typography>
                  <Typography variant="body1" className="join">
                    Has Joined!
                  </Typography>
                </Box>
                <Typography variant="body1" className="status">
                  Now
                </Typography>
              </ListItem>
              <ListItem disablePadding>
                <figure>
                  <img src={assest.singleCardImage2} alt="" />
                </figure>
                <Box className="user_name">
                  <Typography variant="h5">Alex</Typography>
                  <img src={assest.singleCardImage6} alt="" />
                </Box>
                <Typography variant="body1" className="status">
                  12:34
                </Typography>
              </ListItem>
              <ListItem disablePadding>
                <figure>
                  <img src={assest.singleCardImage3} alt="" />
                </figure>
                <Box className="user_name">
                  <Typography variant="h5">Les 333</Typography>
                  <img src={assest.singleCardImage7} alt="" />
                </Box>
                <Typography variant="body1" className="status">
                  12:31
                </Typography>
              </ListItem>
              <ListItem disablePadding>
                <figure>
                  <img src={assest.singleCardImage4} alt="" />
                </figure>
                <Box className="user_name">
                  <Typography variant="h5">Felix</Typography>
                  <Typography variant="body1" color="initial" className="join2">
                    I’m win!!!
                  </Typography>
                </Box>
                <Typography variant="body1" className="status">
                  12:30
                </Typography>
              </ListItem>
              <ListItem disablePadding>
                <figure>
                  <img src={assest.singleCardImage5} alt="" />
                </figure>
                <Box className="user_name">
                  <Typography variant="h5">Michael</Typography>
                  <img src={assest.singleCardImage6} alt="" />
                </Box>
                <Typography variant="body1" className="status">
                  12:29
                </Typography>
              </ListItem>
              <ListItem disablePadding>
                <figure>
                  <img src={assest.singleCardImage2} alt="" />
                </figure>
                <Box className="user_name">
                  <Typography variant="h5">Alex</Typography>
                  <img src={assest.singleCardImage6} alt="" />
                </Box>
                <Typography variant="body1" className="status">
                  12:34
                </Typography>
              </ListItem>
            </List>
          </Box>
          <FormSec>
            <form>
              <Box className="form-group">
                <InputFieldCommon placeholder="Write a message" />
                <Button className="chat_btn">
                  <ChatIcon />
                </Button>
              </Box>
            </form>
          </FormSec>
        </Box> */}
      </Box>
    </RightUserSecWrap>
  );
}
