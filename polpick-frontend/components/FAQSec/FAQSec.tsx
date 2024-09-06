/* eslint-disable react/no-unstable-nested-components */
import {
  faqCategoryData,
  faqList,
  fetchFaqCategoryList,
  getFaqListByCategory
} from "@/api/functions/cms.api";
import { CommonAccordion } from "@/styles/StyledComponents/CommonAccordion";
import { FAQSecWrapper } from "@/styles/StyledComponents/FAQSecWrapper";
import { FilterStackWrapper } from "@/styles/StyledComponents/FilterStack";
import CustomSelect from "@/ui/Filter/CustomSelect";
import AccordionCollapsedIcon from "@/ui/Icons/AccordionCollapsedIcon";
import AccordionExapndIcon from "@/ui/Icons/AccordionExapndIcon";
import DropDownIcon from "@/ui/Icons/DropdownIcon";
import SearchIcon from "@/ui/Icons/SearchIcon";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  BoxProps,
  Container,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line import/order
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import Recycle from "@/ui/Icons/Recycle";
import CommonHeaderLanding from "../CommonHeaderLanding/CommonHeaderLanding";

interface FilterStackPropInterface {
  onChange: (value: string) => void;
  data: faqCategoryData[] | [];
  seletedCategory: faqCategoryData | undefined;
  onCategorySelect: (_id: string) => void;
}

export const FilterStack = ({
  onChange,
  data,
  seletedCategory,
  onCategorySelect
}: FilterStackPropInterface) => {
  return (
    <FilterStackWrapper
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <TextField
        placeholder="Search"
        InputProps={{
          startAdornment: <SearchIcon />
        }}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      {data?.length ? (
        <Box className="currencySelect">
          <CustomSelect
            MenuProps={{
              PaperProps: {
                className: "menuDropListWRap"
              }
            }}
            defaultValue={data[0]?._id}
            value={seletedCategory?._id}
            IconComponent={(props) => (
              <IconButton {...props}>
                <DropDownIcon IconColor="rgba(236, 243, 255, 0.3)" />
              </IconButton>
            )}
            onChange={(e) => {
              onCategorySelect(e.target.value as string);
            }}
          >
            {data?.map((item) => (
              <MenuItem value={item._id}>{item.title}</MenuItem>
            ))}
            {/* <MenuItem value="demo1">Demo1</MenuItem>
            <MenuItem value="demo2">Demo2</MenuItem>
            <MenuItem value="demo3">Demo3</MenuItem> */}
          </CustomSelect>
        </Box>
      ) : null}
    </FilterStackWrapper>
  );
};

interface FAQProps extends BoxProps {
  isHeader?: boolean;
  isSearchField?: boolean;
  noBlur?: boolean;
  isLoadMore?: boolean;
}
const FAQSec = ({
  isHeader = true,
  isSearchField = true,
  noBlur,
  isLoadMore = false,
  ...props
}: FAQProps) => {
  const [searchedData, setSearchedData] = useState<faqList[]>([]);
  const [expanded, setExpanded] = useState<string | false>("panel2");
  const [selectedFaqCategory, setSelectedFaqCategory] =
    useState<faqCategoryData>();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const {
    data: faqCategoryList
    // refetch: refetchTopWinners,
    // isLoading: isFetchingNews
  } = useQuery({
    queryKey: ["faqCategoryList"], //, startDate,endDate
    queryFn: fetchFaqCategoryList
  });

  const {
    data: faqList
    // refetch: refetchTopWinners,
    // isLoading: isFetchingNews
  } = useQuery({
    enabled: Boolean(selectedFaqCategory?._id),
    queryKey: ["faqList", selectedFaqCategory?._id], //, startDate,endDate
    queryFn: () =>
      getFaqListByCategory({
        search: "",
        category_id: selectedFaqCategory?._id || ""
      })
  });
  // console.log("selectedFaqCategory", selectedFaqCategory);
  // console.log("faqCategoryList", faqCategoryList);
  // console.log("faqList", faqList);

  useEffect(() => {
    if (faqCategoryList?.data?.length) {
      setSelectedFaqCategory(faqCategoryList?.data[0]);
    }
  }, [faqCategoryList]);

  useEffect(() => {
    setSearchedData(faqList?.data || []);
  }, [faqList]);

  const getSearchFAQ = useMemo(() => {
    return (searchedFaq: string) => {
      if (faqList?.data?.length) {
        if (searchedFaq === "") {
          setSearchedData(faqList.data);
        } else {
          setSearchedData(
            faqList.data.filter((item) => item.title.includes(searchedFaq))
              ?.length
              ? faqList.data.filter((item) => item.title.includes(searchedFaq))
              : faqList.data
          );
        }
      }
    };
  }, [faqList?.data.length]);

  const handleSelect = (c_id: string) => {
    if (faqCategoryList?.data) {
      setSelectedFaqCategory(
        faqCategoryList.data?.filter((s) => s._id === c_id)[0]
      );
    }
    // setSelectedFaqCategory(_id);
  };
  return (
    <FAQSecWrapper noBlur={noBlur}>
      {/* <CommonHeaderLanding mainTitle="FAQ" subTitle="Find the answer" /> */}
      <Container fixed>
        {isHeader && (
          <CommonHeaderLanding mainTitle="FAQ" subTitle="Find the answer" />
        )}
        {isSearchField && (
          <TextField
            placeholder="Search"
            InputProps={{
              startAdornment: <SearchIcon />
            }}
          />
        )}
        {props?.children}
        <Box className="accordion_sec">
          {searchedData?.length ? (
            searchedData?.map((item, index) => (
              <CommonAccordion
                className="faqaccordian"
                expanded={expanded === `panel${index + 1}`}
                onChange={handleChange(`panel${index + 1}`)}
              >
                <AccordionSummary
                  expandIcon={
                    expanded === `panel${index + 1}` ? (
                      <AccordionCollapsedIcon />
                    ) : (
                      <AccordionExapndIcon />
                    )
                  }
                  aria-controls={`panel${index + 1}bh-content`}
                  id={`panel${index + 1}bh-header`}
                >
                  {item?.title}
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <span> {index + 1}. </span>
                    {item?.description}{" "}
                  </Typography>
                </AccordionDetails>
              </CommonAccordion>
            ))
          ) : (
            <Typography variant="h3">No FAQ found</Typography>
          )}
        </Box>
        {isLoadMore && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            className="btn_holder"
          >
            <CustomButtonPrimary
              color="primary"
              variant="contained"
              startIcon={<Recycle />}
            >
              Load More
            </CustomButtonPrimary>
          </Stack>
        )}
      </Container>
    </FAQSecWrapper>
  );
};

export default React.memo(FAQSec);
