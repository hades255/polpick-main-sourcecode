/* eslint-disable mui-path-imports/mui-path-imports */
//  MUI pallete colors will be listed here

import { PaletteMode, PaletteOptions } from "@mui/material";

export const primaryColors = {
  primary: "#354072",
  primary1: "#C2A6F4",

  primary_600: "#5871D0",
  secondary: "#FF8EB2",
  secondaryBorder: "#F380A5",
  info: "#7CD1D2",
  infoBorder: "#67C1C2",
  disabledBg: "#DBE0E8",
  textDisabled: "#8F98A8",
  errorMain: "#EB4444",
  errorLight: "#FFECF2",
  white: "#fff",
  black: "#000",
  bodyColor: "#F4F6F8",
  mainFontColor: "#848484",
  textPrimaryColor: "#ECF3FF",
  borderprimary: "#DBE0E8",
  border_primary: "#DBE0E8",
  warning_color: "#FFEFD7",
  success_color: "#D4FEFF",
  text_success: "#3C8183",
  warning_text: "#6F4F1F",
  deepGreen: "#3c8183",
  lightGreen: "#D4FEFF",
  danger_text: "#9B3858",
  warningMain: "rgba(255, 167, 33, 1)",
  pendingColor: "#FFEFD7",
  pendingTextColor: "#6F4F1F",
  textDanger: "#9B3858",
  dangerColor: "#FFECF2",

  // borderprimary:"#DBE0E8",
  chipErrorBg: "#FFECF2",
  chipErrorText: "#9B3858",
  cardShadow: "#0707070F",
  tableshadow: "rgba(7, 7, 7, 0.06)",
  secondaryFont: "#4D4E4E",
  tertiaryFont: "#585858",
  color060606: "#060606",
  colorF6EFF8: "#F6EFF8",
  colorfdf8ff: "#fdf8ff",
  color2F3240: "#2F3240",
  color28C45D: "#28C45D",
  colorE85151: "#E85151",
  color4F80FF: "#4F80FF",
  color8f9bbf: "#8f9bbf",
  color34d16a: "#34d16a",
  colorff9855: "#ff9855",
  colorff7424: "#ff7424",
  greenFade: "rgba(52, 209, 106, 0.2)",
  redFade: "rgba(232, 81, 81, 0.2)",
  color6c769c: "#6c769c",
  colorFFD912: "#FFD912",
  colorC08855: "#C08855",
  color3c456c: "#3c456c",
  color769bff: "#769bff",
  color326aff: "#326aff",
  color252c4b: "#252c4b",
  colordfdfdf: "#dfdfdf",
  color4e86ff: "#4e86ff",
  color363F6A: "#363F6A",
  greenFadeTwo: "rgba(52, 209, 106, 0.6)",
  orangeFadeTwo: "rgba(255, 116, 36, 0.5)",
  color5f667c: "#5f667c",
  successBtnBg: "rgba(52, 209, 106, 0.2)",
  errorBtnBg: " rgba(232, 81, 81, 0.2)",
  color181d32: "#181d32",
  colord0583b: "#d0583b",
  colorfa742d: "#fa742d",
  colorECF3FFOpacity: "rgba(236, 243, 255, 0.5)",
  color040E10: "#040E10",
  color0c1012: "#0c1012",
  color3d72ff: "#3d72ff",
  colordc2e2c: "#dc2e2c",
  color4a567f: "#4a567f",
  colorfed92d: "#fed92d",
  colorfee338: "#fee338",
  color2A334D: "#2A334D",
  colorfdde41: "#fdde41",
  color39415F: "#39415F",
  colorF79E34: "#F79E34",
  colorfde136: "#fde136",
  color42cb67: "#42cb67",
  color23DBBD: "#23DBBD",
  colorFFF2FE: "#FFF2FE",
  colorFB49C0: "#FB49C0",
  colorEF8233: "#EF8233",
  colorE53922: "#E53922",
  colorF45E53: "#F45E53",
  color5D89FF: "#5D89FF",
  colorF25953: "#F25953",
  colorfff9f8: "#fff9f8",
  color28a1f5: "#28a1f5",
  colora8ddf3: "#a8ddf3"
};

export const pallete = (mode: PaletteMode): PaletteOptions => {
  return {
    mode,
    background: {
      default: mode === "light" ? "#f5f8fa" : "#000",
      paper: mode === "light" ? "#fff" : "#000"
    },
    //global
    primary: {
      main: primaryColors.primary,
      dark: primaryColors.primary_600
    },
    secondary: {
      main: primaryColors.secondary
    },
    info: {
      main: primaryColors.info
    },
    error: {
      main: primaryColors.errorMain
    },
    warning: {
      main: primaryColors.warningMain
    },

    text: {
      primary: primaryColors.disabledBg
    },
    common: {
      black: "#000",
      white: "#fff"
    }
  };
};
