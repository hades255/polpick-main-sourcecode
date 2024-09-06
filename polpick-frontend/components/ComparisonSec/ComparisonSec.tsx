/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import { CmsDaum } from "@/api/functions/cms.api";
import {
  ComparisonSecWrapper,
  EachOptionBlockWrapper
} from "@/styles/StyledComponents/ComparisonSecWrapper";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import RightIcon from "@/ui/Icons/RightIcon";
import WrongIcon from "@/ui/Icons/WrongIcon";
import {
  Box,
  BoxProps,
  Chip,
  Container,
  List,
  ListItem,
  Stack,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CommonHeaderLanding from "../CommonHeaderLanding/CommonHeaderLanding";

const optionList = [
  "Winning Withdraw",
  "Deposit",
  "Play Against the house",
  "Chance to win",
  "Peer to peer",
  "Transparency"
];
type ICheckListType = "check" | "notCheck";

interface OptionProps {
  title: string;
  percentageUporDown: number;
  type?: "up" | "down" | undefined;
  checkList: ICheckListType[];
  indexNumber?: number | undefined;
}

const EachOptionBlock: React.FC<OptionProps & BoxProps> = ({
  title,
  percentageUporDown,
  type,
  checkList,
  indexNumber,
  ...props
}) => {
  const router = useRouter();

  return (
    <EachOptionBlockWrapper indexNumber={indexNumber} {...props}>
      <Chip label="Best Option" className="option_label" />
      <Typography variant="h4">{title}</Typography>
      <Typography variant="h3">
        {percentageUporDown}
        <Typography variant="caption">
          {type === "up" ? "%+" : type === "down" ? "%-" : "%"}
        </Typography>
      </Typography>
      <Typography>Win Ratio</Typography>
      <List disablePadding className="check_list">
        {checkList.map((data, index) => (
          <ListItem
            disablePadding
            key={index}
            className={
              data === "check"
                ? "checked"
                : data === "notCheck"
                ? "not_checked"
                : ""
            }
          >
            {data === "check" ? (
              <RightIcon />
            ) : data === "notCheck" ? (
              <WrongIcon />
            ) : null}
          </ListItem>
        ))}
      </List>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        className="btn_stack"
      >
        <CustomButtonPrimary
          variant="contained"
          color="primary"
          onClick={() => {
            router.push("/");
          }}
        >
          I want to Play!
        </CustomButtonPrimary>
      </Stack>
    </EachOptionBlockWrapper>
  );
};

interface ComparisonSecInterface {
  cmsData: CmsDaum[];
}
const ComparisonSec = ({ cmsData }: ComparisonSecInterface) => {
  const [tableCheckList, setTableCheckList] = useState<OptionProps[]>([]);
  useEffect(() => {
    if (cmsData?.length) {
      const _t: OptionProps[] = [];
      for (let i = 0; i < cmsData.length; i++) {
        const _chkList: ICheckListType[] = [];
        _chkList.push(cmsData[i]?.winning_withdraw ? "check" : "notCheck");
        _chkList.push(cmsData[i]?.deposit ? "check" : "notCheck");
        _chkList.push(cmsData[i]?.against_house ? "check" : "notCheck");
        _chkList.push(cmsData[i]?.win_chance ? "check" : "notCheck");
        _chkList.push(cmsData[i]?.peer ? "check" : "notCheck");
        _chkList.push(cmsData[i]?.transparency ? "check" : "notCheck");

        _t.push({
          checkList: _chkList,
          title: cmsData[i]?.title,
          percentageUporDown: Number(cmsData[i]?.win_ratio)
        });
      }

      setTableCheckList(_t);
    }
  }, [cmsData]);

  return (
    <ComparisonSecWrapper className="cmn_gap">
      <CommonHeaderLanding
        mainTitle="Comparison"
        subTitle="Compare the prizes"
      />
      <Container fixed>
        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          className="comparison_sec"
        >
          <Box className="option_part">
            <List disablePadding>
              {optionList?.map((data, index) => (
                <ListItem disablePadding key={index}>
                  {data}
                </ListItem>
              ))}
            </List>
          </Box>
          <Box className="list_part">
            <Stack direction="row" flexWrap="wrap">
              {tableCheckList?.map((item, index) => (
                <Box className="each_list" key={index}>
                  <EachOptionBlock {...item} indexNumber={index + 1} />
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </ComparisonSecWrapper>
  );
};

export default ComparisonSec;
