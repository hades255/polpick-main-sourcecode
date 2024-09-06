/* eslint-disable import/no-cycle */
/* eslint-disable no-nested-ternary */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/no-array-index-key */

import assest from "@/json/assest";
import { addElipsisBetweenLength, getFlag } from "@/lib/functions/_helpers.lib";
import { highRollersListInterface } from "@/reduxtoolkit/interfaces/interfaces";
import { HistoryTableWrap } from "@/styles/StyledComponents/HistoryTableWrap";
import SliderRightArrow from "@/ui/Icons/SliderRightArrow";
import SortIcon from "@/ui/Icons/SortIcon";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from "@mui/material";

import React, { useState } from "react";

export interface PlayerTableData {
  _id: string;
  walletId: string;
  profile_image: string;
  country: string;
  totalTradeAmount: number;
  totalTurnOver: number;
  rank: number;
  totalUpBetsCount: number;
  totalDownBetsCount: number;
  upOrDown: "up" | "down";
  prizeAmount: number;
}
interface HeadCell {
  id: keyof PlayerTableData;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
  isSort?: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "rank",
    numeric: false,
    disablePadding: true,
    label: "#",
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
    numeric: true,
    disablePadding: false,
    label: "Wallet",
    isSort: false
  },
  {
    id: "totalTradeAmount",
    numeric: true,
    disablePadding: false,
    label: "Trades",
    isSort: true
  },
  {
    id: "totalTurnOver",
    numeric: true,
    disablePadding: false,
    label: "Turnover",
    isSort: true
  },
  {
    id: "prizeAmount",
    numeric: true,
    disablePadding: false,
    label: "Prize (Tickets)",
    isSort: true
  }
];

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator<Key extends keyof any>(
//   order: "asc" | "desc",
//   orderBy: Key
// ): (
//   a: { [key in Key]: number | string },
//   b: { [key in Key]: number | string }
// ) => number {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort<T>(array: T[], comparator: (a: T, b: T) => number): T[] {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof PlayerTableData
  ) => void;
  // order: "asc" | "desc";
  // orderBy: "totalTurnOver" | "totalTradeAmount" | "prizeAmount";
  // sortTable: (data: iSortFields) => any;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onRequestSort } = props;

  const createSortHandler =
    (property: keyof PlayerTableData) => (event: React.MouseEvent<unknown>) => {
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
                headCell.id === "walletId" || headCell.id === "totalTurnOver"
                  ? { md: "table-cell", xs: "none" }
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
                // onClick={() => {
                //   sortTable({ order, field: orderBy });
                // }}
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

interface HighRollerList {
  list: highRollersListInterface[] | [];
  isLoading: boolean;
  sortTable: (data: keyof PlayerTableData) => void;
}
export default function PlayerTable({
  list,
  isLoading,
  sortTable
}: HighRollerList) {
  // const [order, setOrder] = useState<"asc" | "desc">("desc");
  // const [orderBy, setOrderBy] =
  //   useState<keyof PlayerTableData>("totalTurnOver");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof PlayerTableData
  ) => {
    sortTable(property);
  };

  const [cellNumber, setCellNumber] = useState<number>(-1);

  const toggleCellnumber = (data: number) => {
    if (data !== cellNumber) {
      setCellNumber(data);
    } else {
      setCellNumber(-1);
    }
  };

  // const { isPending, isError, data, error } = useQuery({
  //   queryKey: ["highrollerList"],
  //   queryFn: getHighRollersList
  // });

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
            {list?.length ? (
              <TableBody className="table_section">
                {list.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <>
                      <TableRow hover key={row?._id}>
                        <TableCell id={labelId} align="left">
                          <Stack
                            direction="row"
                            alignItems="center"
                            className="rankingnumber"
                          >
                            <Typography variant="body1">
                              {Number(row?.rank)}
                            </Typography>
                            <i>
                              {Number(row?.rank) === 1 ? (
                                <img src={assest?.crown1} alt="" />
                              ) : Number(row?.rank) === 2 ? (
                                <img src={assest?.crown2} alt="" />
                              ) : Number(row?.rank) === 3 ? (
                                <img src={assest?.crown3} alt="" />
                              ) : (
                                ""
                              )}
                            </i>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">
                          <Stack
                            direction="row"
                            alignItems="flex-end"
                            className="user_details_box"
                          >
                            <i className="tranding_bar">
                              <img
                                src={
                                  row.upOrDown === "up"
                                    ? `${assest.graphuparrow}`
                                    : `${assest.graphdownarrow}`
                                }
                                alt="tranding_img"
                              />
                            </i>
                            <Box className="userSection">
                              <figure>
                                <img
                                  src={row.profile_image}
                                  alt="userImg"
                                  width={32}
                                  height={32}
                                />
                              </figure>
                              <i className="flagIcon">
                                <img
                                  src={getFlag(row.country)}
                                  alt="flagIcon"
                                  width={16}
                                  height={16}
                                />
                              </i>
                            </Box>
                          </Stack>
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{ display: { xs: "none", md: "table-cell" } }}
                        >
                          <Typography variant="body1">
                            {row.walletId
                              ? addElipsisBetweenLength(row.walletId, 16, 2)
                              : ""}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ display: { xs: "none", md: "table-cell" } }}
                        >
                          <Typography variant="body1">
                            {row.totalTradeAmount.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography className="turnovertext">
                            {row.totalTurnOver?.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ border: "0 !important" }}
                        >
                          <Typography className="prizetext">
                            {/* {row.ticket} */} {row.prizeAmount}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ display: { md: "none", xs: "table-cell" } }}
                        >
                          <Button
                            sx={{
                              transform:
                                cellNumber === index
                                  ? "rotate(90deg)"
                                  : "rotate(0deg)",
                              transition: "all 0.5s ease",
                              minWidth: "auto",
                              padding: "0px"
                            }}
                            onClick={() => toggleCellnumber(index)}
                          >
                            <SliderRightArrow />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        // sx={{ display: { md: "none", xs: "table-row" } }}
                        className={
                          cellNumber === index
                            ? "isActive expanded_row"
                            : "expanded_row"
                        }
                      >
                        <TableCell align="center" colSpan={5}>
                          <Box className="expand_block">
                            <List disablePadding>
                              <ListItem disablePadding>
                                <Typography className="title">
                                  Wallet
                                </Typography>
                                <Typography className="description">
                                  {row?.walletId}
                                </Typography>
                              </ListItem>
                              <ListItem disablePadding>
                                <Typography className="title">
                                  Trades
                                </Typography>
                                <Typography className="description">
                                  {row?.totalTradeAmount}
                                </Typography>
                              </ListItem>
                            </List>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={6}>No Data Found!!!</TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </HistoryTableWrap>
  );
}
