// eslint-disable-next-line import/newline-after-import

import { primaryColors } from "@/themes/_muiPalette";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import { Box, Container, Stack, styled } from "@mui/material";
import CommonHeaderLanding from "../CommonHeaderLanding/CommonHeaderLanding";

export const SubscribeWrap = styled(Box)`
  padding: 0 0 100px 0;
  margin-top: -200px;
  @media (max-width: 599px) {
    margin-top: 0;
  }
  .MuiTextField-root {
    min-width: 340px;
    @media (max-width: 599px) {
      min-width: 150px;
    }
    .MuiInputBase-root {
      &.MuiOutlinedInput-root {
        padding: 14px 20px;
        border: 0;
        border-radius: 16px;
        background: rgba(40, 44, 70, 0.3);
        border: 1.5px solid rgba(103, 120, 177, 0.2);
        border-radius: 16px;
        input {
          padding: 0 0 0 15px;
          border: 0;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: -0.01em;
          color: ${primaryColors?.textPrimaryColor};
          &::placeholder {
            color: ${primaryColors?.textPrimaryColor};
            opacity: 0.3;
          }
        }
        fieldset {
          border-color: rgba(103, 120, 177, 0.2);
          border-width: 1.5px;
        }
        &.Mui-focused {
          fieldset {
            border-color: ${primaryColors?.primary};
          }
        }
      }
    }
  }
  button {
    min-width: 136px;
  }
`;
export const Subscribe = () => {
  return (
    <SubscribeWrap>
      <Container fixed>
        <CommonHeaderLanding mainTitle="Subscribe" subTitle="Newsletter" />
        <Stack
          direction="row"
          alignItems=""
          justifyContent="center"
          spacing={3}
          sx={{ maxWidth: "540px", margin: "0 auto" }}
        >
          <InputFieldCommon placeholder="Enter email" />
          <CustomButtonPrimary
            variant="contained"
            color="primary"
            type="submit"
          >
            Subscribe
          </CustomButtonPrimary>
        </Stack>
      </Container>
    </SubscribeWrap>
  );
};
