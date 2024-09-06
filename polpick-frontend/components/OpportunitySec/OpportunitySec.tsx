/* eslint-disable import/order */
/* eslint-disable import/newline-after-import */
import { Box, Container, Stack, styled } from "@mui/material";
// eslint-disable-next-line import/newline-after-import
import assest from "@/json/assest";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import Image from "next/image";
import { useRouter } from "next/router";
import CommonHeaderLanding from "../CommonHeaderLanding/CommonHeaderLanding";
export const OpportunitySecWrap = styled(Box)`
  position: relative;
  padding: 160px 0 100px;
  figure {
    img {
      max-width: 100%;
      width: 100%;
    }
  }
  .oprt_conatiner_wrap {
    position: absolute;
    top: 160px;
    width: 100%;
    button {
      max-width: 310px;
    }
  }
`;
export const OpportunitySec = () => {
  const router = useRouter();
  return (
    <OpportunitySecWrap>
      <figure>
        <Image src={assest.bitcoinBack} width={1920} height={900} alt="" />
      </figure>
      <Box className="oprt_conatiner_wrap">
        <Container fixed>
          <CommonHeaderLanding
            mainTitle="Opportunity Is Waiting"
            subTitle="PLAY WEB3"
          />
          <Stack direction="row" justifyContent="center">
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
      </Box>
    </OpportunitySecWrap>
  );
};
