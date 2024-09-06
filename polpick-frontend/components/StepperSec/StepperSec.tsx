/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
import { createAffliateUser } from "@/api/functions/game.api";
import { createWalletUser } from "@/api/functions/user.api";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import assest from "@/json/assest";
import validationText from "@/json/messages/validationText";
import { addElipsisBetweenLength } from "@/lib/functions/_helpers.lib";
import { setAffilateTabValue } from "@/reduxtoolkit/slices/affiliate.slice";
import { setLoginData } from "@/reduxtoolkit/slices/userSlice";
import {
  CommonFormSecWrapper,
  CustomFormControlLabel
} from "@/styles/StyledComponents/CommonFormSecWrapper";
import {
  StepperBody,
  StepperSecWrapper
} from "@/styles/StyledComponents/StepperSecWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import FileIcon from "@/ui/Icons/FileIcon";
import RadioCheckedIcon from "@/ui/Icons/RadioCheckedIcon";
import RadioUncheckedIcon from "@/ui/Icons/RadioUncheckedIcon";
import TelegramIconSocial from "@/ui/Icons/TelegramIconSocial";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Checkbox, Grid, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as yup from "yup";
import CommonHeader from "../CommonHeader/CommonHeader";
import StepperBodyCommon from "./StepperBodyCommon";
import StepperNav from "./StepperNav";

type FormValues = {
  full_name: string;
  email: string;
  // phone: string;
  telegramId: string;
  walletId: string;
  terms_and_conditions: boolean;
  // country_code: string;
};

const schema = yup.object().shape(
  {
    full_name: yup
      .string()
      .trim()
      .required(validationText.error.full_name)
      .min(3, validationText.error.full_name_len_error),
    email: yup
      .string()
      .trim()
      .required(validationText.error.email)
      .email(validationText.error.email_format),
    telegramId: yup.string().trim().required(validationText.error.telegramId),
    terms_and_conditions: yup
      .bool()
      .oneOf([true], validationText.error.terms_and_conditions)
    // .boolean()
    // .required(validationText.error.terms_and_conditions)
    // country_code: yup
    //   .string()
    //   .trim()
    //   .required(validationText.error.empty_country_code),
    // phone: yup.string().trim().required(validationText.error.phone),
    // address1: yup.string().trim().required(),
    // city: yup.string().trim().required(),
    // state: yup.number(),
    // // state: yup.string().when("country", {
    // //   is: (value) => value,
    // //   then: (rule) =>
    // //   stateData?.length !== 0 ? rule
    // //       .required()
    // //       // .oneOf([yup.ref("password"), null])
    // //       .label("state") : rule,
    // // }),
    // country: yup.string().required(),
  },
  [
    // ["state", "state"],
    // ["country", "country"],
  ]
);

// export type AffilateSchemaFormData = yup.InferType<typeof schema>;

