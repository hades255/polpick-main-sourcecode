import { useAppSelector } from "@/hooks/redux/useAppSelector";
import assest from "@/json/assest";
import { MetMaskWrapper } from "@/styles/StyledComponents/MetMaskWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Image from "next/image";

interface WalletModalPropType {
  open: boolean;
  handleModalClose: (action: "redirect" | "none") => void;
}
const LowBalance = ({ open, handleModalClose }: WalletModalPropType) => {
  const walletSelector = useAppSelector((state) => state.walletSlice);
  return (
    <MuiModalWrapper
      className="balancemodal"
      open={open}
      onClose={() => {
        handleModalClose("none");
      }}
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
          <Typography variant="h2">
            Your balance is {walletSelector.usdBalance.toFixed(2)}
          </Typography>
        </Box>

        <Box className="meta_mask_body">
          <Box className="footer_Sec">
            <Stack direction="row" justifyContent="center">
              <CustomButtonPrimary
                variant="contained"
                color="primary"
                onClick={() => {
                  handleModalClose("redirect");
                }}
              >
                Top up your balance
              </CustomButtonPrimary>
            </Stack>
          </Box>
        </Box>
      </MetMaskWrapper>
    </MuiModalWrapper>
  );
};

export default LowBalance;
