/* eslint-disable no-console */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/no-array-index-key */

import CommonHeader from "@/components/CommonHeader/CommonHeader";
import JackpotTitle from "@/components/JackpotTitle/JackpotTitle";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  useMediaQuery
} from "@mui/material";

import {
  IaffiliateData,
  checkAffliateLink,
  createAffiliateLink,
  getAffliateList,
  getAffliateStats
} from "@/api/functions/game.api";
import ReferralTable from "@/components/ReferralTable/ReferralTable";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { customLink } from "@/lib/functions/_helpers.lib";
import { MetMaskWrapper } from "@/styles/StyledComponents/MetMaskWrapper";
import { primaryColors } from "@/themes/_muiPalette";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import CustomPagination from "@/ui/CustomPagination/CustomPagination";
import AddIcon from "@/ui/Icons/AddIcon";
import CopyFileIcon from "@/ui/Icons/CopyFileIcon";
import MuiModalWrapper from "@/ui/Modal/MuiModalWrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

type userLinkType = {
  linkname: string;
};

const userLinkSchema = yup.object().shape({
  linkname: yup
    .string()
    .trim()
    .min(6, "Min size should be 6 characters")
    .required("Link Name is required")
});

export default function ReferralProgramLinkManager() {
  const walletSelector = useAppSelector((s) => s.walletSlice);
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
    resetField
  } = useForm<userLinkType>({
    resolver: yupResolver(userLinkSchema),
    defaultValues: {
      linkname: ""
    }
  });
  const isXsScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );
  const { data: affiliateStats } = useQuery({
    queryKey: ["affliateStats"],
    queryFn: () => getAffliateStats({ walletId: walletSelector.wallet })
  });

  const [page, setPage] = useState(1);

  const { userData } = useAppSelector((s) => s.userSlice);

  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = useState<keyof IaffiliateData>("createdAt");
  const [isLinkCreated, setIsLinkCreated] = useState<boolean>(false);
  const {
    isLoading,
    data: affliateList,
    refetch
  } = useQuery({
    queryKey: ["affliateList", order, orderBy, page, userData?._id],
    enabled: userData?.isAffiliateManager,
    queryFn: () => {
      return getAffliateList({
        walletId: walletSelector.wallet,
        sort: {
          order,
          field: orderBy
        },
        page,
        limit: 10
      });
    }
  });

  console.log("affliateList", affliateList);

  const { mutate: mutateCreateAffliateLink, isPending: isAffLinkBeingCreated } =
    useMutation({
      mutationFn: createAffiliateLink,
      onSuccess: (res) => {
        setIsLinkCreated(true);
        toast.success(res.message);
        refetch();
      }
    });

  const { mutate: mutateCheckLinkExists, isPending: checkingLinkExists } =
    useMutation({
      mutationFn: checkAffliateLink,
      onSuccess: (res) => {
        if (res.success) {
          clearErrors("linkname");
          toast.success(res.message);
        } else {
          setError("linkname", {
            type: "required",
            message: res.message
          });
          toast.error(res.message);
        }
      }
    });

  const sortTable = (property: keyof IaffiliateData) => {
    setOrder(orderBy === property && order === "asc" ? "desc" : "asc");
    setOrderBy(property);
  };

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleModalClose = () => {
    setOpenModal(false);
    setIsLinkCreated(false);
    resetField("linkname");
  };
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const formSubmit = (data: userLinkType) => {
    if (walletSelector?.wallet && data) {
      mutateCreateAffliateLink({
        link_name: data.linkname,
        walletId: walletSelector.wallet
      });
    }
  };

  const handleClick = (value: string) => {
    navigator.clipboard.writeText(customLink(value));
    toast.success("Link Copied!");
  };

  useEffect(() => {
    let timeoutId: any = undefined;

    if (watch("linkname") && watch("linkname")?.length >= 6) {
      const _search = watch("linkname");
      // setError("linkname", {
      //   type: "required",
      //   message: "this name is not available"
      // });
      timeoutId = setTimeout(() => {
        mutateCheckLinkExists({
          link_name: _search
        });
      }, 1000);
    } else if (errors.linkname) {
      clearErrors("linkname");
      setIsLinkCreated(false);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [watch("linkname")]);

  return (
    <>
      <CommonHeader
        title={isXsScreen ? "Link Manager" : "Referral Program Link Managers"}
      >
        <CustomButtonPrimary
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ marginLeft: "29px" }}
          // onClick={() => router.push("/affiliate-program")}
          onClick={() => {
            if (userData?.isAffiliateManager) {
              handleModalOpen();
            } else
              toast.info(
                "Complete affiliation registration first to create link!"
              );
          }}
        >
          {isXsScreen ? "Link" : "Create Link"}
        </CustomButtonPrimary>
      </CommonHeader>
      <JackpotTitle gridSplitNumber={3}>
        <Box className="each_item_otr red_color">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="each_item"
          >
            <Typography variant="h3">Links Created</Typography>
            <Box className="rgt_block">
              <Typography variant="h4">
                {affiliateStats?.data?.links_count}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box className="each_item_otr green_color">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="each_item"
          >
            <Typography variant="h3">Friends Registered</Typography>
            <Box className="rgt_block">
              <Typography variant="h4">
                {affiliateStats?.data?.friends_count}
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box className="each_item_otr blue_color">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="each_item"
          >
            <Typography variant="h3">Earned</Typography>
            <Box className="rgt_block">
              <Typography variant="h4">
                ${affiliateStats?.data?.total_earnings?.toFixed(3)}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </JackpotTitle>
      <ReferralTable
        affliateList={affliateList?.data || []}
        isLoading={isLoading}
        sortTable={sortTable}
      />

      {affliateList?.data?.length && (
        <CustomPagination
          page={affliateList?.page}
          count={affliateList?.pages}
          onChange={(e, p) => setPage(p)}
        />
      )}

      <MuiModalWrapper
        className="balancemodal"
        open={openModal}
        onClose={handleModalClose}
        PaperProps={{
          style: {
            minWidth: "510px"
          }
        }}
      >
        <MetMaskWrapper>
          <Box className="title_stack">
            <Typography variant="h2">Your Link</Typography>
          </Box>

          <Box className="meta_mask_body">
            <Box
              component="form"
              sx={{ marginTop: "32px" }}
              onSubmit={handleSubmit(formSubmit)}
              className="link_form"
            >
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <Typography>Link name</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="linkname"
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { invalid, error }
                    }) => (
                      <InputFieldCommon
                        placeholder="Enter name"
                        onChange={onChange}
                        value={value}
                        error={invalid}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                disabled={!isLinkCreated}
                                disableRipple
                                onClick={() => handleClick(value)}
                              >
                                <CopyFileIcon />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        className="blue_txt"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      color: Boolean(errors?.linkname)
                        ? `${primaryColors?.colorE53922} !important`
                        : `${primaryColors?.textPrimaryColor} !important`,
                      fontSize: "12px !important"
                    }}
                  >
                    Name should be Unique and must have at least 6 characters
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    Your link will be:
                    <Typography variant="caption">
                      {customLink(watch("linkname") || "MelissaDoe")}
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
              <Box className="footer_Sec">
                <Stack direction="row" justifyContent="center">
                  <CustomButtonPrimary
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    disabled={
                      !getValues("linkname") ||
                      isAffLinkBeingCreated ||
                      Boolean(errors.linkname?.message)
                    }
                  >
                    Create
                  </CustomButtonPrimary>
                </Stack>
              </Box>
            </Box>
          </Box>
        </MetMaskWrapper>
      </MuiModalWrapper>
    </>
  );
}
