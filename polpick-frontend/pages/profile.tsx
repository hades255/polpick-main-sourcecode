/* eslint-disable react/no-array-index-key */
import ProfileSec from "@/components/ProfileSec/ProfileSec";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";

export default function Index() {
  return (
    <DashboardWrapper headerTitle="">
      <ProfileSec />
    </DashboardWrapper>
  );
}
