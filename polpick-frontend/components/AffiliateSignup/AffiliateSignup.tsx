import { checkValidAffilateLink } from "@/api/functions/game.api";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { MetMaskWrapper } from "@/styles/StyledComponents/MetMaskWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";

interface IAffiliateSignupModal {
  openModal: boolean;
  cancelAffilateInit: () => void;
  initAffiliate: () => void;
}
const AffiliateSignupModal = ({
  openModal,
  cancelAffilateInit,
  initAffiliate
}: IAffiliateSignupModal) => {
  const router = useRouter();
  const userSelector = useAppSelector((state) => state.userSlice);
  const [isInvalidLink, setIsInvalidLink] = useState<boolean>(false);
  // const { data: LinkValidResponse, isPending: checkingLinkvalidity } = useQuery(
  //   {
  //     queryKey: ["checkvalidLink"],
  //     enabled:
  //       Boolean(router.query?.r) &&
  //       !Boolean(userSelector.userData) &&
  //       openModal,
  //     queryFn: () => {
  //       if (router.query?.r && typeof router.query?.r === "string") {
  //         return checkValidAffilateLink({
  //           affiliate_link: router.query?.r
  //         }).then((res) => {
  //           if (res?.message === "Invalid." && openModal) {
  //             setIsInvalidLink(true);
  //             toast.error("The referral link you have used is invalid!");
  //           } else {
  //             setIsInvalidLink(false);
  //           }
  //           return res;
  //         });
  //       }
  //     }
  //   }
  // );

  const { mutate: mutateCheckValidate, isPending: checkingLinkvalidity } =
    useMutation({
      mutationKey: ["checkvalidLink"],
      mutationFn: checkValidAffilateLink,
      onSuccess: (res) => {
        if (res?.message === "Invalid." && openModal) {
          setIsInvalidLink(true);
          toast.error("The Campaign Code you have used is invalid!");
        } else {
          setIsInvalidLink(false);
          initAffiliate();
        }
      }
    });

  const handleCheckValidate = () => {
    if (
      Boolean(router.query?.r) &&
      !userSelector.userData &&
      openModal &&
      router.query?.r &&
      typeof router.query?.r === "string"
    ) {
      mutateCheckValidate({
        affiliate_link: router.query?.r
      });
    }
  };

  // useEffect(() => {
  //   if (LinkValidResponse?.message === "Invalid." && openModal) {
  //     setIsInvalidLink(true);
  //     toast.error("The referral link you have used is invalid!");
  //   } else {
  //     setIsInvalidLink(false);
  //   }
  //   return () => {
  //     setIsInvalidLink(false);
  //   };
  // }, [LinkValidResponse, openModal]);

  return (
    <div>
      <MuiModalWrapper
        className="balancemodal"
        open={openModal}
        onClose={cancelAffilateInit}
        PaperProps={{
          style: {
            minWidth: "510px"
          }
        }}
      >
        <MetMaskWrapper>
          <Box className="title_stack">
            <Typography variant="h2">Add Campaign Code</Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                padding: "3rem 0",
                color: "#8F9BBF",
                fontWeight: "500",
                fontSize: "1rem",
                width: "100%"
              }}
            >
              You are invited to jointhe Referral Program. By clickig the button
              you will be using the code.
            </Typography>
          </Box>
          <Box className="meta_mask_body">
            <Box
              component="form"
              // sx={{ marginTop: "20px" }}
              //   onSubmit={handleSubmit(formSubmit)}
              className="link_form"
            >
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  {/* <Stack
                    direction="row"
                    flexWrap={"wrap"}
                    alignItems={"center"}
                  > */}
                  {/* <Typography width="100px"> Referral Link:</Typography> */}
                  <InputFieldCommon
                    value={router.query?.r}
                    sx={{
                      // width: "calc(100% - 100px)",
                      // pl: 2,
                      pointerEvents: "none",
                      paddingBottom: ".8rem"
                    }}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: "center" }
                      }
                    }}
                    error={isInvalidLink}
                  />
                  {/* </Stack> */}
                </Grid>
                <Grid item xs={12} />

                <Box className="footer_Sec" sx={{ width: "100%" }}>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    flexWrap="wrap"
                    alignItems="center"
                    margin="0 -10px"
                  >
                    <Box sx={{ padding: "0 10px", width: "100%" }}>
                      <CustomButtonPrimary
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="button"
                        disabled={checkingLinkvalidity}
                        // onClick={initAffiliate}
                        onClick={handleCheckValidate}
                      >
                        {checkingLinkvalidity
                          ? "Checking Code..."
                          : "Add Campaign Code"}
                      </CustomButtonPrimary>
                    </Box>
                    {/* <Box sx={{ padding: "0 10px", width: "50%" }}>
                      <CustomButtonPrimary
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="button"
                        onClick={cancelAffilateInit}
                      >
                        Cancel
                      </CustomButtonPrimary>
                    </Box> */}
                  </Stack>
                </Box>
              </Grid>
            </Box>
          </Box>
        </MetMaskWrapper>
      </MuiModalWrapper>
    </div>
  );
};

export default AffiliateSignupModal;
