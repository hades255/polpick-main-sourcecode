import assest from "@/json/assest";
import { BestChanceSecWrapper } from "@/styles/StyledComponents/BestChanceSecWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import CommonHeaderLanding from "../CommonHeaderLanding/CommonHeaderLanding";

const BestChanceSec = () => {
  const router = useRouter();
  return (
    <BestChanceSecWrapper className="cmn_gap">
      <Box className="content_wrap">
        <CommonHeaderLanding
          mainTitle="Up Or Down"
          subTitle="QUICK 15 SECOND CYCLES"
        />
        <Box className="content">
          <Container fixed>
            <Stack alignItems="center" justifyContent="center">
              <Typography variant="h1">Predict & Win </Typography>
              <CustomButtonPrimary
                variant="contained"
                color="primary"
                onClick={() => {
                  router.push("/");
                }}
              >
                Play Now
              </CustomButtonPrimary>
            </Stack>
          </Container>
        </Box>
      </Box>
      <figure className="best_chance_bg_img">
        <Image
          src={assest.banner_image_compressed}
          alt="today_best_chance_bg_image"
          width={2105}
          height={1015}
        />
      </figure>
    </BestChanceSecWrapper>
  );
};

export default BestChanceSec;
