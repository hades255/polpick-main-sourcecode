/* eslint-disable no-console */
import { WeeklyWinnerHeaderWrapper } from "@/styles/StyledComponents/WeeklyWinnerHeaderWrapper";
import InputFieldCommon from "@/ui/CommonInput/CommonInput";
import CalendarIcon from "@/ui/Icons/CalendarIcon";
import ShareIcon from "@/ui/Icons/ShareIcon";
import {
  Stack,
  StackProps,
  Theme,
  Typography,
  useMediaQuery
} from "@mui/material";
import { DatePicker } from "antd";
import Link from "next/link";
import React, { useState } from "react";

import dayjs from "dayjs";
import moment from "moment";
import { toast } from "sonner";

const { WeekPicker } = DatePicker;

interface headerProps {
  title: string;
  onDateChange: Function;
}

const WeeklyWinnerHeader: React.FC<headerProps & StackProps> = ({
  title,
  onDateChange,
  ...props
}) => {
  const isXsScreen = useMediaQuery((theme: Theme) => {
    return theme.breakpoints.down("md");
  });
  const initialDate = `${moment()
    .utc()
    .startOf("week")
    .format("DD/MM")} - ${moment().utc().endOf("week").format("DD/MM")}`;
  const [selectedWeek, setSelectedWeek] = useState<string>(initialDate);

  const onDateSelect = (e: dayjs.Dayjs) => {
    if (e.isAfter(dayjs())) {
      toast.error("Please Choose a valid date");
      return;
    }

    setSelectedWeek(
      `${moment(e.clone().toISOString())
        .utc()
        .startOf("week")
        .format("DD/MM")} - ${moment(e.clone().toISOString())
        .utc()
        .endOf("week")
        .format("DD/MM")}`
    );

    onDateChange(e);
  };

  return (
    <WeeklyWinnerHeaderWrapper
      direction="row"
      alignItems="center"
      flexWrap="wrap"
      {...props}
    >
      <Typography variant="h2">{title}</Typography>
      <Stack direction="row">
        <InputFieldCommon
          value={selectedWeek}
          adorMentIcon={
            <WeekPicker
              onChange={(e) => {
                if (e) {
                  onDateSelect(e);
                } else {
                  //resetting
                  setSelectedWeek(initialDate);
                  onDateSelect(dayjs());
                }
              }}
              suffixIcon={<CalendarIcon />}
            />
          }
        />
        <Typography variant="body1">
          <i>
            <ShareIcon />
          </i>
          <Link href="/weekly-winner">
            {isXsScreen ? "Share" : "Share results"}
          </Link>
        </Typography>
      </Stack>
    </WeeklyWinnerHeaderWrapper>
  );
};

export default WeeklyWinnerHeader;
