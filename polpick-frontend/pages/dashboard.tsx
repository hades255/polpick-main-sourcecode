/* eslint-disable react/no-array-index-key */
import CommonTabs from "@/components/CommonTabs/CommonTabs";

import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";

export default function Index() {
  const buttonList = [
    "Dashboard",
    "FAQ",
    "Link Manager"
    // "Marketing materials" // turned off
  ]; // "Earning Report"

  return (
    <DashboardWrapper>
      <CommonTabs buttonList={buttonList} />
    </DashboardWrapper>
  );
}
