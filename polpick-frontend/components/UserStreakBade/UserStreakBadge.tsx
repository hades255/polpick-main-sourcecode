/* eslint-disable jsx-a11y/media-has-caption */
import HeaderSmallProgress from "@/components/HeaderSmallProgress/HeaderSmallProgress";
import { userStreaks } from "@/config/constants";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import assest from "@/json/assest";
import { IHeaderListType } from "@/json/mock/headerList.mock";
import { setCompletionCount } from "@/reduxtoolkit/slices/userSlice";
import HeaderBtnIconRg from "@/ui/Icons/HeaderBtnIconRg";
import ToolTipIconhdr from "@/ui/Icons/ToolTipIconhdr";
import {
  Box,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
import React, { memo, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useAccount } from "wagmi";

const UserStreakBadge = () => {
  const account = useAccount();

  const dispatch = useAppDispatch();

  const tradeSelector = useAppSelector((state) => state.tradeSlice);
  const userStreakData = useAppSelector(
    (state) => state.userSlice.userTicketProgress
  );

  const completionCount = useAppSelector(
    (state) => state.userSlice.fullCompletionCount
  );

  const [anchorEltw, setAnchorEltw] = useState<null | HTMLElement>(null);
  const opentw = Boolean(anchorEltw);

  const handleClickTw = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEltw(event.currentTarget);
  };
  const handleCloseTw = () => {
    setAnchorEltw(null);
  };

  const [completionList, setCompletionList] = useState<IHeaderListType[]>([]);

  const [steakBadgeComponents, setStreakBadgeComponents] = useState<
    IHeaderListType[] | []
  >([]);

  const videoRef = useRef<any>(null);

  useEffect(() => {
    if (steakBadgeComponents?.length) {
      const sortedList = [...steakBadgeComponents].sort((a, b) => {
        return b.compleTionRate - a.compleTionRate;
      });
      setCompletionList(sortedList);

      let count = 0;
      sortedList.forEach((data) => {
        if (data?.compleTionRate === 100) {
          count += 1;
        }
      });
      if (count !== completionCount) {
        dispatch(setCompletionCount(count));
      }
    }
  }, [steakBadgeComponents]);

  useEffect(() => {
    if (userStreakData) {
      const tempBadgeList: IHeaderListType[] = [];
      Object.keys(userStreakData).map((item, index) => {
        const badgeProps = userStreaks?.find((s) => s.name === item);
        if (badgeProps) {
          const _temp: IHeaderListType = {
            compleTionRate: userStreakData[item],
            _id: badgeProps.name,
            color: badgeProps.stopColor1,
            name: badgeProps.description,
            prizeCount: badgeProps.ticketCount,
            eachChild: (
              <HeaderSmallProgress
                icon={badgeProps.icon}
                stopColor1={badgeProps.stopColor1}
                stopColor2={badgeProps.stopColor2}
                knobColor={badgeProps.knobColor}
                value={userStreakData[item]}
                indexValue={index + 1}
              />
            )
          };
          tempBadgeList.push(_temp);
        }
        // if (!badgeProps) return null; // Ensure badgeProps is defined before rendering
      });

      setStreakBadgeComponents(tempBadgeList);
    }
  }, [userStreakData]);

  // };

  const sliderRef = useRef<Slider>(null);

  const sliderNext = () => {
    sliderRef.current?.slickNext();
  };

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 0 && count !== completionCount) {
      setTimeout(() => {
        sliderNext();
        videoRef?.current?.play();
      }, 1000);
    }
    setCount(completionCount);
  }, [completionCount, count]);

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <Box className="menuOneList">
      <video className="bgImg" playsInline autoPlay={false} ref={videoRef}>
        <source src={assest.confetigif} type="video/webm" />
      </video>
      {/* 
      <Lottie
        loop={false}
        autoPlay={false}
        animationData={confetti_balance}
        className="bgImg"
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice"
        }}
        ref={videoRef}
      /> */}

      <Button
        id="basic-button"
        aria-controls={opentw ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={opentw ? "true" : undefined}
        onClick={handleClickTw}
        className="notification_btn"
      >
        <Box className="btnListAll">
          <i>
            <HeaderBtnIconRg />
          </i>
          {/* 557 */}
          {userStreakData?.totalTicketsCount}
          <ToolTipIconhdr />
        </Box>
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEltw}
        open={opentw}
        onClose={handleCloseTw}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}
        className="menuDropListWRap"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        {completionList?.map((data) => (
          <MenuItem key={data?._id}>
            <Box className="icon_block">{data?.eachChild}</Box>
            <Typography>
              {/* <Typography variant="caption">
              {" "}
              <CupIcon />{" "}
            </Typography>{" "} */}{" "}
              {data?.name} -{" "}
              <Typography variant="caption">
                {" "}
                <HeaderBtnIconRg style={{ color: data?.color }} />{" "}
              </Typography>{" "}
              {data?.prizeCount}
            </Typography>
          </MenuItem>
        ))}

        <MenuItem>
          <Button>See details</Button>
        </MenuItem>
      </Menu>
      <Box className="btmProgress_otr">
        <Box className="btmProgress">
          {completionList!! && completionList?.length ? (
            <Slider
              {...settings}
              ref={sliderRef}
              initialSlide={completionCount}
              draggable={false}
            >
              {completionList?.map((data) => (
                <Box className="singleProgressList" key={data?._id}>
                  {data?.eachChild}
                </Box>
              ))}
            </Slider>
          ) : (
            <CircularProgress color="primary" size={20} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(UserStreakBadge);
