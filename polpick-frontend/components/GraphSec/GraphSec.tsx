/* eslint-disable consistent-return */

"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-array-index-key */
import { GraphSecWrapper } from "@/styles/StyledComponents/GraphSecWrapper";
import { primaryColors } from "@/themes/_muiPalette";
import BitCoinIcon from "@/ui/Icons/BitCoinIcon";
import StockDownIcon from "@/ui/Icons/StockDownIcon";
import StockUpIcon from "@/ui/Icons/StockUpIcon";
import {
  Avatar,
  Box,
  BoxProps,
  Chip,
  Grid,
  // Chip,
  // CircularProgress,
  List,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography
} from "@mui/material";

import { useAppSelector } from "@/hooks/redux/useAppSelector";
import TimerIcon from "@/ui/Icons/TimerIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import GraphSecPopUp from "../GraphSecPopUp/GraphSecPopUp";
import TimeBlock from "../TimeBlock/TimeBlock";
import VisxChart from "../VisxChart/VisxChart";

interface GraphProps {
  isProgress?: boolean;
}

const GraphSec: React.FC<GraphProps & BoxProps> = ({
  // isProgress = true,
  ...props
}) => {
  const router = useRouter();
  const timer = useAppSelector((s) => s.timerSlice);
  const gameSelector = useAppSelector((s) => s.gameSlice);
  const tradeSelector = useAppSelector((s) => s.tradeSlice);

  const [currency, setCurrency] = React.useState("15");

  // const handleChange = (event: SelectChangeEvent) => {
  //   setCurrency(event.target.value);
  // };

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
  //

  // const leftPartAvatr = [
  //   {
  //     image: assest?.pickMblImg1
  //   },
  //   {
  //     image: assest?.pickMblImg2
  //   },
  //   {
  //     image: assest?.pickMblImg3
  //   },
  //   {
  //     image: assest?.pickMblImg4
  //   },
  //   {
  //     image: assest?.pickMblImg5
  //   },
  //   {
  //     image: assest?.pickMblImg6
  //   },
  //   {
  //     image: assest?.pickMblImg7
  //   },
  //   {
  //     image: assest?.pickMblImg8
  //   },
  //   {
  //     image: assest?.pickMblImg9
  //   }
  // ];

  // const RightPartAvatr = [
  //   {
  //     image: assest?.pickMblImg10
  //   },
  //   {
  //     image: assest?.pickMblImg11
  //   },
  //   {
  //     image: assest?.pickMblImg12
  //   },
  //   {
  //     image: assest?.pickMblImg13
  //   },
  //   {
  //     image: assest?.pickMblImg14
  //   },
  //   {
  //     image: assest?.pickMblImg15
  //   },
  //   {
  //     image: assest?.pickMblImg16
  //   }
  // ];
  const parentRef = useRef<HTMLDivElement>(null);
  const [windowDimension, setWindowDimension] = useState<{
    windowWidth: number;
    windowHeight: number;
  }>({
    windowWidth: 0,
    windowHeight: 0
  });

  useEffect(() => {
    // Check if window object is available
    if (parentRef.current) {
      const handleResize = () => {
        if (parentRef.current) {
          setWindowDimension({
            windowWidth: parentRef.current.clientWidth,
            windowHeight: parentRef.current.clientHeight
          });
        }
      };

      // Set initial width
      setWindowDimension({
        windowWidth: parentRef.current.clientWidth,
        windowHeight: parentRef.current?.clientHeight
      });

      window.addEventListener("resize", handleResize);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
    return () => {};
  }, []);

  useEffect(() => {
    AOS.init({
      // offset: 200,
      easing: "ease",
      delay: 100
    });
    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <GraphSecWrapper {...props}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="graph_info_sec"
      >
        <Box className="graph_info_secLf">
          <Typography variant="h2" className="grn_txt">
            <Typography variant="caption">
              <StockUpIcon />
            </Typography>
            {/* 188 */}
            {tradeSelector.up_return_percentage}
            <Typography variant="caption">%</Typography>
          </Typography>
        </Box>
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
            <MenuItem value="" sx={{ display: "none !important" }}>
              Bitcoin 15
            </MenuItem>
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
                      <Typography>
                        {/* <i>
                          <WhiteBitCoinIcon />
                        </i> */}
                        $5
                      </Typography>
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
                      <Typography>
                        {/* <i>
                          <WhiteBitCoinIcon />
                        </i> */}
                        $ 200
                      </Typography>
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
                      <Typography>
                        {/* <i>
                          <WhiteBitCoinIcon />
                        </i> */}
                        $ 5
                      </Typography>
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
                      <Typography>
                        {/* <i>
                          <WhiteBitCoinIcon />
                        </i> */}
                        $ 200
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </MenuItem>
          </Select>
        </Box>

        <TimeBlock
          className="time_block mbl"
          sx={{ display: { xs: "none", md: "block" } }}
        />
        <Box className="graph_info_secRt">
          <Typography variant="h2" className="red_txt">
            <Typography variant="caption">
              <StockDownIcon />
            </Typography>
            {/* 192 */}
            {tradeSelector.down_return_percentage}
            <Typography variant="caption">%</Typography>
          </Typography>
        </Box>
      </Stack>
      <Box
        className="uptradmdscreen"
        sx={{ display: { xs: "none", md: "block" } }}
      >
        <GraphSecPopUp
          gameSelector={gameSelector}
          timer={timer}
          // key="md-screen"
        />
      </Box>

      <Box
        className="bitSecndMdfy"
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box className="bitSecndMdfy_rtt">
          <List className="innerBoxAvtrs">
            {tradeSelector.up_array?.length
              ? tradeSelector.up_array.map((item, index) => {
                  if (index <= 9) {
                    return (
                      <ListItem
                        key={index}
                        data-aos="custom-fade-up"
                        data-aos-duration={`${200 * index + 1}`}
                        data-aos-offset="200"
                      >
                        <Avatar
                          src={item?.avatarUrl}
                          sx={{ height: "20px", width: "20px" }}
                        />
                      </ListItem>
                    );
                  }
                })
              : null}
            {tradeSelector.up_array?.length &&
            tradeSelector.up_array?.length > 10 ? (
              <ListItem
                data-aos="custom-fade-up"
                data-aos-duration="600"
                data-aos-offset="200"
              >
                <Avatar
                  sx={{
                    height: "20px",
                    width: "20px",
                    bgcolor: "#326AFF",
                    alignItems: "center"
                  }}
                  className="player_extra"
                >
                  <Typography variant="caption">
                    {" "}
                    +{tradeSelector.up_array.length - 9}
                  </Typography>
                </Avatar>
              </ListItem>
            ) : null}
          </List>
        </Box>
        <Box className="bitSecndMdfy_Mdl">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="graph_info_sec"
          />
        </Box>
        <Box className="bitSecndMdfy_lft">
          <List className="innerBoxAvtrs">
            {tradeSelector.down_array?.length
              ? tradeSelector.down_array.map((item, index) => {
                  if (index <= 9) {
                    return (
                      <ListItem
                        key={index}
                        data-aos="custom-fade-up"
                        data-aos-duration={`${200 * index + 1}`}
                        data-aos-offset="200"
                      >
                        <Avatar
                          src={item?.avatarUrl}
                          sx={{ height: "20px", width: "20px" }}
                        />
                      </ListItem>
                    );
                  }
                })
              : null}
            {tradeSelector.down_array?.length &&
            tradeSelector.down_array?.length > 10 ? (
              <ListItem
                data-aos="custom-fade-up"
                data-aos-duration="600"
                data-aos-offset="200"
              >
                <Avatar
                  sx={{
                    height: "20px",
                    width: "20px",
                    bgcolor: "#326AFF",
                    alignItems: "center"
                  }}
                  className="player_extra"
                >
                  <Typography variant="caption">
                    {" "}
                    +{tradeSelector.down_array.length - 9}
                  </Typography>
                </Avatar>
              </ListItem>
            ) : null}
          </List>
        </Box>
      </Box>
      <Box className="updowntrad" sx={{ display: { xs: "block", md: "none" } }}>
        <GraphSecPopUp
          gameSelector={gameSelector}
          timer={timer}
          // key="xs-screen"
        />
      </Box>
      <Box className="line_wrapper" ref={parentRef}>
        {/* <LineChartDashed /> */}

        {/* <Box
          className="updowntrad"
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <GraphSecPopUp
            gameSelector={gameSelector}
            timer={timer}
            // key="xs-screen"
          />
        </Box> */}

        {/* <RealTimeChart /> */}
        <VisxChart
          height={windowDimension?.windowHeight}
          windowWidth={windowDimension?.windowWidth}
        />
      </Box>
    </GraphSecWrapper>
  );
};

export default GraphSec;
