// /* eslint-disable react/no-array-index-key */
// import BetPointSec from "@/components/BetPointSec/BetPointSec";
// import CupSec from "@/components/CupSec/CupSec";
// import GraphSec from "@/components/GraphSec/GraphSec";
// import WinningPoolCard from "@/components/WinningPoolCard/WinningPoolCard";
// import YourBetCard from "@/components/YouBet/YourBetCard";
// import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
// import { Box, Grid, Theme, Typography, useMediaQuery } from "@mui/material";

// const Index = () => {
//   const isXsScreen = useMediaQuery((theme: Theme) =>
//     theme.breakpoints.down("md")
//   );
//   return (
//     <DashboardWrapper>
//       <Box className="grap_sec">
//         <GraphSec isProgress={false}>
//           <Typography variant="h4">Distributing</Typography>
//           <Typography variant="h4">Payouts</Typography>
//         </GraphSec>
//       </Box>
//       <Box className="pool-card-sec">
//         <Grid container spacing={3}>
//           <Grid item lg={4.5} xs={6}>
//             <WinningPoolCard
//               mainTitle="Up Pool"
//               result="win"
//               numberOfPlayers={11}
//               poolAmount={1200}
//             />
//           </Grid>
//           <Grid item lg={3} sx={{ display: { xs: "none", md: "block" } }}>
//             <YourBetCard selectBetAmt={() => {}} />
//           </Grid>
//           <Grid item lg={4.5} xs={6}>
//             <WinningPoolCard
//               mainTitle="Down Pool"
//               result="lose"
//               numberOfPlayers={13}
//               poolAmount={0}
//             />
//           </Grid>
//         </Grid>
//       </Box>

//       {/* <Box className="poolBoxs" sx={{ display: { xs: "block", md: "none" } }}>
//         <Grid container spacing={2.5}>
//           {upDownCard.map((item, index) => (
//             <Grid item xs={6} key={index}>
//               <MobilePoolBlock {...item} />
//             </Grid>
//           ))}
//         </Grid>
//       </Box> */}

//       <Box sx={{ display: { xs: "block", md: "none" } }}>
//         <BetPointSec />
//       </Box>
//       <Box sx={{ display: { xs: "block", md: "none", paddingBottom: "20px" } }}>
//         <CupSec />
//       </Box>
//       {/* {isXsScreen ? <JackPotMobileSec /> : <JackPortHomeMain />} */}
//     </DashboardWrapper>
//   );
// };

// export default Index;

const winning = () => {
  return <div>winning</div>;
};

export default winning;
