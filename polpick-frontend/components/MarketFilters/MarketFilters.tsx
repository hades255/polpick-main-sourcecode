import { MarketFiltersWrapper } from "@/styles/StyledComponents/MarketFiltersWrapper";
import CustomSelect from "@/ui/Filter/CustomSelect";
import MarketFilterIcon from "@/ui/Icons/MarketFilterIcon";
import { Button, MenuItem, Stack, StackProps } from "@mui/material";
import React from "react";

const MarketFilters: React.FC<StackProps> = ({ ...props }) => {
  const formatData = [
    {
      name: "demo1",
      value: "demo1"
    },
    {
      name: "demo2",
      value: "demo2"
    }
  ];
  return (
    <MarketFiltersWrapper
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      {...props}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        className="filter_left"
      >
        <Button>Gallery</Button>
        <Button>Favourites</Button>
      </Stack>
      <Button
        className="market_filter_btn"
        sx={{ display: { md: "none", xs: "flex" } }}
      >
        <MarketFilterIcon />
      </Button>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="filter_rgt"
        sx={{ display: { md: "flex", xs: "none" } }}
      >
        <CustomSelect
          initialValue="Format"
          MenuProps={{
            PaperProps: {
              className: "currencySelect"
            }
          }}
        >
          {formatData?.map((data) => (
            <MenuItem value={data?.value} key={data?.value}>
              {data?.name}
            </MenuItem>
          ))}
        </CustomSelect>
        <CustomSelect
          initialValue="Size"
          MenuProps={{
            PaperProps: {
              className: "currencySelect"
            }
          }}
        >
          {formatData?.map((data) => (
            <MenuItem value={data?.value} key={data?.value}>
              {data?.name}
            </MenuItem>
          ))}
        </CustomSelect>
        <CustomSelect
          initialValue="EN"
          MenuProps={{
            PaperProps: {
              className: "currencySelect"
            }
          }}
        >
          {formatData?.map((data) => (
            <MenuItem value={data?.value} key={data?.value}>
              {data?.name}
            </MenuItem>
          ))}
        </CustomSelect>
        <CustomSelect
          initialValue="USA"
          MenuProps={{
            PaperProps: {
              className: "currencySelect"
            }
          }}
        >
          {formatData?.map((data) => (
            <MenuItem value={data?.value} key={data?.value}>
              {data?.name}
            </MenuItem>
          ))}
        </CustomSelect>
      </Stack>
    </MarketFiltersWrapper>
  );
};

export default MarketFilters;
