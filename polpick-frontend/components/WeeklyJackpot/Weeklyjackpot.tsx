import assest from "@/json/assest";
import { WeeklyjackpotWrapper } from "@/styles/StyledComponents/WeeklyjackpotWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import CommonHeaderLanding from "../CommonHeaderLanding/CommonHeaderLanding";

const Weeklyjackpot = () => {
  const router = useRouter();
  return (
    <WeeklyjackpotWrapper className="cmn_gap">
      <CommonHeaderLanding
        mainTitle="Weekly Jackpot"
        subTitle="win every week"
      />
      <Container className="cus_container" fixed>
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          className="jackpot_sec"
        >
          <Box className="jackpot_fig">
            <figure>
              <Image
                src={assest?.weekly_jackpot_image}
                alt="jackpot_image"
                width={3000}
                height={1500}
              />
            </figure>
          </Box>
          <Box className="jackpot_content">
            <Typography variant="h3">
              10% of the Platorms income will be raffled among all the
              participants in the game
            </Typography>
            <Typography>
              You have 5 prize polls that gives you the best chance to win, if
              you are a heavy gainer you will have a big chance, if you are a
              small fish you can still win, as many trades you do, ypur chances
              will be higher!
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
        </Stack>
      </Container>
    </WeeklyjackpotWrapper>
  );
};

export default Weeklyjackpot;
