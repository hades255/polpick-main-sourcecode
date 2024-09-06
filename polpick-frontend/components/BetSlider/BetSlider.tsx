/* eslint-disable react/no-unstable-nested-components */
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { BetSliderWrapper } from "@/styles/StyledComponents/BetSliderWrapper";
import { Box, Button, Slider, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface BetSliderInterface {
  // eslint-disable-next-line no-unused-vars, unused-imports/no-unused-vars
  selectBetAmt: (amt: string) => void;
}
const BetSlider = ({ selectBetAmt }: BetSliderInterface) => {
  const router = useRouter();
  const smallBets = [
    { value: 5 },
    { value: 10 },
    { value: 15 },
    { value: 20 },
    { value: 25 },
    { value: 50 },
    { value: 100 },
    { value: 200 }
  ];
  const largeBets = [
    { value: 25 },
    { value: 50 },
    { value: 75 },
    { value: 100 },
    { value: 250 },
    { value: 350 },
    { value: 500 }
  ];

  const [value, setValue] = useState<number>(10);

  const incrCount = () => {
    if (router.query?.game === "30") {
      // setValue(50);
      const currentValIndex = largeBets?.findIndex((s) => s.value === value);
      if (currentValIndex < largeBets.length - 1) {
        setValue(largeBets[currentValIndex + 1]?.value);
      }
    } else {
      // setValue(10);
      const currentValIndex = smallBets?.findIndex((s) => s.value === value);
      if (currentValIndex < smallBets.length - 1) {
        setValue(smallBets[currentValIndex + 1]?.value);
      }
    }
    // setValue((data) => data + 1);
  };

  const decrCount = () => {
    if (router.query?.game === "30") {
      // setValue(50);
      const currentValIndex = largeBets?.findIndex((s) => s.value === value);
      if (currentValIndex > 0) {
        setValue(largeBets[currentValIndex - 1]?.value);
      }
    } else {
      // setValue(10);
      const currentValIndex = smallBets?.findIndex((s) => s.value === value);
      if (currentValIndex > 0) {
        setValue(smallBets[currentValIndex - 1]?.value);
      }
    }
    // if (value > 0) {
    //   setValue((data) => data - 1);
    // }
  };
  //[5,10,15,25,50,100,200]
  useEffect(() => {
    selectBetAmt(value.toString());
  }, [value]);

  useEffect(() => {
    if (router.query?.game === "30") {
      setValue(50);
    } else {
      setValue(25);
    }
  }, [router.query?.game]);

  const timerSelector = useAppSelector((state) => state.timerSlice);

  const isMiningStage = () => {
    return (
      timerSelector?.currentGameStatus?.phase === "MiningStart" ||
      timerSelector?.currentGameStatus?.phase === "MiningEnd"
    );
  };

  return (
    <BetSliderWrapper>
      <Stack direction="row" alignItems="center">
        <Box className={`number_btn ${isMiningStage() ? "disabled" : ""}`}>
          <Button onClick={decrCount}>-</Button>
          <Typography>${value}</Typography>
          <Button onClick={incrCount}>+</Button>
        </Box>
        <Box className="number_slider">
          <Slider
            onChange={(_, value) => {
              Array.isArray(value) ? setValue(value[0]) : setValue(value);
            }}
            disabled={isMiningStage()}
            valueLabelDisplay="on"
            value={value}
            aria-label="Default"
            marks={router.query?.game === "30" ? largeBets : smallBets}
            // min={0}
            // max={250}
            step={null}
            min={
              router.query?.game === "30"
                ? largeBets[0]?.value
                : smallBets[0]?.value
            }
            max={
              router.query?.game === "30"
                ? largeBets.at(-1)?.value
                : smallBets.at(-1)?.value
            }
            // components={{
            //   Thumb: (props) => {
            //     // console.log(props,"props")
            //     return (
            //       <IconButton {...props}>
            //         <AddIcon />
            //       </IconButton>
            //     );
            //   }
            // }}
            // slotProps={{
            //   thumb: (props) => {
            //     return (
            //       <IconButton {...props}>
            //         <AddIcon />
            //       </IconButton>
            //     );
            //   }
            // }}
            valueLabelFormat={(value: number) => (
              <>
                <Typography>Your Bet</Typography>
                <Typography variant="h6">${value}</Typography>
              </>
            )}
          />
        </Box>
      </Stack>
    </BetSliderWrapper>
  );
};

export default BetSlider;
