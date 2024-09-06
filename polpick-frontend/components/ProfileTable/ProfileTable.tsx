/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unstable-nested-components */

import { iUserTransaction } from "@/api/functions/user.api";
import { HistoryTableWrap } from "@/styles/StyledComponents/HistoryTableWrap";
import BetShareIcon from "@/ui/Icons/BetShareIcon";
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
import moment from "moment";
import Link from "next/link";

import React from "react";

export interface ProfileTableData extends iUserTransaction {
  // date: string;
  // wager: number;
  // payout: string;
  // profit: number;
  // sharebet: string;
}
interface HeadCell {
  id: keyof ProfileTableData;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
  isSort?: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "createdAt",
    numeric: false,
    disablePadding: true,
    label: "Date",
    isSort: false
  },
  {
    id: "tradeAmount",
    numeric: true,
    disablePadding: false,
    label: "Wager",
    isSort: true
  },
  {
    id: "winningAmount",
    numeric: true,
    disablePadding: false,
    label: "Payout",
    isSort: true
  },
  {
    id: "profitAmount",
    numeric: true,
    disablePadding: false,
    label: "Profit",
    isSort: true
  },
  {
    id: "_id",
    numeric: true,
    disablePadding: false,
    label: "share bet",
    isSort: false
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
    property: keyof ProfileTableData
  ) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onRequestSort } = props;
  const createSortHandler =
    (property: keyof ProfileTableData) =>
    (event: React.MouseEvent<unknown>) => {
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
                headCell.id === "_id" ? { md: "table-cell", xs: "none" } : {}
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
        <TableCell sx={{ display: { md: "none", xs: "table-cell" } }} />
      </TableRow>
    </TableHead>
  );
}

interface ProfileTableProps {
  profileDataList: ProfileTableData[] | [];
  sortTable: (data: keyof iUserTransaction) => void;
}

export default function ProfileTable({
  profileDataList,
  sortTable
}: ProfileTableProps) {
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ProfileTableData
  ) => {
    sortTable(property);
  };

  return (
    <HistoryTableWrap>
      <Box className="history_table">
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
            className="playerTable"
          >
            <EnhancedTableHead onRequestSort={handleRequestSort} />
            {profileDataList?.length ? (
              <TableBody className="table_section">
                {profileDataList.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover key={index}>
                      <TableCell
                        id={labelId}
                        align="left"
                        // sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        <Typography variant="body1">
                          {moment(row.createdAt).format("MM.DD.YYYY")}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body1">
                          {row.tradeAmount}
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        <Typography className="prizetext">
                          {row.winningAmount}
                        </Typography>
                      </TableCell>

                      <TableCell align="center" sx={{ border: "0 !important" }}>
                        <Typography className="turnovertext">
                          {Math.floor(row.profitAmount)}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        //   sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        <Link href={row?._id} className="sharebet">
                          <BetShareIcon />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5}>No Data Found</TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </HistoryTableWrap>
  );
}
