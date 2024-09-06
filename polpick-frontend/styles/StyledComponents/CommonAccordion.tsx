import { primaryColors } from "@/themes/_muiPalette";
import { Accordion, styled } from "@mui/material";

export const CommonAccordion = styled(Accordion)`
  background-color: transparent;
  box-shadow: none;
  filter: none;
  border-radius: 0 !important;
  color: ${primaryColors?.textPrimaryColor};
  border-bottom: 1px solid rgba(103, 120, 177, 0.2);

  &::before {
    display: none;
  }
  &.Mui-expanded {
    margin: 0;
  }
  &.faqaccordian {
    
   
    .MuiAccordionSummary-expandIconWrapper {
    
    }
    .MuiAccordionSummary-root {
      &.Mui-expanded {
        color: ${primaryColors.textPrimaryColor};
      }
    }
    .MuiAccordionDetails-root {
     
      padding-bottom: 10px;
      position: relative;
     
      p {
        padding-bottom: 25px;
        span{
          margin-right: 10px;
        }
      }
    }
  }
  .MuiAccordionSummary-root {
    font-weight: 700;
    font-size: 24px;
    letter-spacing: -0.01em;
    padding: 0;
    @media (max-width: 899px) {
      font-size: 20px;
    }
    @media (max-width: 599px) {
      font-size: 15px;
    }
    .MuiAccordionSummary-content {
      margin: 40px 0;
      @media (max-width: 899px) {
        margin: 25px 0;
      }
    }
  }
  .MuiAccordionDetails-root {
    padding: 10px 0 50px;
    p {
      font-weight: 500;
      font-size: 18px;
      color: rgba(236, 243, 255, 0.5);
      text-shadow: 0px 4px 20px rgba(236, 243, 255, 0.5);
      @media (max-width: 899px) {
        font-size: 14px;
      }
      @media (max-width: 599px) {
        font-size: 12px;
      }
    }
  }
  
`;
