import { GetInTouchSecWrapper } from "@/styles/StyledComponents/GetInTouchSecWrapper";
import { Box, Container } from "@mui/material";
import CommonFormSec from "../CommonFormSec/CommonFormSec";
import CommonHeaderLanding from "../CommonHeaderLanding/CommonHeaderLanding";

const GetInTouchSec = () => {
  return (
    <GetInTouchSecWrapper className="cmn_gap">
      <CommonHeaderLanding
        mainTitle="Get in Touch"
        subTitle="Become an affiliate now"
      />
      <Container fixed className="cus_container">
        <Box className="get_in_touch_sec">
          <CommonFormSec IconColor="#87A0FF" isBtn noMargin />
        </Box>
      </Container>
    </GetInTouchSecWrapper>
  );
};

export default GetInTouchSec;
