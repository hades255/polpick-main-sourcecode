/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/no-array-index-key */

import { iJackpotList } from "@/api/functions/game.api";
import assest from "@/json/assest";
import { addElipsisBetweenLength } from "@/lib/functions/_helpers.lib";
import { HistoryTableWrap } from "@/styles/StyledComponents/HistoryTableWrap";
import SortIcon from "@/ui/Icons/SortIcon";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import React from "react";

interface TableData extends iJackpotList {
  // number: string;
  // user: string;
  // wallet: string;
  // tickets: number;
  // prize: string;
}
interface HeadCell {
  id: keyof TableData;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
  isSort?: boolean;
}
// const headerList = ["Place", "Winner", "Wallet", "Tickets", "Prize"];

const headCells: HeadCell[] = [
  {
    id: "_id",
    numeric: false,
    disablePadding: true,
    label: "Place",
    isSort: false
  },
  {
    id: "profile_image",
    numeric: true,
    disablePadding: false,
    label: "Player",
    isSort: false
  },
  {
    id: "walletId",
    numeric: false,
    disablePadding: false,
    label: "Wallet",
    isSort: false
  },
  {
    id: "total_tickets_count",
    numeric: true,
    disablePadding: false,
    label: "Tickets",
    isSort: true
  },
  {
    id: "expected_prize",
    numeric: true,
    disablePadding: false,
    label: "ExpecTed Prize",
    isSort: true
  }
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: "asc" | "desc",
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number): T[] {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof TableData
  ) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onRequestSort } = props;
  const createSortHandler =
    (property: keyof TableData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // sortDirection={orderBy === headCell.id ? order : false}
            align="center"
            sx={{
              display:
                headCell.id === "walletId"
                  ? { xs: "none", md: "table-cell" }
                  : {}
            }}
          >
            {headCell.label}
            {headCell.isSort && (
              <TableSortLabel
                // active={orderBy === headCell.id}
                active
                // direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                IconComponent={(props) => (
                  <IconButton
                    sx={{
                      padding: "0"
                    }}
                    {...props}
                  >
                    <SortIcon />
                  </IconButton>
                )}
              />
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface JackpotListData {
  jackpotListdata: iJackpotList[] | [];
  sortTable: (data: keyof iJackpotList) => void;
}
export default function JackpotListTable({
  jackpotListdata,
  sortTable
}: JackpotListData) {
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableData
  ) => {
    sortTable(property);
  };

  // const {
  //   isPending,
  //   isError,
  //   data: weeklyJackpotContenders,
  //   error
  // } = useQuery({
  //   queryKey: ["weeklyjackportContenders"],
  //   queryFn: getWeeklyjackportContenders
  // });

  const getIcon = (i: number) => {
    if (i === 1) {
      return `${assest.fillGoldCrown}`;
    }
    if (i === 2) {
      return `${assest.fillSilverCrown}`;
    }
    if (i === 3) {
      return `${assest.fillBronzeCrown}`;
    }
    if (i === 4) {
      return `${assest.OutLineGreenCrown}`;
    }
    if (i === 5) {
      return `${assest.OutLineGreyCrown}`;
    }
    return `${assest.OutLineGreyCrown}`;
  };

  return (
    <HistoryTableWrap>
      <Box className="history_table">
        <TableContainer>
          {jackpotListdata?.length ? (
            <Table aria-labelledby="tableTitle" aria-label="enhanced table">
              <EnhancedTableHead onRequestSort={handleRequestSort} />{" "}
              <TableBody>
                {jackpotListdata.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover key={index}>
                      <TableCell id={labelId} align="center">
                        <Box className="number_img">
                          <Image
                            // src={assest.fillGoldCrown}
                            src={getIcon(row.rank as number)}
                            alt=""
                            width={45}
                            height={40}
                          />
                          <Typography
                            className={
                              index + 1 <= 3
                                ? "abs_number text_black"
                                : "abs_number"
                            }
                          >
                            {row.rank}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Box className="user_img">
                          <i>
                            <Image
                              src={row.profile_image as string}
                              alt=""
                              width={50}
                              height={50}
                            />
                          </i>
                          <Typography
                            sx={{ display: { md: "none", xs: "block" } }}
                          >
                            {row?.walletId}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        {" "}
                        <Typography variant="body1">
                          {row.walletId
                            ? addElipsisBetweenLength(
                                row.walletId as string,
                                15,
                                3
                              )
                            : "N/A"}
                        </Typography>{" "}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Typography variant="body1">
                          {row.total_tickets_count}
                        </Typography>{" "}
                      </TableCell>
                      <TableCell align="center">
                        <Link href="/" className="prize_link">
                          $ {Number(row.expected_prize).toFixed(8)}
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : null}
        </TableContainer>
      </Box>
    </HistoryTableWrap>
  );
}