const StepperSec = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const walletSelector = useAppSelector((s) => s.walletSlice);

  const [step, setStep] = useState(1);

  const {
    mutate: mutateCreateWalletUser
    // isLoading: isCreatingUser,
    // isPending: isCreatingUser,
    // data: UserData,
  } = useMutation({
    mutationFn: createWalletUser,
    onSuccess: (data) => {
      // console.log("createWalletUser response", data);
      dispatch(setLoginData(data?.data));
      dispatch(setAffilateTabValue(2));
      toast.success("Registration Successfull!");
      router.push("/dashboard");
    }
  });

  const {
    mutate: mutateAffiliate,
    isPending: isLinkBeingCreated
    // data: create_response
  } = useMutation({
    mutationFn: createAffliateUser,
    onSuccess: () => {
      mutateCreateWalletUser({
        walletId: `${walletSelector.wallet}`
      });
      // const _temp = { ...userSelector.userData, isAffiliateManager: true };
      // dispatch(setLoginData(_temp));
      toast.success("You've been registered to the Affiliate Program!");
      router.push("/dashboard");
    }
  });

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    // getValues,
    reset: resetForm
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      terms_and_conditions: true
    }
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      resetForm();
    }
  };

  const submitForm = (e: FormValues) => {
    const payload = {
      full_name: e?.full_name,
      email: e?.email,
      telegramId: e?.telegramId,
      walletId: e?.walletId,
      terms_and_conditions: e?.terms_and_conditions
      // phone: `${e?.country_code}${e?.phone}`,
    };
    // console.log("payload", payload);

    mutateAffiliate(payload);
  };

  // useEffect(() => {
  //   if (userSelector.userData?.username) {
  //     setValue("username", userSelector.userData?.username, {
  //       shouldValidate: true
  //     });
  //   }
  // }, [userSelector.userData?.username]);

  useEffect(() => {
    if (walletSelector.wallet) {
      setValue("walletId", walletSelector.wallet, {
        shouldValidate: true
      });
    }
  }, [walletSelector.wallet]);

  // const phoneNumberError = () => {
  //   if (formErrors.phone?.message) return formErrors.phone?.message;
  //   else if (formErrors.country_code?.message)
  //     return formErrors.country_code?.message;
  //   return "";
  // };

  return (
    <StepperSecWrapper direction="row" flexWrap="wrap">
      <Box className="mobileCmnHeader">
        <CommonHeader
          title="Affiliate Program"
          sx={{ marginBottom: "55px !important" }}
          className="mobileText_header"
        />
      </Box>
      <StepperNav current={step} />
      <StepperBody>
        <CommonHeader
          title="Affiliate Program"
          sx={{ marginBottom: "55px !important" }}
          className="desktopHeader"
        />
        {step === 1 ? (
          <StepperBodyCommon
            mainImage={assest?.affiliate_image1}
            title="Join the Program"
            current={step}
            handleNext={handleNext}
            handlePrev={handlePrev}
          >
            <Typography>
              Join Our Multi-Level Affiliate Program and Make Daily Passive
              Income. Send links to your friends and get daily commissions
              straight to your wallet. Your profit is Part of Your Friends Paid
              earnings fees.
            </Typography>
          </StepperBodyCommon>
        ) : step === 2 ? (
          <StepperBodyCommon
            mainImage={assest?.affiliate_image2}
            title="Join the Program"
            current={step}
            handleNext={handleNext}
            handlePrev={handlePrev}
            isNextBtnDisabled={isLinkBeingCreated}
          >
            <Typography>
              Join Our Multi-Level Affiliate Program and Make Daily Passive
              Income. Send links to your friends and get daily commissions
              straight to your wallet. Your profit is Part of Your Friends Paid
              earnings fees.
            </Typography>
          </StepperBodyCommon>
        ) : step === 3 ? (
          <StepperBodyCommon
            mainImage={assest?.affiliate_image3}
            title="Fill the form"
            current={step}
            handleNext={handleSubmit(submitForm)}
            handlePrev={handlePrev}
            isNextBtnDisabled={
              Boolean(formErrors?.terms_and_conditions?.message) ||
              isLinkBeingCreated
            }
          >
            <Typography>
              Fill your contact details and make sure you create different links
              to different social networks to maximize your Optimization
            </Typography>
            {/* <AffiliateFormSec /> */}
            <CommonFormSecWrapper noMargin>
              <Box className="form_sec" component="form">
                <Grid container rowSpacing={3}>
                  <Grid item xs={12}>
                    <Controller
                      control={control}
                      name="full_name"
                      render={({ field: { onChange, value } }) => (
                        <InputFieldCommon
                          placeholder="Enter name"
                          value={value}
                          onChange={onChange}
                          error={Boolean(formErrors.full_name)}
                          errMsg={formErrors.full_name?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { onChange, value } }) => (
                        <InputFieldCommon
                          placeholder="Enter email"
                          value={value}
                          onChange={onChange}
                          error={Boolean(formErrors.email)}
                          errMsg={formErrors.email?.message}
                        />
                      )}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                    <PhoneInputCustom
                      isError={
                        Boolean(formErrors.phone) ||
                        Boolean(formErrors.country_code)
                      }
                      errMsg={phoneNumberError()}
                      inputValue={getValues("phone")}
                      drpDownValue={getValues("country_code")}
                      onDrpDownChange={(val) => {
                        setValue("country_code", val, {
                          shouldValidate: true
                          // shouldDirty: true,
                          // shouldTouch: true,
                        });
                      }}
                      onInputValueChange={(val) => {
                        setValue("phone", val, {
                          shouldValidate: true
                          // shouldDirty: true,
                          // shouldTouch: true,
                        });
                      }}
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <Controller
                      control={control}
                      name="telegramId"
                      render={({ field: { value, onChange } }) => (
                        <InputFieldCommon
                          placeholder="Enter Telegram Account"
                          value={value}
                          onChange={onChange}
                          InputProps={{
                            endAdornment: <TelegramIconSocial />
                          }}
                          error={Boolean(formErrors.telegramId)}
                          errMsg={formErrors.telegramId?.message}
                        />
                        // <InputFieldCommon
                        //   error={Boolean(formErrors.username)}
                        //   errMsg={formErrors.username?.message}
                        //   className="joined_input"
                        //   placeholder="@username"
                        //   value={value}
                        //   // value={userSelector.userData?.username}
                        //   InputProps={{
                        //     startAdornment: (
                        //       <CustomSelect
                        //         initialValue="demo"
                        //         IconComponent={(props) => (
                        //           <IconButton {...props}>
                        //             <DropDownSmallIcon />
                        //           </IconButton>
                        //         )}
                        //       >
                        //         <MenuItem value="demo1">Demo1</MenuItem>
                        //         <MenuItem value="demo2">Demo2</MenuItem>
                        //         <MenuItem value="demo3">Demo3</MenuItem>
                        //       </CustomSelect>
                        //     )
                        //   }}
                        // />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      control={control}
                      name="walletId"
                      render={({ field: { value } }) => (
                        <InputFieldCommon
                          placeholder="Enter Code"
                          value={
                            value
                              ? addElipsisBetweenLength(value, 16, 2)
                              : undefined
                          } //"0x5435436456d3f7...8c"
                          InputProps={{
                            endAdornment: <FileIcon />
                          }}
                          error={Boolean(formErrors.walletId)}
                          errMsg={formErrors.walletId?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      control={control}
                      name="terms_and_conditions"
                      render={({ field: { value } }) => (
                        <CustomFormControlLabel
                          IconColor="#ff7424"
                          control={
                            <Checkbox
                              // defaultChecked
                              checked={value}
                              icon={<RadioUncheckedIcon IconColor="grey" />}
                              checkedIcon={
                                <RadioCheckedIcon IconColor="#ff7424" />
                              }
                              disableRipple
                              onClick={() => {
                                setValue("terms_and_conditions", !value, {
                                  shouldValidate: true
                                  // shouldDirty: true,
                                  // shouldTouch: true,
                                });
                              }}
                            />
                          }
                          label={
                            <Typography>
                              I accept the{" "}
                              <Typography variant="caption">
                                terms & conditions
                              </Typography>
                            </Typography>
                          }
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            </CommonFormSecWrapper>
          </StepperBodyCommon>
        ) : null}
      </StepperBody>
    </StepperSecWrapper>
  );
};

export default StepperSec;
