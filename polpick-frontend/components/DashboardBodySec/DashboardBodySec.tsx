/* eslint-disable react/no-array-index-key */
import { getAffliateStats } from "@/api/functions/game.api";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import assest from "@/json/assest";
import { DashboardBodySecWrapper } from "@/styles/StyledComponents/DashboardBodySecWrapper";
import CryptoCoinOrange from "@/ui/Icons/CryptoCoinOrange";
import CryptoIconStyle2 from "@/ui/Icons/CryptoIconStyle2";
import Grid from "@mui/material/Grid";
import { useQuery } from "@tanstack/react-query";
import CommonHeader from "../CommonHeader/CommonHeader";
import DashboardChartSec from "../DashboardChartSec/DashboardChartSec";
import EachCommonBox from "../EachCommonBox/EachCommonBox";
import { EachTierProps } from "../EachTierBlock/EachTierBlock";
// import LineChartDashed from "../LineChart/LinechartDashed";

const tierList: EachTierProps[] = [
  {
    currentNumber: 23.05,
    totalNumber: 66.024,
    themeColors: "green"
  },
  {
    currentNumber: 23.05,
    totalNumber: 66.024,
    themeColors: "red"
  },
  {
    currentNumber: 23.05,
    totalNumber: 66.024,
    themeColors: "yellow"
  }
];

const DashboardBodySec = () => {
  const walletSelector = useAppSelector((state) => state.walletSlice);
  const { data: affiliateStats } = useQuery({
    queryKey: ["affliateStats", walletSelector.wallet],
    enabled: !!walletSelector.wallet,
    queryFn: () => getAffliateStats({ walletId: walletSelector.wallet })
  });
  // console.log("affiliateStats", affiliateStats);

  return (
    <DashboardBodySecWrapper>
      <CommonHeader
        title="Referral Program Dashboard"
        sx={{ display: { sm: "block", xs: "none" } }}
      />
      <Grid container spacing={{ md: 5, xs: 2 }}>
        <Grid item lg={6} xs={12}>
          <EachCommonBox
            count={
              Number(affiliateStats?.data?.todays_earnings?.toFixed(8)) || 0
            }
            icon={assest?.referal_icon1}
            title="Earned Today"
            cryptoIcon={<CryptoIconStyle2 />}
          />
        </Grid>
        <Grid item lg={6} xs={12}>
          <EachCommonBox
            count={
              Number(affiliateStats?.data?.total_earnings?.toFixed(8)) || 0
            }
            icon={assest?.referal_icon2}
            title="Total Earnings (Paid)"
            cryptoIcon={<CryptoCoinOrange />}
            isReverse
          />
        </Grid>
        <Grid item xs={12}>
          <DashboardChartSec />
        </Grid>
        {/* {tierList?.map((data, index) => (
          <Grid item lg={4} xs={12} key={index}>
            <EachTierBlock {...data} indexNumber={index + 1} />
          </Grid>
        ))} */}
      </Grid>
    </DashboardBodySecWrapper>
  );
};

export default DashboardBodySec;
