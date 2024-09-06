/* eslint-disable react/no-array-index-key */
import StepperSec from "@/components/StepperSec/StepperSec";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const userSelector = useAppSelector((state) => state.userSlice);
  // useEffect(() => {
  //   if (userSelector.userData?.isAffiliateManager) {
  //     router.push("/referral-program-link-manager");
  //   }
  //   // first
  //   // return () => {
  //   //   second
  //   // }
  // }, [userSelector.userData?.isAffiliateManager]);

  return (
    <DashboardWrapper>
      <StepperSec />
    </DashboardWrapper>
  );
}
