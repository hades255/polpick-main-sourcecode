import animationData from "@/json/lottie/404.json";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import styles from "@/styles/pages/404.module.scss";
import { Box, Container, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";

const Lottie = dynamic(() => import("lottie-react"));
// const Wrapper = dynamic(() => import("@/layout/wrapper/Wrapper"));

const Index = () => (
  <DashboardWrapper isChatShow={false}>
    <Container fixed>
      <Box className={styles.inner}>
        <Typography variant="h1">Page not found</Typography>
        <Lottie
          className="errorPage_image"
          animationData={animationData}
          loop
          style={{
            height: 300,
            width: 300
          }}
          height={300}
          width={300}
        />
        <Link href="/">Back to home </Link>
      </Box>
    </Container>
  </DashboardWrapper>
);

export default Index;
