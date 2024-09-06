/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import { baseUrlWeb } from "@/api/endpoints";
import MetaMaskEachComponent, {
  MetaMaskProps
} from "@/components/MetaMaskEachComponent/MetaMaskEachComponent";
import assest from "@/json/assest";
import { getDeepLink, isMobile } from "@/lib/functions/_helpers.lib";
import { MetMaskWrapper } from "@/styles/StyledComponents/MetMaskWrapper";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import { Box, Theme, useMediaQuery } from "@mui/system";
import { toast } from "sonner";
import { useConnect } from "wagmi";

const socialList: MetaMaskProps[] = [
  {
    icon: assest?.googleIcon,
    description: "Google",
    name: "Google",
    id: "io.metamask"
  }
];

const metaList: MetaMaskProps[] = [
  {
    icon: assest?.wallet1,
    description: "Meta Mask",
    name: "MetaMask",
    id: "io.metamask"
  },
  {
    icon: assest?.wallet2,
    description: "Trust Wallet",
    id: "com.trustwallet.app",
    name: "Trust Wallet"
  },
  {
    icon: assest?.wallet3,
    description: "Wallet Connect",
    id: "walletConnect",
    name: "WalletConnect"
  },
  {
    icon: assest?.wallet4,
    description: "Coinbase",
    id: "coinbaseWalletSDK",
    name: "Coinbase Wallet"
  },
  {
    icon: assest?.wallet5,
    description: "OKX Wallet",
    id: "com.okex.wallet",
    name: "OKX Wallet"
  },
  {
    icon: assest?.wallet6,
    description: "Bitkeep Wallet",
    id: "com.bitget.web3",
    name: "Bitget Wallet"
  }
];

const metaListXsScreen: MetaMaskProps[] = [
  {
    icon: assest?.wallet3,
    description: "Wallet Connect",
    id: "walletConnect",
    name: "WalletConnect"
  },
  {
    icon: assest?.wallet4,
    description: "Coinbase",
    id: "coinbaseWalletSDK",
    name: "Coinbase Wallet"
  }
];
interface WalletModalPropType {
  open: boolean;
  handleModalClose: (action: "connect" | "ignore") => void;
}

