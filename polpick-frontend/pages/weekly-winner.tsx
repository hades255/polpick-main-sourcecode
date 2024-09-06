// import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
// import { Box, BoxProps, Grid, Typography } from "@mui/material";
// /* eslint-disable react/no-array-index-key */
// import { getTopWinnersByRange } from "@/api/functions/game.api";
// // import WeeklyWinnerHeader from "@/components/WeeklyWinnerHeader/WeeklyWinnerHeader";
// import assest from "@/json/assest";
// import { addElipsisBetweenLength } from "@/lib/functions/_helpers.lib";
// import { WinnerBodyContent } from "@/styles/StyledComponents/WinnerBodyContent";
// import { WinnerEachCardWrapper } from "@/styles/StyledComponents/WinnerEachCardWrapper";
// import CryptoChainIcon from "@/ui/Icons/CryptoChainIcon";
// import { useQuery } from "@tanstack/react-query";
// import moment from "moment";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// import React from "react";

// const WeeklyWinnerHeader = dynamic(
//   () => import("@/components/WeeklyWinnerHeader/WeeklyWinnerHeader"),
//   { ssr: false }
// );

// interface CardProps {
//   crownIcon: string;
//   frame: string;
//   avatar: string;
//   avatarName?: string;
//   description: string;
//   point: number;
//   flagIcon: string;
//   indexNumber: number;
// }

// export const WinnerEachCard: React.FC<CardProps & BoxProps> = ({
//   crownIcon,
//   avatar,
//   description,
//   point,
//   flagIcon,
//   indexNumber,
//   avatarName,
//   frame,
//   ...others
// }) => {
//   return (
//     <WinnerEachCardWrapper indexNumber={indexNumber} {...others}>
//       <Box className="avatarwrap">
//         <Image
//           src={assest?.winner_backdrop_image}
//           alt="winner_backdrop_image"
//           className="winner_backdrop_image"
//           width={258}
//           height={258}
//         />

//         <Image
//           className="winner_frame"
//           src={frame}
//           alt="frame"
//           width={363}
//           height={402}
//         />
//         <i className="crown_icon">
//           <Typography variant="caption">{indexNumber}</Typography>
//           <Image src={crownIcon} alt="crown icon" width={45} height={40} />
//         </i>
//         {avatar ? (
//           <figure className="avatar_block">
//             <Image src={avatar} alt="avatr icon" width={100} height={100} />
//             <i className="flag_icon">
//               <Image src={flagIcon} alt="flag icon" width={25} height={25} />
//             </i>
//           </figure>
//         ) : (
//           <figure className="avatar_block avatar_block_solid ">
//             <Typography>{avatarName}</Typography>
//             <i className="flag_icon">
//               <Image src={flagIcon} alt="flag icon" width={25} height={25} />
//             </i>
//           </figure>
//         )}
//         <Typography>{description}</Typography>
//       </Box>
//       <Typography variant="h3">
//         <i>
//           <CryptoChainIcon />
//         </i>
//         {point}
//       </Typography>
//     </WinnerEachCardWrapper>
//   );
// };

// const Index = () => {
//   // const [startDate, setStartDate] = useState<number>(
//   //   moment().subtract(1, "week").unix()
//   // );

//   // const [endDate, setEndDate] = useState<number>(moment().unix());
//   const startDate: number = moment().subtract(1, "week").unix();
//   const endDate: number = moment().unix();

//   const {
//     data: topWinnersData
//     // refetch: refetchTopWinners,
//     // isLoading: isFetchingNews
//   } = useQuery({
//     queryKey: ["top_winner_by_range"], //, startDate,endDate
//     queryFn: () =>
//       getTopWinnersByRange({ startofweek: startDate, endofweek: endDate })
//   });
//   // console.log("topWinnersData", topWinnersData);
//   return (
//     <DashboardWrapper>
//       <WeeklyWinnerHeader title="Weekly Winners" />
//       <WinnerBodyContent>
//         <Typography variant="h2" className="weeklysubtitle">
//           Weekly Winners
//         </Typography>
//         <Grid container spacing={0}>
//           {topWinnersData?.data.first ? (
//             <Grid item md={4} xs={12}>
//               <WinnerEachCard
//                 frame={assest.weeklysilver}
//                 crownIcon={assest?.winner_two_crown}
//                 avatar={topWinnersData?.data.first.avatarUrl}
//                 description={
//                   topWinnersData?.data?.first?.walletAddress
//                     ? addElipsisBetweenLength(
//                         topWinnersData?.data?.first?.walletAddress,
//                         8,
//                         2
//                       )
//                     : ""
//                 }
//                 point={Number(topWinnersData?.data.first.prize)}
//                 flagIcon={assest?.winnerflag1}
//                 indexNumber={2}
//               />
//             </Grid>
//           ) : null}
//           {topWinnersData?.data.second ? (
//             <Grid item md={4} xs={12}>
//               <WinnerEachCard
//                 frame={assest.weeklygold}
//                 crownIcon={assest?.winner_one_crown}
//                 avatar={topWinnersData?.data.second.avatarUrl}
//                 description={
//                   topWinnersData?.data?.second?.walletAddress
//                     ? addElipsisBetweenLength(
//                         topWinnersData?.data?.second?.walletAddress,
//                         8,
//                         2
//                       )
//                     : ""
//                 }
//                 point={Number(topWinnersData?.data.second.prize)}
//                 flagIcon={assest?.winnerflag2}
//                 indexNumber={1}
//               />
//             </Grid>
//           ) : null}
//           {topWinnersData?.data.third ? (
//             <Grid item md={4} xs={12}>
//               <WinnerEachCard
//                 frame={assest.weeklybronze}
//                 crownIcon={assest?.winner_three_crown}
//                 avatar={topWinnersData?.data.third.avatarUrl}
//                 description={
//                   topWinnersData?.data?.third?.walletAddress
//                     ? addElipsisBetweenLength(
//                         topWinnersData?.data?.third?.walletAddress,
//                         8,
//                         2
//                       )
//                     : ""
//                 }
//                 point={Number(topWinnersData?.data.third.prize)}
//                 flagIcon={assest?.winnerflag3}
//                 indexNumber={3}
//                 avatarName="AF"
//               />
//             </Grid>
//           ) : null}
//         </Grid>
//       </WinnerBodyContent>
//     </DashboardWrapper>
//   );
// };

// export default Index;

const Index = () => {
  return <div>weekly-winner</div>;
};

export default Index;
