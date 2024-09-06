/* eslint-disable react/no-unstable-nested-components */
import { MetMaskWrapper } from "@/styles/StyledComponents/MetMaskWrapper";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import { BoxProps, Tab, Tabs, Theme } from "@mui/material";
import { Box, useMediaQuery } from "@mui/system";

import { useEffect, useState } from "react";
import { CustomTabPanel } from "../CommonTabs/CommonTabs";
import PaymentModalBuy from "./PaymentModalBuy";
import PaymentModalExchange from "./PaymentModalExchange";

interface PaymentModalInterface {
  open: boolean;
  closeCallBack: () => void;
  modalTabValue: number;
}
const PaymentModal: React.FC<PaymentModalInterface & BoxProps> = ({
  open,
  closeCallBack,
  modalTabValue,
  ...props
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (modalTabValue) {
      setValue(modalTabValue);
    }
  }, [modalTabValue]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // setConvertedAmt(0);
    // setExchangeAmt("0");
    // setPopUpOpened(false);
  };

  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(true);

  const onCloseCallBack = () => {
    // setConvertedAmt(0);
    // setExchangeAmt("0");
    // setPopUpOpened(false);
    setAgreedToTerms(true);
    closeCallBack();
  };

  const isXsScreen = useMediaQuery((data: Theme) =>
    data?.breakpoints?.down("md")
  );

  return (
    <MuiModalWrapper
      className="balancemodal"
      open={open}
      onClose={onCloseCallBack}
      modalBodyClass="currency_modal"
      PaperProps={{
        style: {
          minWidth: isXsScreen ? "285px" : "510px"
        }
      }}
    >
      <MetMaskWrapper>
        <Box className="currency_modal_tab">
          <Box
            sx={{ borderBottom: 1, borderColor: "rgba(103, 120, 177, 0.15)" }}
          >
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Exchange" />
              <Tab label="Buy" />
            </Tabs>
          </Box>
        </Box>
        <Box className="meta_mask_body">
          <CustomTabPanel value={value} index={0}>
            <PaymentModalExchange
            // selectValue={selectValue}
            // handleSelectChange={handleSelectChange}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <PaymentModalBuy
            // selectedCountry={selectedCountry}
            // countryList={countryList?.data || []}
            // convertedAmt={convertedAmt}
            // selectCountry={selectCountry}
            // debouncedApiCall={debouncedApiCall}
            // selectValue={selectValue}
            // handleSelectChange={handleSelectChange}
            />
          </CustomTabPanel>
        </Box>
      </MetMaskWrapper>
    </MuiModalWrapper>
  );
};

export default PaymentModal;
