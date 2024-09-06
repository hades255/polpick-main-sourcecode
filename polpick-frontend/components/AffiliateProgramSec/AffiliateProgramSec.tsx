import assest from "@/json/assest";
import { AffiliateProgramSecWrapper } from "@/styles/StyledComponents/AffiliateProgramSecWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import CommonHeaderLanding, {
  CommonHeaderProps
} from "../CommonHeaderLanding/CommonHeaderLanding";

interface AffiliateProps extends CommonHeaderProps {}

const AffiliateProgramSec = ({ ...props }: AffiliateProps) => {
  const router = useRouter();
  return (
    <AffiliateProgramSecWrapper className="cmn_gap">
      <CommonHeaderLanding
        mainTitle={props?.mainTitle}
        subTitle={props?.subTitle}
        customLinheight={props?.customLinheight}
      />
      <Container className="cus_container" fixed>
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          className="affiliate_sec"
        >
          <Box className="affiliate_content">
            <Typography variant="h3">
              Get up to 35% commision on your friends earning fees - Join now to
              our multi level Referral program!
            </Typography>
            <Typography>
              Bring your friends to play and get automated daily passive income
              directly to your wallet, from the winning fees they pay!
            </Typography>
            <CustomButtonPrimary
              variant="contained"
              color="primary"
              onClick={() => {
                router.push("/");
              }}
            >
              I want to Play!
            </CustomButtonPrimary>
          </Box>
          <Box className="affiliate_fig">
            <figure>
              <Image
                src={assest?.affiliate_program_image}
                alt="affiliate_image"
                width={3000}
                height={1500}
              />
            </figure>
          </Box>
        </Stack>
      </Container>
    </AffiliateProgramSecWrapper>
  );
};

export default AffiliateProgramSec;
