import { useAppSelector } from "@/hooks/redux/useAppSelector";
import useUserBetDetails from "@/hooks/utils/useUserBetDetails";
import { PoolCardWrapper } from "@/styles/StyledComponents/PoolCardStyled";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import UsersIcon from "@/ui/Icons/UsersIcon";
import { Box, BoxProps, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

interface PoolcardProps extends BoxProps {
  poolName?: string;
  countPool?: string;
  maticAmount?: string;
  buttonTxt?: string;
  children?: React.ReactNode;
  cardBgColor?: boolean;
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  makeTrade: (type: "UP" | "DOWN") => void;
  tradeType: "UP" | "DOWN";
  btnIcon: React.ReactNode;
  handelClick?: () => void;
}

const PoolCard: React.FC<PoolcardProps & BoxProps> = ({
  poolName,
  countPool,
  maticAmount,
  buttonTxt,
  children,
  cardBgColor,
  btnIcon,
  tradeType,
  makeTrade,
  handelClick = () => {},
  ...props
}) => {
  const timerSelector = useAppSelector((state) => state.timerSlice);
  const tradeSelector = useAppSelector((state) => state.tradeSlice);
  const account = useAccount();
  const { userBet } = useUserBetDetails(account, tradeSelector);

  const isMiningStage = () => {
    return (
      timerSelector?.currentGameStatus?.phase === "MiningStart" ||
      timerSelector?.currentGameStatus?.phase === "MiningEnd"
    );
  };
  return (
    <PoolCardWrapper {...props} cardBgColor={cardBgColor}>
      <Chip label={`$ ${maticAmount}`} />
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap"
        className="card-head"
      >
        <Typography variant="h3">{poolName}</Typography>
        <UsersIcon />
        <Typography variant="caption" className="cnt-pl">
          {countPool}
        </Typography>
      </Stack>
      {children}
      <Box className="btn-overlay">
        <CustomButtonPrimary
          variant="contained"
          color="primary"
          fullWidth
          className="pl-btn"
          disabled={isMiningStage()}
          onClick={() => {
            if (!userBet) {
              makeTrade(tradeType);
            } else {
              toast.info("You have already placed a bet");
            }
            if (handelClick !== undefined) {
              handelClick();
            }
          }}
        >
          {btnIcon}
          <Typography variant="caption">{buttonTxt}</Typography>
        </CustomButtonPrimary>
      </Box>
    </PoolCardWrapper>
  );
};

export default PoolCard;
