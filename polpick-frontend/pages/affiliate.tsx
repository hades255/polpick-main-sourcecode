import BannerSec from "@/components/BannerSec/BannerSec";
import FAQSec from "@/components/FAQSec/FAQSec";

import HowItWorksSec from "@/components/HowItWorksSec/HowItWorksSec";
import { OpportunitySec } from "@/components/OpportunitySec/OpportunitySec";
import { Subscribe } from "@/components/Subscribe/Subscribe";
import { TopAffiliates } from "@/components/TopAffiliates/TopAffiliates";
import VideoSec from "@/components/VideoSec/VideoSec";
import WinRatioSec, {
  CustomCardProps
} from "@/components/WinRatioSec/WinRatioSec";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

const winCardList: CustomCardProps[] = [
  {
    cardIcon: assest?.win_ratio_icon4,
    cardIconClone: assest?.win_ratio_icon4,
    title: "Total players",
    count: "50,876",
    themeColor: "blue"
  },
  {
    cardIcon: assest?.win_ratio_icon5,
    cardIconClone: assest?.win_ratio_icon5,
    title: "Total affiliates",
    count: "1,578,363",
    themeColor: "green"
  },
  {
    cardIcon: assest?.win_ratio_icon6,
    cardIconClone: assest?.win_ratio_icon6,
    title: "Winnings paid to affiliates",
    count: "$90,752,059",
    themeColor: "orange"
  }
];

const Index = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <BannerSec
        bannerImage={assest?.banner_image_affiliate}
        mainTitle="Make money"
        subTitle="Meet our web3 Affiliate program"
        className="transform_banner"
      >
        <Typography variant="h1" className="small_banner_heading">
          <Typography variant="caption">from each bet</Typography>
          the player you invited makes
        </Typography>

        <Box className="banner_mdl_sec">
          <Typography variant="h1" className="small_banner_heading">
            30%
            <Typography variant="caption">revshare</Typography>
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ marginTop: "20px" }}
          >
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
        </Box>
      </BannerSec>

      <VideoSec
        videoThumbnailImage={assest.affiliate_video_thumbnail}
        videoLink=""
        headerTitle="Watch and Learn"
        headerSubTitle="Learn How to Earn with Polpick"
        sx={{ marginTop: "-180px" }}
        className="video_affiliate"
      />
      <WinRatioSec
        mainTitle="Why Polpick?"
        subTitle="Quick and Simple Registration"
        // className="why_sec_sec"
        cardList={winCardList}
      />
      <HowItWorksSec />
      <TopAffiliates />
      <FAQSec />
      <OpportunitySec />
      {/* <GetInTouchSec /> */}
      <Subscribe />
    </Wrapper>
  );
};

export default Index;
