/* eslint-disable react/no-array-index-key */
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { setAffilateTabValue } from "@/reduxtoolkit/slices/affiliate.slice";
import { CustomTabsWrapper } from "@/styles/StyledComponents/CustomTabsWrapper";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import * as React from "react";
import DashboardBodySec from "../DashboardBodySec/DashboardBodySec";
import FAQSec from "../FAQSec/FAQSec";
import MarketingMaterial from "../MarketingMaterial/MarketingMaterial";
import ReferralProgramLinkManager from "../ReferralProgramLinkManager/ReferralProgramLinkManager";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

interface BasicTabProps {
  buttonList: string[];
  children?: React.ReactNode;
}

const CommonTabs: React.FC<BasicTabProps> = ({ buttonList }) => {
  const dispatch = useAppDispatch();
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    dispatch(setAffilateTabValue(newValue));
  };

  const { tab_id } = useAppSelector((s) => s.affiliateSlice);

  React.useEffect(() => {
    if (tab_id >= 0) {
      setTabValue(tab_id);
    }
  }, [tab_id]);

  return (
    <Box sx={{ width: "100%" }}>
      <CustomTabsWrapper
        value={tabValue}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        {buttonList?.map((item, index) => (
          <Tab label={item} {...a11yProps(index)} key={index} />
        ))}
      </CustomTabsWrapper>
      <Box className="tab_content">
        <CustomTabPanel value={tabValue} index={0}>
          <DashboardBodySec />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <FAQSec isSearchField={false} isHeader={false} noBlur>
            <Box className="faq_sub_heading">
              <Typography variant="h2">FAQ</Typography>{" "}
            </Box>
          </FAQSec>
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          <ReferralProgramLinkManager />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={3}>
          <MarketingMaterial />
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default CommonTabs;
