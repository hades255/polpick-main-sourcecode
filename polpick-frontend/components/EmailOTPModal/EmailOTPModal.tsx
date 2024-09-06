/* eslint-disable consistent-return */
import assest from "@/json/assest";
import { useWeb3Auth } from "@/layout/WalletWrapper/WalletWrapper";
import {
  addElipsisBetweenLength,
  getTimerText
} from "@/lib/functions/_helpers.lib";
import { MetMaskWrapper } from "@/styles/StyledComponents/MetMaskWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CopyFileIcon from "@/ui/Icons/CopyFileIcon";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Typography
} from "@mui/material";

import Image from "next/image";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { toast } from "sonner";

interface EmailOTPModalInterface {
  openModal: boolean;
  toggleOpen: () => void;
}

const EmailOTPModal = ({ openModal, toggleOpen }: EmailOTPModalInterface) => {
  const web3Auth = useWeb3Auth();
  const [timer, setTimer] = useState<Date>(
    new Date(new Date().getTime() * 1000)
  );

  const [openModal1, setOpenModal1] = useState<boolean>(true);
  const [showTimeout, setShowTimeOut] = useState<Boolean>(false);
  const [disableBtn, setDisableBtn] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string>("");

  const [privateKey, setPrivateKey] = useState<string>("");

  const requestOTP = () => {
    // console.log("send otp");
    // if (otpValue.length < 6) {
    // }
    setShowTimeOut(true);
    setDisableBtn(true);
    setTimer(new Date(new Date().getTime() + 50 * 1000)); // get from API
  };

  const copyKey = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Key Copied!");
  };

  const verifyOTP = () => {
    // console.log("verify otp");
    copyKey(privateKey);
  };

  const getPrivateKey = async () => {
    try {
      if (web3Auth?.provider) {
        const privateKey = await web3Auth?.provider.request({
          method: "eth_private_key"
        });

        return privateKey;
      }
    } catch (e) {
      console.log("Cannot get privateKey.");
    }
  };

  useEffect(() => {
    setOpenModal1(openModal);
    if (openModal) {
      getPrivateKey().then((res) => {
        setPrivateKey(res as string);
      });
    }
  }, [openModal]);

  return (
    <MuiModalWrapper
      className="balancemodal"
      open={openModal1}
      onClose={toggleOpen}
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
        <Box className="title_stack" sx={{ marginBottom: "12px" }}>
          <Typography variant="h2">Get Your Key!</Typography>
          {/* <Typography variant="body1">
            Verify OTP to reveal your private key
          </Typography> */}
        </Box>
        <Stack
          spacing={showTimeout ? 1 : 2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Typography variant="body1">
            <InputFieldCommon
              placeholder="Enter your OTP here"
              onChange={(e) => {
                setOtpValue(e.target.value);
              }}
              // value={otpValue}
              value={addElipsisBetweenLength(privateKey, 15, 16)}
              disabled={!showTimeout}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      //   disabled={!isLinkCreated}
                      disableRipple
                      onClick={verifyOTP}
                    >
                      <CopyFileIcon />
                      {/* <TelegramIconSocial /> */}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Typography>
          {showTimeout ? (
            <Countdown
              // date={Date.now() + 10000}
              date={timer}
              onComplete={() => {
                setDisableBtn(false);
                setShowTimeOut(false);
                setOtpValue("");
              }}
              renderer={(props) => {
                return (
                  <Box className="rgt_block">
                    <Typography variant="body1">
                      {getTimerText(props.minutes)}:
                      {getTimerText(props.seconds)}
                    </Typography>
                  </Box>
                );
              }}
            />
          ) : //   <Typography variant="body1">02:59</Typography>

          null}
          {/* <CustomButtonPrimary
            variant="contained"
            color="primary"
            disabled={disableBtn}
            onClick={requestOTP}
          >
            Send OTP
          </CustomButtonPrimary> */}
        </Stack>
      </MetMaskWrapper>
    </MuiModalWrapper>
  );
};

export default EmailOTPModal;
