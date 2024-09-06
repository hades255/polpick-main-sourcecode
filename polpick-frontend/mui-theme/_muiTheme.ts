/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable mui-path-imports/mui-path-imports */
import { PaletteMode } from "@mui/material";
import type { ThemeOptions } from "@mui/material/styles";
import { Goldman, Poppins } from "next/font/google";
import { pallete, primaryColors } from "./_muiPalette";
/**
 * The function `MuiThemeOptions` returns a configuration object for the Material-UI theme based on the
 * provided mode (light or dark) and includes customizations for various components and typography.
 * @param {PaletteMode} mode - The `mode` parameter is of type `PaletteMode` and is used to determine
 * the color palette mode for the theme. The `PaletteMode` type can have two possible values: "light"
 * or "dark".
 * @returns The function `MuiThemeOptions` returns a `ThemeOptions` object.
 */

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"]
});
export const goldman = Goldman({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"]
});

export const MuiThemeOptions = (mode: PaletteMode): ThemeOptions => {
  return {
    palette: pallete(mode),
    typography: {
      fontFamily: [`${poppins.style.fontFamily}`].join(","),
      fontSize: 13,
      h1: {
        fontSize: "36px",
        lineHeight: "1.1em",
        fontWeight: "700",
        fontFamily: poppins.style.fontFamily,
        "@media(max-width:991px)": {
          fontSize: "22px",
          lineHeight: "1.1em"
        }
      },
      h2: {
        fontSize: "22px",
        lineHeight: "1.1em",
        fontWeight: "800",
        fontFamily: poppins.style.fontFamily,
        "@media(max-width:991px)": {
          fontSize: "22px",
          lineHeight: "26px"
        }
      },
      h3: {
        fontSize: "20px",
        lineHeight: "1.1em",
        fontWeight: "700",
        fontFamily: poppins.style.fontFamily,
        "@media(max-width:991px)": {
          fontSize: "18px",
          lineHeight: "1.1em"
        }
      },
      h4: {
        fontSize: "18px",
        lineHeight: "1.3",
        fontWeight: "500",
        fontFamily: poppins.style.fontFamily,
        "@media(max-width:991px)": {
          fontSize: "16px",
          lineHeight: "1.3"
        }
      },
      h5: {
        fontSize: "15px",
        lineHeight: "1.4",
        fontWeight: "500",
        fontFamily: poppins.style.fontFamily,
        "@media(max-width:991px)": {
          fontSize: "12px",
          lineHeight: "1.4"
        }
      },
      h6: {
        fontSize: "12px",
        lineHeight: "1.5",
        fontWeight: "500",
        fontFamily: poppins.style.fontFamily,
        "@media(max-width:991px)": {
          fontSize: "12px",
          lineHeight: "1.5"
        }
      },
      body1: {
        fontSize: "13px",
        lineHeight: "1.5em",
        color: `${primaryColors.textPrimaryColor}`,
        "@media(min-width:1921px)": {
          fontSize: ".75vw"
        }
      },
      body2: {
        fontSize: "12px",
        lineHeight: "1.5em",
        color: `${primaryColors.textPrimaryColor}`
      },
      caption: {
        fontSize: "14px",
        lineHeight: "1.5em",
        color: `${primaryColors.textPrimaryColor}`
      }
    },

    components: {
      MuiSkeleton: {
        defaultProps: {
          animation: "wave"
        }
      },
      MuiCard: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            return {
              borderRadius: "8px",
              boxShadow: `0px 4px 24px 0px ${primaryColors.cardShadow}`
            };
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            if (
              ownerState.variant === "filled" &&
              ownerState.color === "default"
            ) {
              return {
                backgroundColor: primaryColors?.bodyColor,
                color: primaryColors.mainFontColor,
                "&:hover": {
                  backgroundColor: primaryColors?.bodyColor,
                  color: primaryColors.mainFontColor
                }
              };
            }
            if (
              ownerState.variant === "filled" &&
              ownerState.color === "success"
            ) {
              return {
                backgroundColor: primaryColors?.lightGreen,
                color: primaryColors?.deepGreen,

                "&:hover": {
                  backgroundColor: primaryColors?.lightGreen,
                  color: primaryColors?.deepGreen
                }
              };
            }

            if (
              ownerState.variant === "filled" &&
              ownerState.color === "secondary"
            ) {
              return {
                backgroundColor: primaryColors?.secondary,
                color: primaryColors?.white,
                border: `1px solid ${primaryColors?.secondaryBorder}`,
                "&:hover": {
                  background: primaryColors?.secondaryBorder,
                  color: primaryColors?.white
                }
              };
            }

            if (
              ownerState.variant === "filled" &&
              ownerState.color === "error"
            ) {
              return {
                backgroundColor: primaryColors?.chipErrorBg,
                color: primaryColors?.chipErrorText,
                "&:hover": {
                  backgroundColor: primaryColors?.chipErrorBg,
                  color: primaryColors?.chipErrorText
                }
              };
            }

            if (
              ownerState.variant === "filled" &&
              ownerState.color === "warning"
            ) {
              return {
                backgroundColor: primaryColors?.warning_color,
                color: primaryColors?.warning_text,
                "&:hover": {
                  backgroundColor: primaryColors?.warning_color,
                  color: primaryColors?.warning_text
                }
              };
            }

            if (
              ownerState.variant === "outlined" &&
              ownerState.color === "info"
            ) {
              return {
                backgroundColor: primaryColors?.white,
                color: primaryColors?.white,
                border: `1px solid ${primaryColors?.disabledBg}`,

                "&:hover": {
                  background: primaryColors?.disabledBg,
                  borderColor: primaryColors?.disabledBg,

                  color: primaryColors?.white
                }
              };
            }
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: () => {
            return {
              "@media(max-width:991px)": {
                minHeight: "20px"
              }
            };
          }
        }
      },
      MuiMenu: {
        defaultProps: {
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right"
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "right"
          },
          PaperProps: {
            elevation: 0
          }
        },
        styleOverrides: {
          paper: ({ theme }) => {
            return {
              overflow: "visible !important",
              filter: "drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.32))",
              marginTop: "6px",

              "@media(max-width:991px)": {
                marginTop: "0"
              }
            };
          },
          list: () => {
            return {
              paddingTop: "4px",
              paddingBottom: "4px"
            };
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => {
            if (
              ownerState.variant === "contained" &&
              ownerState.color === "primary"
            ) {
              return {
                // backgroundColor: primaryColors?.primary,
                background: `radial-gradient(95.83% 95.83% at 16.67% 4.17%, #769BFF 0%, #326AFF 100%)`,
                boxShadow:
                  " -32px 32px 18px rgba(9, 9, 17, 0.01), -18px 18px 15px rgba(9, 9, 17, 0.04), -8px 8px 11px rgba(9, 9, 17, 0.06), -2px 2px 6px rgba(9, 9, 17, 0.07), 0px 0px 0px rgba(9, 9, 17, 0.07)",
                borderRadius: "16px",

                "&:hover": {
                  background: `radial-gradient(95.83% 95.83% at 16.67% 4.17%, #326AFF 0%, #769BFF 100%)`,
                  color: primaryColors?.white
                }
              };
            }
            if (
              ownerState.variant === "contained" &&
              ownerState.color === "success"
            ) {
              return {
                backgroundColor: primaryColors?.successBtnBg,
                color: primaryColors?.color28C45D,
                border: 0,
                borderRadius: "100px",
                "& .MuiTypography-root": {
                  color: primaryColors?.color28C45D,
                  fontSize: 22,
                  fontWeight: 800
                },
                "&:hover": {
                  background: primaryColors?.color28C45D,
                  color: primaryColors?.white,
                  "& .MuiTypography-root": {
                    color: primaryColors?.white
                  }
                }
              };
            }

            if (
              ownerState.variant === "contained" &&
              ownerState.color === "secondary"
            ) {
              return {
                backgroundColor: primaryColors?.secondary,
                color: primaryColors?.white,
                border: `1px solid ${primaryColors?.secondaryBorder}`,
                "&:hover": {
                  background: primaryColors?.secondaryBorder,
                  color: primaryColors?.white
                }
              };
            }

            if (
              ownerState.variant === "contained" &&
              ownerState.color === "error"
            ) {
              return {
                backgroundColor: primaryColors?.errorBtnBg,
                color: primaryColors?.colorE85151,
                border: 0,
                borderRadius: "100px",
                "& .MuiTypography-root": {
                  color: primaryColors?.colorE85151,
                  fontSize: 22,
                  fontWeight: 800
                },
                "&:hover": {
                  background: primaryColors?.colorE85151,
                  color: primaryColors?.white,
                  "& .MuiTypography-root": {
                    color: primaryColors?.white
                  }
                }
              };
            }

            if (
              ownerState.variant === "outlined" &&
              ownerState.color === "info"
            ) {
              return {
                backgroundColor: primaryColors?.white,
                color: primaryColors?.white,
                border: `1px solid ${primaryColors?.disabledBg}`,

                "&:hover": {
                  background: primaryColors?.disabledBg,
                  borderColor: primaryColors?.disabledBg,

                  color: primaryColors?.white
                }
              };
            }

            if (
              ownerState.variant === "outlined" &&
              ownerState.color === "inherit"
            ) {
              return {
                backgroundColor: primaryColors?.white,
                color: primaryColors?.black,
                border: `1px solid ${primaryColors?.disabledBg}`,

                "&:hover": {
                  background: primaryColors?.disabledBg,
                  borderColor: primaryColors?.disabledBg,

                  color: primaryColors?.black
                }
              };
            }
          }
        },
        defaultProps: {
          disableElevation: true
        }
      },

      MuiBackdrop: {
        styleOverrides: {
          root: {
            // backdropFilter: "blur(4px)"
          }
        }
      },
      MuiTabs: {
        styleOverrides: {
          indicator: ({ theme }) => ({
            backgroundColor: theme?.palette?.primary.main
          })
        }
      }
    }
  };
};
