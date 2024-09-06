/* eslint-disable jsx-a11y/media-has-caption */
import { VideoSecWrapper } from "@/styles/StyledComponents/VideoSecWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import PlayIcon from "@/ui/Icons/PlayIcon";
import {
  Box,
  BoxProps,
  Button,
  Container,
  Stack,
  Typography
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import CommonHeaderLanding from "../CommonHeaderLanding/CommonHeaderLanding";

interface VideoProps {
  videoThumbnailImage: string;
  videoLink: string;
  headerTitle: string;
  headerSubTitle: string;
}

const VideoSec: React.FC<VideoProps & BoxProps> = ({
  videoThumbnailImage,
  videoLink,
  headerTitle,
  headerSubTitle,
  ...props
}) => {
  const router = useRouter();
  const [isPlay, setIsPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isPlay) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlay]);
  return (
    <VideoSecWrapper className="cmn_gap" {...props}>
      <CommonHeaderLanding mainTitle={headerTitle} subTitle={headerSubTitle} />
      <Container fixed className="cus_container">
        <Box className="video_sec">
          <Box
            className={isPlay ? "video_sec_inner isActive" : "video_sec_inner"}
          >
            <Button
              className="play_btn"
              onClick={() => setIsPlay((data) => !data)}
            >
              <PlayIcon />
            </Button>
            {videoLink && videoThumbnailImage ? (
              <>
                <Image
                  src={videoThumbnailImage}
                  alt="thumb_image"
                  width={2700}
                  height={1200}
                  className="thumb_image"
                />
                <video
                  width="320"
                  height="240"
                  controls={false}
                  playsInline
                  muted
                  className="video_main"
                  ref={videoRef}
                  src={videoLink}
                />
              </>
            ) : null}

            {/* <source src={videoLink} type="video/mp4" /> */}
          </Box>
        </Box>
        <Stack
          alignItems="center"
          justifyContent="center"
          className="ftr_stack"
        >
          <Typography variant="h3">
            {" "}
            Join the Polpick Affiliate Network
          </Typography>
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            onClick={() => {
              router.push("/");
            }}
          >
            Become an affiliate
          </CustomButtonPrimary>
        </Stack>
      </Container>
    </VideoSecWrapper>
  );
};

export default VideoSec;