const SignUpWalletModal = ({
  open,
  handleModalClose
}: // connectors,

WalletModalPropType) => {
  const isXsScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  // const [termAccepted, setTermAccepted] = useState<boolean>(true);
  const { connect, connectors } = useConnect();
  // console.log("connector", connectors);

  // const connectWallet = (_wallet: string, data: MetaMaskProps) => {
  //   // `bitkeep://dapp/${dappUrl}`;
  //   // `okex://www.okex.com/dapp/${dappUrl}`;
  //   // `https://go.cb-w.com/dapp?cb_url=${dappUrl}`;
  //   // `https://link.trustwallet.com/open_url?coin_id=60&url=${dappUrl}`;
  //   // `https://metamask.app.link/dapp/${dappUrl}`;

  //   if (_wallet === "WalletConnect") {
  //     const connector = connectors?.find((s) => s.name === _wallet);
  //     !!connector && handleSelect(connector);
  //     return;
  //   }
  //   const dappUrl = baseUrlWeb;
  //   if (isMobile() && dappUrl) {
  //     const DeepLink = getDeepLink(_wallet, dappUrl);
  //     if (DeepLink !== "") {
  //       // window.location.href = DeepLink;
  //       handleSelectDeepLink(DeepLink);
  //     } else {
  //       toast.warning(
  //         `Could not find links for the selected wallet. Please use another`
  //       );
  //     }
  //   } else {
  //     const connector = connectors?.find((s) => s.name === _wallet);

  //     if (!connector) {
  //       toast.warning(
  //         `Please install  ${data.description} extension and refresh the page`
  //       );
  //     } else {
  //       handleSelect(connector);
  //     }
  //   }
  // };

  const connectWallet = (_wallet: string, data?: MetaMaskProps) => {
    const dappUrl = baseUrlWeb;
    if (_wallet === "Google") {
      const web3Auth = connectors?.find((s) => s.id === "web3auth");
      connect({ connector: web3Auth as any });
      handleModalClose("ignore");
      return;
    }

    if (_wallet === "WalletConnect") {
      const connector = connectors?.find((s) => s.name === _wallet);
      !!connector && connect({ connector });
      handleModalClose("ignore");

      return;
    }
    if (isMobile() && dappUrl) {
      const DeepLink = getDeepLink(_wallet, dappUrl);
      if (DeepLink !== "") {
        // handleSelectDeepLink(DeepLink);
        window.location.href = DeepLink;
      } else {
        toast.warning(
          `Could not find links for the selected wallet. Please use another`
        );
      }
    } else {
      const connector = connectors?.find((s) => s.name === _wallet);

      if (!connector) {
        toast.warning(
          `Please install  ${data?.description} extension and refresh the page`
        );
      } else {
        connect({ connector });
      }
    }

    handleModalClose("ignore");
  };
  const closeModal = () => {
    handleModalClose("ignore");
  };

  return (
    <MuiModalWrapper
      open={open}
      onClose={() => {
        closeModal();
      }}
      className="sign_up_modal"
    >
      <MetMaskWrapper>
        <Box className="title_stack">
          <Typography variant="h2">Connect Wallet</Typography>
        </Box>

        <Box className="meta_mask_body">
          <FormControl sx={{ width: "100%" }}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <Grid container spacing={3} justifyContent="center">
                {socialList?.map((data) => (
                  <Grid item sm={4} xs={12} key={data?.description}>
                    <FormControlLabel
                      key={`${data?.name}`}
                      control={
                        <Radio
                          value={data?.name}
                          onChange={(event) => {
                            connectWallet(event.target.value);
                          }}
                        />
                      }
                      label={<MetaMaskEachComponent {...data} />}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </FormControl>
          <Divider className="socialdivider" />
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {isXsScreen ? (
                <Grid container spacing={3}>
                  {metaListXsScreen?.map((data) => (
                    <Grid item md={4} xs={12} key={data?.description}>
                      <FormControlLabel
                        key={`${data?.name}`}
                        control={
                          <Radio
                            value={data?.name}
                            onChange={(event) => {
                              connectWallet(event.target.value, data);
                            }}
                          />
                        }
                        label={<MetaMaskEachComponent {...data} />}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Grid container spacing={3}>
                  {metaList?.map((data) => (
                    <Grid item md={4} xs={12} key={data?.description}>
                      <FormControlLabel
                        key={`${data?.name}`}
                        control={
                          <Radio
                            value={data?.name}
                            onChange={(event) => {
                              connectWallet(event.target.value, data);
                            }}
                          />
                        }
                        label={<MetaMaskEachComponent {...data} />}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </RadioGroup>
          </FormControl>
          <Box className="footer_Sec">
            {/* <CustomFormControlLabel
              IconColor={primaryColors?.color4F80FF}
              control={
                <Checkbox
                  // defaultChecked
                  icon={
                    <RadioUncheckedIcon
                      IconColor={primaryColors?.color4F80FF}
                    />
                  }
                  checkedIcon={
                    <RadioCheckedIcon IconColor={primaryColors?.color4F80FF} />
                  }
                  checked={termAccepted}
                  onClick={() => {
                    setTermAccepted(!termAccepted);
                  }}
                  disableRipple
                />
              }
              label={
                <Typography>
                  Agree with our{" "}
                  <Typography variant="caption">Terms of Service</Typography>{" "}
                  and out{" "}
                  <Typography variant="caption">Privacy Policy</Typography>
                </Typography>
              }
            /> */}
            {/* <Stack direction="row" justifyContent="center">
              <CustomButtonPrimary
                variant="contained"
                color="primary"
                onClick={() => {
                  handleModalClose("connect");
                }}
                disabled={!termAccepted}
              >
                Connect Wallet
              </CustomButtonPrimary>
            </Stack> */}
          </Box>
        </Box>
      </MetMaskWrapper>
    </MuiModalWrapper>
  );
};

export default SignUpWalletModal;
