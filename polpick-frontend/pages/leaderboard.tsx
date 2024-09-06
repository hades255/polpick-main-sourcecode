/* eslint-disable react/no-array-index-key */

import { CustomTabPanel } from "@/components/CommonTabs/CommonTabs";
import HighRollers from "@/components/HighRollers/HighRollers";
import { a11yProps } from "@/components/RightUserSec/RightUserSec";
import WinRatio from "@/components/WinRatio/WinRatio";
import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

export default function Index() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <DashboardWrapper headerTitle="">
      <Box className="cmn_tab cmn_tab_page">
        <Box className="tab_hdr">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="High Rollers" {...a11yProps(0)} />
            <Tab label="Win Ratio" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <HighRollers />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <WinRatio />
        </CustomTabPanel>
      </Box>
    </DashboardWrapper>
  );
}
