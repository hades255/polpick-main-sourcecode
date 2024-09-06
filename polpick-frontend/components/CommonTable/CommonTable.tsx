/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/no-array-index-key */

import { historytbaleData } from "@/json/mock/demo.mock";
import { HistoryTableWrap } from "@/styles/StyledComponents/HistoryTableWrap";
import LinkIcon from "@/ui/Icons/LinkIcon";
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

import React, { useState } from "react";

interface TableData {
  number: string;
  user: string;
  wallet: string;
  tickets: number;
  prize: string;
}
interface HeadCell {
  id: keyof TableData;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
  isSort?: boolean;
}
const headerList = ["Place", "Winner", "Wallet", "Tickets", "Prize"];

const headCells: HeadCell[] = [
  {
    id: "number",
    numeric: false,
    disablePadding: true,
    label: "Number",
    isSort: false
  },
  {
    id: "user",
    numeric: true,
    disablePadding: false,
    label: "user",
    isSort: false
  },
  {
    id: "wallet",
    numeric: true,
    disablePadding: false,
    label: "Wallet",
    isSort: false
  },
  {
    id: "tickets",
    numeric: true,
    disablePadding: false,
    label: "Tickets",
    isSort: true
  },
  {
    id: "prize",
    numeric: true,
    disablePadding: false,
    label: "Prize",
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
  order: "asc" | "desc";
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
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
            sortDirection={orderBy === headCell.id ? order : false}
            align="center"
            sx={{
              display:
                headCell.id === "wallet" ? { xs: "none", md: "table-cell" } : {}
            }}
          >
            {headCell.label}
            {headCell.isSort && (
              <TableSortLabel
                // active={orderBy === headCell.id}
                active
                direction={orderBy === headCell.id ? order : "asc"}
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

export default function CommonTable() {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = useState<keyof TableData>("prize");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <HistoryTableWrap>
      <Box className="history_table">
        <TableContainer>
          <Table aria-labelledby="tableTitle" aria-label="enhanced table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(historytbaleData, getComparator(order, orderBy)).map(
                (row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover key={index}>
                      <TableCell id={labelId} align="center">
                        <Box className="number_img">
                          <Image
                            src={row.number}
                            alt=""
                            width={45}
                            height={40}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Box className="user_img">
                          <i>
                            <Image
                              src={row.user}
                              alt=""
                              width={50}
                              height={50}
                            />
                          </i>
                          <Typography
                            sx={{ display: { md: "none", xs: "block" } }}
                          >
                            {row?.wallet}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        {" "}
                        <Typography variant="body1">
                          {row.wallet}
                        </Typography>{" "}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        <Typography variant="body1">
                          {row.tickets}
                        </Typography>{" "}
                      </TableCell>
                      <TableCell align="center">
                        <Link href="/" className="prize_link">
                          <LinkIcon /> {row.prize}
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </HistoryTableWrap>
  );
}
