import assest from "@/json/assest";
import { MetMaskWrapper } from "@/styles/StyledComponents/MetMaskWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import { Box, Button, Stack, Typography, styled } from "@mui/material";
import Image from "next/image";

import { useState } from "react";

const DemoModalComponentWrapper = styled(Box)``;

export default function DemoModalComponent() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModal1, setOpenModal1] = useState<boolean>(false);
  const handleModalClose = () => {
    setOpenModal(false);
  };
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose1 = () => {
    setOpenModal1(false);
  };
  const handleModalOpen1 = () => {
    setOpenModal1(true);
  };
  return (
    <>
      <DemoModalComponentWrapper>
        <Button onClick={handleModalOpen}>Modal 1</Button>
        <Button onClick={handleModalOpen1}>Modal 2</Button>
      </DemoModalComponentWrapper>
      <MuiModalWrapper
        className="balancemodal"
        open={openModal}
        onClose={handleModalClose}
      >
        <MetMaskWrapper>
          <Box className="modallogo">
            <figure className="blurlogo">
              <Image
                src={assest.balance0modal}
                width={299}
                height={188}
                alt="modalimage"
              />
            </figure>
            <figure className="mainlogo">
              <Image
                src={assest.balance0modal}
                width={299}
                height={188}
                alt="modalimage"
              />
            </figure>
          </Box>
          <Box className="title_stack">
            <Typography variant="h2">Opps!</Typography>
            <Typography variant="h2">Your balance is 0</Typography>
          </Box>

          <Box className="meta_mask_body">
            <Box className="footer_Sec">
              <Stack direction="row" justifyContent="center">
                <CustomButtonPrimary
                  variant="contained"
                  color="primary"
                  onClick={handleModalClose}
                >
                  Top up your balance
                </CustomButtonPrimary>
              </Stack>
            </Box>
          </Box>
        </MetMaskWrapper>
      </MuiModalWrapper>
      <MuiModalWrapper
        className="balancemodal"
        open={openModal1}
        onClose={handleModalClose1}
      >
        <MetMaskWrapper>
          <Box className="modallogo1">
            <figure className="blurlogo">
              <Image
                src={assest.modalwallet}
                width={200}
                height={238}
                alt="modalimage"
              />
            </figure>
            <figure className="mainlogo">
              <Image
                src={assest.modalwallet}
                width={200}
                height={238}
                alt="modalimage"
              />
            </figure>
          </Box>
          <Box className="title_stack">
            <Typography variant="h2">Payment Success</Typography>
            <CustomButtonPrimary
                  variant="contained"
                  color="primary"
                  className="confirmBtn"
                >
                Continue
                </CustomButtonPrimary>
          </Box>
          {/* <Box className="radiowrap">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio disableRipple />}
                label={
                  <>
                    <BitCoinIcon />
                    <Typography variant="body1">Crypto</Typography>
                  </>
                }
              />
              <FormControlLabel
                value="male"
                control={<Radio disableRipple />}
                label={
                  <>
                    <CardIcon />
                    <Typography variant="body1">Card</Typography>
                  </>
                }
              />
            </RadioGroup>
          </Box> */}
        </MetMaskWrapper>
      </MuiModalWrapper>
    </>
  );
}
