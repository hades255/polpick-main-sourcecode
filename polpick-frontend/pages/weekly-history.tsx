/* eslint-disable react/no-array-index-key */

import { getTopWinnersByRange } from "@/api/functions/game.api";
import CommonHeader from "@/components/CommonHeader/CommonHeader";
import HistoryTable from "@/components/HistoryTable/HistoryTable";

import DashboardWrapper from "@/layout/DashboardWrapper/DashboardWrapper";
import { TopWinnersByRange } from "@/reduxtoolkit/interfaces/interfaces";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";

export default function Index() {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] =
    useState<keyof TopWinnersByRange>("expected_prize");

  const { data: weeklyWinnerList, isLoading } = useQuery({
    queryKey: ["top_winner_by_range", order, orderBy], //, startDate,endDate
    queryFn: () =>
      getTopWinnersByRange({
        week_date: moment().format("YYYY-MM-DD"),
        top_only: false,
        sort: {
          order,
          field: orderBy
        }
      })
  });

  const sortTable = (data: keyof TopWinnersByRange) => {
    setOrder(orderBy === data && order === "asc" ? "desc" : "asc");
    setOrderBy(data);
  };

  // console.log(weeklyWinnerList?.data[0], "weeklyWinnerList");

  return (
    <DashboardWrapper headerTitle="">
      <CommonHeader title="Weekly Winners History" />

      <HistoryTable
        isWeeklyWinnerLoading={isLoading}
        weeklyWinnerList={weeklyWinnerList?.data || []}
        sortTable={sortTable}
      />
    </DashboardWrapper>
  );
}
