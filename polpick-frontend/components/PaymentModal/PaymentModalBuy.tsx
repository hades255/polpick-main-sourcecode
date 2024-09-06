/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */

import {
  createChangellyPayment,
  getChangellyCountryList
} from "@/api/functions/changelly.api";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import {
  CountryInterface,
  iChangellyPaymentPayload
} from "@/interface/changelly.interfaces";
import { createDebouncedFunction, getFlag } from "@/lib/functions/_helpers.lib";
import { CustomFormControlLabel } from "@/styles/StyledComponents/CommonFormSecWrapper";
import { SwapStack } from "@/styles/StyledComponents/MetMaskWrapper";
import { primaryColors } from "@/themes/_muiPalette";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import DropDownIcon from "@/ui/Icons/DropdownIcon";
import RadioCheckedIcon from "@/ui/Icons/RadioCheckedIcon";
import RadioUncheckedIcon from "@/ui/Icons/RadioUncheckedIcon";
import {
  Box,
  BoxProps,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  // SelectChangeEvent,
  TextField,
  Typography,
  styled
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
/* eslint-disable react/no-unstable-nested-components */

import useChangellyOffers from "@/hooks/react-query/useChangellyOffers";
import assest from "@/json/assest";
import { CoinBaseCurrencyRates } from "@/reduxtoolkit/interfaces/interfaces";

const PaymentModalBuyWrapper = styled(Box)`
  .transaction_details {
    border: 1.5px solid rgba(103, 120, 177, 0.2);
    border-radius: 20px;
    padding: 30px 20px;
    padding-bottom: 35px;
    h3 {
      color: ${primaryColors.textPrimaryColor};
      font-size: 22px;
      font-weight: 800;
    }
    ul {
      margin-top: 15px;
      li {
        margin-bottom: 22px;
        display: block;
        padding: 0;
        .title {
          color: ${primaryColors.color8f9bbf};
          font-size: 12px;
          margin-bottom: 5px;
        }
        .value {
          color: ${primaryColors.textPrimaryColor};
          font-size: 15px;
          font-weight: 700;
        }
      }
    }
  }
  .button_holder {
    button {
      min-width: 470px;
      @media (max-width: 899px) {
        min-width: 100%;
      }
    }
  }

  .radios {
    width: 47% !important;
    margin-right: 10px !important;
    margin-top: 12px !important;
    @media (max-width: 899px) {
      width: 100% !important;
    }
    .MuiFormControlLabel-label {
      flex-direction: row !important;
      padding: 10px !important;
      p {
        margin-left: auto;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
  .payment_offer {
    margin-top: 16px;
    .offer_heading {
      font-size: 22px;
      font-weight: 800;
    }
  }
`;

interface PaymentModalBuyProps {
  // selectedCountry: CountryInterface | undefined;
  // countryList: CountryInterface[] | [];
  // convertedAmt: number;
  // selectCountry: (data: CountryInterface) => void;
  // debouncedApiCall: any;
  // selectValue: string;
  // handleSelectChange: (event: SelectChangeEvent | any) => void;
}

const PaymentModalBuy: React.FC<PaymentModalBuyProps & BoxProps> = ({
  // selectedCountry,
  // countryList,
  // convertedAmt,
  // selectCountry,
  // debouncedApiCall,
  // selectValue,
  // handleSelectChange,
  ...others
}) => {
  const walletSelector = useAppSelector((state) => state.walletSlice);
  const userSelector = useAppSelector((state) => state.userSlice);
  const createPaymentPopUpforDesktop = (redirectUrl: string) => {
    const popupWindow = window.open(
      redirectUrl,
      "_blank",
      "width=600,height=800"
    );

    if (popupWindow) {
      let popupInterval: ReturnType<typeof setInterval> | undefined = undefined;

      const checkPopupClosed = () => {
        if (popupWindow.closed) {
          // console.log("popup closed");
          clearInterval(popupInterval);
        }
      };

      // Start polling to check if the popup window is closed
      popupInterval = setInterval(checkPopupClosed, 500);

      // Optional: Add event listener for unload event (though it's less reliable for detecting window closure)
      popupWindow.addEventListener("unload", () => {
        if (popupWindow.closed) {
          // console.log("popup closed (unload event)"); // todo disable btn click when popup opens
          // setPopUpOpened(false);
          clearInterval(popupInterval);
        }
      });
    }
  };

  const { data: countryList, isLoading: isCountryListLoading } = useQuery({
    queryFn: getChangellyCountryList,
    queryKey: ["getChangellyCountryList"]
  });

  const {
    mutate
    // isFetchingProviders: isCreatingUser,
    // isPending: isCreatingUser,
    // data: UserData,
  } = useMutation({
    mutationFn: createChangellyPayment,
    onSuccess: (data) => {
      if (data?.data?.redirectUrl) {
        // setPopUpOpened(true);
        createPaymentPopUpforDesktop(data?.data?.redirectUrl);
      }
    }
  });
  const [exchangeAmt, setExchangeAmt] = useState<string>("0");
  const [convertedAmt, setConvertedAmt] = useState<number>(0.0);
  const [selectValue, setSelectValue] = useState("10");
  const [coinbaseExchangeList, setCoinBaseExchangeList] =
    useState<CoinBaseCurrencyRates>();

  const [selectedCountry, setSelectedCountry] = useState<
    CountryInterface | undefined
  >(countryList?.data[0]);
  const [selectedProvider, setSelectedProvider] =
    useState<iChangellyPaymentPayload["providerCode"]>("banxa");
  const changellyProviders = ["moonpay", "banxa", "transak", "wert"];
  const {
    allOffers,
    isLoading: isFetchingProviders,
    error
  } = useChangellyOffers({
    exchangeAmt: Number(exchangeAmt),
    selectedCountry,
    providers: changellyProviders
  });

  const selectCountry = (data: CountryInterface) => {
    setSelectedCountry(data);
  };
  const generateChangellyPayLink = () => {
    // console.log("Clicked");

    if (
      walletSelector?.wallet &&
      userSelector?.userData?._id &&
      selectedCountry
    ) {
      // TODO
      // console.log("countryList", countryList);
      // console.log("selectedCountry", selectedCountry);
      // console.log("exchangeAmt", exchangeAmt);
      // if (allOffers?.length) {
      //   const _cProvider = allOffers?.find(
      //     (s) => s.data?.providerCode === selectedProvider
      //   );

      //   if (_cProvider?.data?.errorMessage) {
      //     if (_cProvider?.data?.errorType === "limits") {
      //       _cProvider?.data?.errorDetails?.length &&
      //         toast.error(
      //           `min. amount of exchange for ${selectedProvider} is $${_cProvider?.data?.errorDetails[0]?.value} `
      //         );
      //       return;
      //     }
      //   }
      // }

      if (exchangeAmt === "0") {
        toast.error("Please enter amount!");
        return;
      }

      const payload: iChangellyPaymentPayload = {
        externalUserId: userSelector.userData._id,
        externalOrderId: userSelector.userData._id + Date.now(), //any
        currencyFrom: selectedCountry?.currency,
        currencyTo: "ETH",
        amountFrom: exchangeAmt,
        country: selectedCountry.code,
        state: selectedCountry.code === "US" ? "LA" : "",
        // country: countryList?.data?.filter(
        //   (s) => s.currency === selectedCountry
        // )[0].code,
        // state: "", // TODO
        walletAddress: walletSelector.wallet,
        walletExtraId: walletSelector.wallet, // any
        paymentMethod: "card",
        // providerCode: "moonpay"
        providerCode: selectedProvider
      };

      mutate(payload);
    }
  };

  const getConvertedEth = async (value: string) => {
    if (value && selectedCountry) {
      setExchangeAmt(value);

      // await coinBaseExchangeRequest()
      //   .then((res) => {
      //     // const currencyCode = countryList?.data?.filter(
      //     //   (s) => s.currency === selectedCountry?.currency
      //     // )[0];
      //     const currencyCode = getCurrencycode();
      //     if (
      //       res &&
      //       Object.keys(res?.data?.data?.rates).length &&
      //       res?.data?.data?.rates[`${currencyCode?.currency}`]
      //     ) {
      //       setCoinBaseExchangeList(res?.data?.data);
      //       let convertedAMT =
      //         Number(value) /
      //         res?.data?.data?.rates[`${currencyCode?.currency}`];
      //       setConvertedAmt(convertedAMT);
      //     } else {
      //       setConvertedAmt(0);
      //       toast.error(
      //         "Price could not be fetched. Please Select a different currency"
      //       );
      //     }
      //   })
      //   .catch((error) => error);
    } else {
      setConvertedAmt(0);
    }
    //resetting default currency to usd
  };
  const debouncedApiCall = createDebouncedFunction(getConvertedEth, 1000);

  const handleSelectChange = (event: SelectChangeEvent | any) => {
    setSelectValue(event.target.value as string);
  };
  useEffect(() => {
    if (selectedCountry && exchangeAmt !== "0") {
      debouncedApiCall(exchangeAmt);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (countryList?.data?.length) {
      const _filtered = countryList?.data?.filter((s) => s.code === "US")[0];
      setSelectedCountry(_filtered);
    }
  }, [countryList?.data]);

  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(true);

  const onCloseCallBack = () => {
    setAgreedToTerms(true);
  };

  const getCurrencycode = () => {
    return countryList?.data?.filter(
      (s) => s.currency === selectedCountry?.currency
    )[0];
  };
  const getExchangeRate = () => {
    // const currencyCode = countryList?.data?.filter(
    //   (s) => s.currency === selectedCountry?.currency
    // )[0];

    const currencyCode = getCurrencycode();

    if (
      coinbaseExchangeList?.rates &&
      coinbaseExchangeList?.rates[`${currencyCode?.currency}`]
    ) {
      return Number(
        coinbaseExchangeList?.rates[`${currencyCode?.currency}`]
      ).toFixed(2);
      // setCoinBaseExchangeList(res?.data?.data);
    }
    return false;
  };
  const getConvertedAmount = (provider: string) => {
    if (allOffers?.length) {
      const _cProvider = allOffers?.find(
        (s) => s.data?.providerCode === provider
      );

      if (_cProvider?.data?.errorMessage) return false;

      if (_cProvider?.data?.paymentMethodOffer[0]?.amountExpectedTo) {
        return _cProvider?.data?.paymentMethodOffer[0]?.amountExpectedTo;
      } else {
        setConvertedAmt(0);
        return false;
      }
    }
    return false;
  };

  // const getConvertedAmount = (provider: string, suffix?: string) => {
  //   if (allOffers?.length) {
  //     const _cProvider = allOffers?.find(
  //       (s) => s.data?.providerCode === provider
  //     );

  //     if (_cProvider?.data?.errorMessage) {
  //       if (_cProvider?.data?.errorType === "limits")
  //         return _cProvider?.data?.errorDetails?.length
  //           ? `min. $${_cProvider?.data?.errorDetails[0]?.value} `
  //           : false;
  //       return false;
  //     }

  //     if (_cProvider?.data?.paymentMethodOffer[0]?.amountExpectedTo) {
  //       return suffix
  //         ? `${_cProvider?.data?.paymentMethodOffer[0]?.amountExpectedTo}${suffix}`
  //         : `${_cProvider?.data?.paymentMethodOffer[0]?.amountExpectedTo}`;
  //     } else {
  //       setConvertedAmt(0);
  //       return false;
  //     }
  //   }
  //   return false;
  // };

  const getProcessingFee = (provider: string) => {
    if (allOffers?.length) {
      const _cProvider = allOffers?.find(
        (s) => s?.data && s.data.providerCode === provider
      );

      if (_cProvider?.data?.errorMessage) return "N/A";

      if (_cProvider?.data?.paymentMethodOffer[0]?.fee) {
        return _cProvider?.data?.paymentMethodOffer[0]?.fee;
      } else {
        setConvertedAmt(0);
        return "N/A";
      }
    }
    return "N/A";
  };
  return (
    <PaymentModalBuyWrapper {...others}>
      <Grid container spacing={2}>
        <Grid item md={7.5} xs={12}>
          <Box>
            <SwapStack direction="row" alignItems="flex-end" flexWrap="wrap">
              <Box className="swap_left">
                <Typography>You send</Typography>
                <Box className="select_block">
                  <Select
                    displayEmpty
                    value={selectedCountry?.code || "USD"}
                    // onChange={selectCountry}
                    onChange={(e) => {
                      if (countryList?.data) {
                        const _cnt = countryList.data.filter(
                          (s) => s.code === e.target.value
                        )[0];
                        _cnt && selectCountry(_cnt);
                      }
                    }}
                    IconComponent={(props) => {
                      return (
                        <IconButton {...props}>
                          <DropDownIcon
                            IconColor={primaryColors?.textPrimaryColor}
                          />
                        </IconButton>
                      );
                    }}
                    MenuProps={{
                      PaperProps: {
                        className: "currencyMenu"
                      }
                    }}
                  >
                    {countryList?.data?.length
                      ? countryList?.data.map((_item) => (
                          <MenuItem value={_item.code} key={_item.currency}>
                            <i>
                              <Image
                                src={getFlag(_item.code) as string}
                                alt="currency_swap_flag"
                                width={30}
                                height={30}
                              />
                            </i>
                            {_item.code}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </Box>
              </Box>
              <Box className="swap_rgt">
                <TextField
                  type="number"
                  fullWidth
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => {
                    // getCovertedEth(e.target.value);
                    debouncedApiCall(e.target.value);
                  }}
                />
              </Box>
            </SwapStack>
            <SwapStack
              direction="row"
              alignItems="flex-end"
              flexWrap="wrap"
              sx={{ marginBottom: "10px" }}
            >
              <Box className="swap_left">
                <Typography>You get</Typography>
                <Box className="select_block">
                  <Select
                    displayEmpty
                    value={selectValue}
                    onChange={handleSelectChange}
                    disabled
                    IconComponent={(props) => {
                      return (
                        <IconButton {...props}>
                          <DropDownIcon
                            IconColor={primaryColors?.textPrimaryColor}
                            IconWidth="0"
                            IconHeight="0"
                          />
                        </IconButton>
                      );
                    }}
                    MenuProps={{
                      PaperProps: {
                        className: "currencyMenu"
                      }
                    }}
                  >
                    <MenuItem value={10}>
                      <i>
                        <Image
                          src="	https://cdn.changelly.com/icons-colored/eth.png"
                          // src={assest?.currency_swap_flag2}
                          alt="currency_swap_flag"
                          width={30}
                          height={30}
                        />
                      </i>
                      ETH
                    </MenuItem>
                  </Select>
                </Box>
              </Box>
              <Box className="swap_rgt">
                <TextField
                  placeholder="Enter amount"
                  // value="~1.8588693"
                  // value={expectedAmount()}
                  // value={`~${convertedAmt?.toFixed(5)}`}
                  value={
                    getConvertedAmount(selectedProvider || "")
                      ? getConvertedAmount(selectedProvider || "")
                      : "N/A"
                  }
                  fullWidth
                  disabled
                />
              </Box>
            </SwapStack>
            <Box className="payment_offer">
              <Typography className="offer_heading" variant="body1">
                Payment Offers
              </Typography>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="banxa"
                  value={selectedProvider}
                  name="radio-buttons-group"
                  onChange={(_, value) => {
                    setSelectedProvider(
                      value as iChangellyPaymentPayload["providerCode"]
                    );
                  }}
                >
                  <Box display="flex" flexDirection="row" flexWrap="wrap">
                    <FormControlLabel
                      value="banxa"
                      control={<Radio />}
                      className="radios"
                      label={
                        <>
                          <Image
                            src={assest.banxaIcon}
                            alt="banxa"
                            width={61}
                            height={10}
                          />
                          <Typography variant="body1">
                            {isFetchingProviders ? (
                              <> Loading...</>
                            ) : (
                              <>
                                {getConvertedAmount("banxa")
                                  ? `${getConvertedAmount("banxa")} ETH`
                                  : "not available"}
                              </>
                            )}
                            {/* {getConvertedAmount("banxa") !== "N/A"
                              ? `${getConvertedAmount("banxa")} ETH`
                              : getConvertedAmount("banxa")} */}
                          </Typography>
                        </>
                      }
                    />
                    {/* <FormControlLabel
                      value="simplex"
                      control={<Radio />}
                      className="radios"
                      label={
                        <>
                          <Image
                            src={assest.simplexIcon}
                            alt="simplex"
                            width={58}
                            height={21}
                          />
                          <Typography variant="body1">
                            {" "}
                            {isFetchingProviders ? (
                              <> Loading...</>
                            ) : (
                              <>
                                {getConvertedAmount("simplex")
                                  ? `${getConvertedAmount("simplex")} ETH`
                                  : "not available"}
                              </>
                            )}
                          </Typography>
                        </>
                      }
                    /> */}
                    <FormControlLabel
                      value="moonpay"
                      control={<Radio />}
                      className="radios"
                      label={
                        <>
                          <Image
                            src={assest.moonpayIcon}
                            alt="moonpay"
                            width={75}
                            height={20}
                          />
                          <Typography variant="body1">
                            {" "}
                            {isFetchingProviders ? (
                              <> Loading...</>
                            ) : (
                              <>
                                {getConvertedAmount("moonpay")
                                  ? `${getConvertedAmount("moonpay")} ETH`
                                  : "not available"}
                              </>
                            )}
                          </Typography>
                        </>
                      }
                    />
                    <FormControlLabel
                      value="wert"
                      control={<Radio />}
                      className="radios"
                      label={
                        <>
                          <Image
                            src={assest.wertIcon}
                            alt="wert"
                            height={13}
                            width={39}
                          />
                          <Typography variant="body1">
                            {isFetchingProviders ? (
                              <> Loading...</>
                            ) : (
                              <>
                                {getConvertedAmount("wert")
                                  ? `${getConvertedAmount("wert")} ETH`
                                  : "not available"}
                              </>
                            )}
                          </Typography>
                        </>
                      }
                    />
                    <FormControlLabel
                      value="transak"
                      control={<Radio />}
                      className="radios"
                      label={
                        <>
                          <Image
                            src={assest.transakIcon}
                            alt="transak"
                            height={16}
                            width={63}
                          />
                          <Typography variant="body1">
                            {isFetchingProviders ? (
                              <> Loading...</>
                            ) : (
                              <>
                                {getConvertedAmount("transak")
                                  ? `${getConvertedAmount("transak")} `
                                  : "not available"}
                              </>
                            )}
                          </Typography>
                        </>
                      }
                    />
                  </Box>
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Grid item md={4.5} xs={12}>
          <Box className="transaction_details">
            <Typography variant="h3">Transaction details</Typography>
            <List>
              <ListItem>
                <Typography variant="body1" className="title">
                  You Get
                </Typography>
                <Typography variant="body1" className="value">
                  {/* ~${convertedAmt?.toFixed(5)} */}~
                  {getConvertedAmount(selectedProvider || "")
                    ? getConvertedAmount(selectedProvider || "")
                    : "N/A"}
                </Typography>
              </ListItem>

              <ListItem>
                <Typography variant="body1" className="title">
                  Exchange rate
                </Typography>
                <Typography variant="body1" className="value">
                  1 ETH ~{" "}
                  {getExchangeRate()
                    ? getExchangeRate()
                    : walletSelector?.usd_price}{" "}
                  {getCurrencycode()?.currency}
                  {/* 67 424,42147 USD  */}
                </Typography>
              </ListItem>

              <ListItem>
                <Typography variant="body1" className="title">
                  Processing fee
                </Typography>
                <Typography variant="body1" className="value">
                  {isFetchingProviders ? (
                    <>Loading...</>
                  ) : (
                    <>
                      {getProcessingFee(selectedProvider || "") !== "N/A" ? (
                        <>
                          {Number(
                            getProcessingFee(selectedProvider || "")
                          ).toFixed(2)}{" "}
                          {getCurrencycode()?.currency}
                        </>
                      ) : (
                        <Typography>N/A</Typography>
                      )}
                    </>
                  )}
                </Typography>
              </ListItem>

              {/* <ListItem>
                <Typography variant="body1" className="title">
                  Network fee
                </Typography>
                <Typography variant="body1" className="value">
                  4 {getCurrencycode()?.currency}
                </Typography>
              </ListItem> */}
              <ListItem>
                <Typography variant="body1" className="title">
                  You send
                </Typography>
                <Typography variant="body1" className="value">
                  {exchangeAmt} {getCurrencycode()?.currency}
                </Typography>
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>

      <Box
        className="footer_Sec"
        sx={{ padding: "13px 20px 30px 20px !important" }}
      >
        <CustomFormControlLabel
          IconColor={primaryColors?.color4F80FF}
          mainTextColor={primaryColors?.textPrimaryColor}
          control={
            <Checkbox
              checked={agreedToTerms}
              icon={
                <RadioUncheckedIcon IconColor={primaryColors?.color4F80FF} />
              }
              checkedIcon={
                <RadioCheckedIcon IconColor={primaryColors?.color4F80FF} />
              }
              disableRipple
              onChange={(e) => {
                setAgreedToTerms(!agreedToTerms);
              }}
            />
          }
          label={
            <Typography>
              Agree with our{" "}
              <Typography variant="caption">Terms of Service</Typography> and
              out <Typography variant="caption"> Privacy Policy</Typography>
            </Typography>
          }
        />
        <Stack
          direction="row"
          justifyContent="center"
          className="button_holder"
        >
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            onClick={generateChangellyPayLink}
            disabled={!agreedToTerms}
          >
            Buy now
          </CustomButtonPrimary>
        </Stack>
      </Box>
    </PaymentModalBuyWrapper>
  );
};

export default PaymentModalBuy;
