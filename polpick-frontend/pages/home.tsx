import { fetchHomeCMS } from "@/api/functions/cms.api";
import AffiliateProgramSec from "@/components/AffiliateProgramSec/AffiliateProgramSec";
import BannerSec from "@/components/BannerSec/BannerSec";
import BenefitSec from "@/components/BenefitSec/BenefitSec";
import BestChanceSec from "@/components/BestChanceSec/BestChanceSec";
import ComparisonSec from "@/components/ComparisonSec/ComparisonSec";
import FAQSec from "@/components/FAQSec/FAQSec";
import { Subscribe } from "@/components/Subscribe/Subscribe";
import TopWinnerSec from "@/components/TopWinnerSec/TopWinnerSec";
import VideoSec from "@/components/VideoSec/VideoSec";
import Weeklyjackpot from "@/components/WeeklyJackpot/Weeklyjackpot";
import WinRatioSec, {
  CustomCardProps
} from "@/components/WinRatioSec/WinRatioSec";
import assest from "@/json/assest";
import Wrapper from "@/layout/wrapper/Wrapper";
import { HomeWrapper } from "@/styles/StyledComponents/BannerSecWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Index = () => {
  const router = useRouter();
  const [winCardList, setWinCardList] = useState<CustomCardProps[]>([
    {
      cardIcon: assest?.win_ratio_icon1,
      cardIconClone: assest?.win_ratio_icon1,
      title: "Win Ratio",
      count: "--",
      themeColor: "blue"
    },
    {
      cardIcon: assest?.win_ratio_icon2,
      cardIconClone: assest?.win_ratio_icon2,
      title: "Wins Paid",
      count: "--",
      themeColor: "green"
    },
    {
      cardIcon: assest?.win_ratio_icon3,
      cardIconClone: assest?.win_ratio_icon3,
      title: "Wins Paid",
      count: "--",
      themeColor: "orange"
    }
  ]);
  const {
    data: cmsdata
    // refetch: refetchTopWinners,
    // isLoading: isFetchingNews
  } = useQuery({
    queryKey: ["homecms"], //, startDate,endDate

    queryFn: fetchHomeCMS
  });
  // console.log("cmsdata", cmsdata);

  useEffect(() => {
    if (cmsdata?.data) {
      const _temp: CustomCardProps[] = [
        {
          cardIcon: assest?.win_ratio_icon1,
          cardIconClone: assest?.win_ratio_icon1,
          title: "Win Ratio",
          count: cmsdata?.data.win_ratio,
          themeColor: "blue"
        },
        {
          cardIcon: assest?.win_ratio_icon2,
          cardIconClone: assest?.win_ratio_icon2,
          title: "Wins Paid",
          count: cmsdata?.data.win_paid,
          themeColor: "green"
        },
        {
          cardIcon: assest?.win_ratio_icon3,
          cardIconClone: assest?.win_ratio_icon3,
          title: "Wins Paid",
          count: cmsdata?.data.jackpot_paid,
          themeColor: "orange"
        }
      ];
      setWinCardList(_temp);
    }
  }, [cmsdata]);

  return (
    <Wrapper>
      <HomeWrapper>
        <Box className="sub_header">
          <Container fixed>
            <Typography variant="h3">
              CHALLENGE PLAYERS GLOBALLY IN LIVE BITCOIN PREDICTION DUELS
            </Typography>
          </Container>
        </Box>
        <BannerSec
          bannerImage={assest?.banneraminimg}
          mainHeaderTextFonTSize="130px"
          mainTitle="Step into "
          mainTitle2="the Future of Gaming"
        >
          <Typography variant="h1">Decentralized & Secure </Typography>
          <Box className="pool_card_wrapper">
            {/* <Box className="left_pool_card">
            <Image
              src={assest?.up_pool_image}
              alt="up_pool_image"
              width={310}
              height={320}
            />
          </Box> */}
            <Box className="play_now_btn">
              <CustomButtonPrimary
                variant="contained"
                color="primary"
                onClick={() => {
                  router.push("/");
                }}
              >
                Play Now
              </CustomButtonPrimary>
            </Box>
            {/* <Box className="rgt_pool_card">
            <Image
              src={assest?.down_pool_image}
              alt="down_pool_image"
              width={310}
              height={320}
            />
          </Box> */}
          </Box>
        </BannerSec>
        <WinRatioSec
          mainTitle="Proven Success Rates"
          subTitle="PAID IN THE LAST 24 HOURS"
          cardList={winCardList}
        />
        <VideoSec
          videoThumbnailImage={
            cmsdata?.data.thumbnail_link
              ? cmsdata?.data.thumbnail_link
              : assest.video_thumb_image
          }
          videoLink={cmsdata?.data.video_link || ""}
          headerTitle="Watch and Win"
          headerSubTitle="See the Game in Action"
        />
        <ComparisonSec cmsData={cmsdata?.data.CmsData || []} />
        <Weeklyjackpot />
        <TopWinnerSec data={cmsdata?.data.TopWinnerData || []} />
        <BenefitSec />
        <AffiliateProgramSec
          mainTitle="Affiliate Program"
          subTitle="Join & make passive daily income"
          customLinheight={1.5}
        />
        <FAQSec />
        <BestChanceSec />
        <Subscribe />
      </HomeWrapper>
    </Wrapper>
  );
};

export default Index;
