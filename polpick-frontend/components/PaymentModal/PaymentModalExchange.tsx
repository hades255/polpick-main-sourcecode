/* eslint-disable react/no-unstable-nested-components */
import {
  createChangellyTransaction,
  getChangellyCurrencyAll,
  getChangellyExchangeAmount,
  getChangellyMinMaxExchangeAmount
} from "@/api/functions/changelly.api";
import { _coinList } from "@/config/constants";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { IGetCurrencyListResponse } from "@/interface/changelly.interfaces";
import assest from "@/json/assest";
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
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  styled
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const PaymentModalExchangeWrapper = styled(Box)`
  .innerwrap {
    position: relative;
  }
  .exchange_btn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 8;
    img {
      filter: drop-shadow(0px 4px 50px rgba(84, 130, 248, 0.3));
      backdrop-filter: blur(5px);
    }
  }
`;

interface PaymodalExchangeProps {
  // selectValue: string;
  // handleSelectChange: (event: SelectChangeEvent | any) => void;
}

const PaymentModalExchange: React.FC<PaymodalExchangeProps & BoxProps> = ({
  // selectValue,
  // handleSelectChange,

  ...others
}) => {
  const walletSelector = useAppSelector((state) => state.walletSlice);
  const [swap, setSwap] = useState(false);
  const [selectValue, setSelectValue] = useState("10");
  const [selectedFromCoin, SetSelectedFromCoin] = useState<string>("");
  const [exchangeAmt, setExchangeAmt] = useState<number | null>(null);
  const [estExchangeAmt, setEstExChangeAmt] = useState<number | null>(0);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(true);

  const handleSelectChange = (event: SelectChangeEvent | any) => {
    setSelectValue(event.target.value as string);
  };
  const handleSwap = () => {
    // setSwap((data) => !data);
  };

  const [showableCoinList, setShowableCoinList] = useState<
    IGetCurrencyListResponse["result"]
  >([]);

  const { data: changellyCurrencyList } = useQuery({
    queryFn: getChangellyCurrencyAll,
    queryKey: ["getChangellyCurrencyAll"]
  });

  const {
    mutate: fetchChangellyExchangeAmount
    // isLoading: isCreatingUser,
    // isPending: isCreatingUser,
    // data: UserData,
  } = useMutation({
    mutationFn: getChangellyExchangeAmount,
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data?.error?.message);
        return;
      }
      setEstExChangeAmt(
        Number(data?.result[0]?.amountTo) - Number(data?.result[0]?.networkFee)
      );
      // if (data?.data?.redirectUrl) {
      //   // setPopUpOpened(true);
      //   createPaymentPopUpforDesktop(data?.data?.redirectUrl);
      // }
    }
  });

  const {
    mutate: createTransaction
    // isLoading: isCreatingUser,
    // isPending: isCreatingUser,
    // data: UserData,
  } = useMutation({
    mutationFn: createChangellyTransaction,
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data?.error?.message);
        return;
      } else if (data?.result?.trackUrl) {
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;

        const popupWidth = 600;
        const popupHeight = 800;

        const left = screenWidth / 2 - popupWidth / 2;
        const top = screenHeight / 2 - popupHeight / 2;
        window.open(
          data.result.trackUrl,
          "_blank",
          "width=600,height=800,left=200,top=100"
        );
      }
      // if (data?.error) {
      //   toast.error(data?.error?.message);
      //   return;
      // }
      // setEstExChangeAmt(
      //   Number(data?.result[0]?.amountTo) - Number(data?.result[0]?.networkFee)
      // );
      // if (data?.data?.redirectUrl) {
      //   // setPopUpOpened(true);
      //   createPaymentPopUpforDesktop(data?.data?.redirectUrl);
      // }
    }
  });

  const {
    data: minExchangeLimit,
    isFetching: fetchingMinMaxExchangeAmt,
    isPending
  } = useQuery({
    queryKey: ["getChangellyMinMaxExchangeAmount", selectedFromCoin],
    queryFn: () =>
      getChangellyMinMaxExchangeAmount({
        params: [{ from: selectedFromCoin, to: "eth" }]
      }),
    refetchInterval: 3500,
    enabled:
      Boolean(changellyCurrencyList?.result?.length) && selectedFromCoin !== ""
  });

  const getExchangeAmount = (ticker: string, amount: string) => {
    if (
      Number(amount) >= Number(minExchangeLimit?.result[0].minAmountFloat) &&
      Number(amount) <= Number(minExchangeLimit?.result[0].maxAmountFloat)
    ) {
      fetchChangellyExchangeAmount({
        params: {
          from: ticker,
          to: "eth",
          amountFrom: amount
        }
      });
    } else {
      toast.error(
        `Amount must be between ${minExchangeLimit?.result[0].minAmountFloat} and ${minExchangeLimit?.result[0].maxAmountFloat}`
      );
    }
  };
  useEffect(() => {
    if (changellyCurrencyList?.result?.length) {
      const filteredCoins =
        changellyCurrencyList?.result?.filter(
          (s) => s.enabled && _coinList?.includes(s.ticker)
        ) || [];

      setShowableCoinList(filteredCoins);
      SetSelectedFromCoin(filteredCoins[0].ticker);
    }
  }, [changellyCurrencyList]);

  useEffect(() => {
    let timeoutId: any = undefined;

    if (exchangeAmt && selectedFromCoin && minExchangeLimit?.result) {
      timeoutId = setTimeout(() => {
        getExchangeAmount(selectedFromCoin, JSON.stringify(exchangeAmt));
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [exchangeAmt, selectedFromCoin]);

  const generateChangellyPayLink = () => {
    if ((walletSelector?.wallet, exchangeAmt)) {
      const payload = {
        params: {
          from: selectedFromCoin,
          to: "eth",
          address: walletSelector?.wallet,
          // extraId: "<<valid xrp extraId>>",
          amountFrom: JSON.stringify(exchangeAmt)
        }
      };
      createTransaction(payload);
    }
  };

  return (
    <PaymentModalExchangeWrapper {...others}>
      <Box className="innerwrap">
        <Button className="exchange_btn" onClick={handleSwap}>
          <Image
            src={assest?.exchange_icon}
            alt="exchange_icon"
            width={55}
            height={55}
          />
        </Button>
        <SwapStack direction="row" alignItems="flex-end" flexWrap="wrap">
          <Box className="swap_left">
            <Typography>You send</Typography>
            {swap ? (
              <Box className="select_block">
                <Select
                  displayEmpty
                  value={selectValue}
                  onChange={handleSelectChange}
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
                  <MenuItem value={10}>
                    <i>
                      <Image
                        src={assest?.currency_swap_flag1}
                        alt="currency_swap_flag"
                        width={30}
                        height={30}
                      />
                    </i>
                    USD
                  </MenuItem>
                  <MenuItem value={20}>
                    <i>
                      <Image
                        src={assest?.currency_swap_flag1}
                        alt="currency_swap_flag"
                        width={30}
                        height={30}
                      />
                    </i>
                    USD
                  </MenuItem>
                  <MenuItem value={30}>
                    <i>
                      <Image
                        src={assest?.currency_swap_flag1}
                        alt="currency_swap_flag"
                        width={30}
                        height={30}
                      />
                    </i>
                    USD
                  </MenuItem>
                </Select>
              </Box>
            ) : (
              <Box className="select_block">
                <Select
                  displayEmpty
                  value={selectedFromCoin}
                  // onChange={handleSelectChange}
                  onChange={(e) => {
                    SetSelectedFromCoin(e.target.value);
                    // getMinimumExchangeLimit(e.target.value);
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
                  {showableCoinList?.length
                    ? showableCoinList?.map((_curr, _) => (
                        <MenuItem value={_curr.ticker}>
                          <i>
                            <Image
                              src={_curr.image}
                              alt="currency_swap_flag"
                              width={30}
                              height={30}
                            />
                          </i>
                          {_curr.name}
                        </MenuItem>
                      ))
                    : null}
                  {/* <MenuItem value={10}>
                  <i>
                    <Image
                      src={assest?.currency_swap_flag2}
                      alt="currency_swap_flag"
                      width={30}
                      height={30}
                    />
                  </i>
                  BTC
                </MenuItem>
                <MenuItem value={20}>
                  <i>
                    <Image
                      src={assest?.currency_swap_flag2}
                      alt="currency_swap_flag"
                      width={30}
                      height={30}
                    />
                  </i>
                  BTC
                </MenuItem>
                <MenuItem value={30}>
                  <i>
                    <Image
                      src={assest?.currency_swap_flag2}
                      alt="currency_swap_flag"
                      width={30}
                      height={30}
                    />
                  </i>
                  BTC
                </MenuItem> */}
                </Select>
              </Box>
            )}
          </Box>
          <Box className="swap_rgt">
            {isPending || fetchingMinMaxExchangeAmt ? (
              <Typography>Calculating...</Typography>
            ) : (
              <Typography>
                Max is{" "}
                {minExchangeLimit?.result
                  ? `~${Number(
                      minExchangeLimit?.result[0]?.maxAmountFloat
                    ).toFixed(6)}`
                  : "N/A"}
              </Typography>
            )}

            {/* <TextField placeholder="560" type="number" fullWidth /> */}
            <TextField
              type="number"
              fullWidth
              value={exchangeAmt}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setExchangeAmt(Number(e.target.value));
                // getCovertedEth(e.target.value);
                // debouncedApiCall(e.target.value);
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
            {swap ? (
              <Box className="select_block">
                <Select
                  displayEmpty
                  value={selectValue}
                  onChange={handleSelectChange}
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
                  <MenuItem value={10}>
                    <i>
                      <Image
                        src={assest?.currency_swap_flag2}
                        alt="currency_swap_flag"
                        width={30}
                        height={30}
                      />
                    </i>
                    BTC
                  </MenuItem>
                  <MenuItem value={20}>
                    <i>
                      <Image
                        src={assest?.currency_swap_flag2}
                        alt="currency_swap_flag"
                        width={30}
                        height={30}
                      />
                    </i>
                    BTC
                  </MenuItem>
                  <MenuItem value={30}>
                    <i>
                      <Image
                        src={assest?.currency_swap_flag2}
                        alt="currency_swap_flag"
                        width={30}
                        height={30}
                      />
                    </i>
                    BTC
                  </MenuItem>
                </Select>
              </Box>
            ) : (
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
                  <MenuItem value={20}>
                    <i>
                      <Image
                        src={assest?.currency_swap_flag1}
                        alt="currency_swap_flag"
                        width={30}
                        height={30}
                      />
                    </i>
                    USD
                  </MenuItem>
                  <MenuItem value={30}>
                    <i>
                      <Image
                        src={assest?.currency_swap_flag1}
                        alt="currency_swap_flag"
                        width={30}
                        height={30}
                      />
                    </i>
                    USD
                  </MenuItem>
                </Select>
              </Box>
            )}
          </Box>
          <Box className="swap_rgt">
            <TextField
              placeholder="Enter amount"
              value={`~${estExchangeAmt?.toFixed(5)}`}
              fullWidth
              disabled
            />
          </Box>
        </SwapStack>
      </Box>
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
        <Stack direction="row" justifyContent="center">
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            onClick={generateChangellyPayLink}
            fullWidth
            disabled={!agreedToTerms}
          >
            Exchange Now
          </CustomButtonPrimary>
        </Stack>
      </Box>
    </PaymentModalExchangeWrapper>
  );
};

export default PaymentModalExchange;
