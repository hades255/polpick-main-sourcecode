/* eslint-disable no-nested-ternary */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/no-array-index-key */

import { UserWinRatio } from "@/api/functions/game.api";
import assest from "@/json/assest";
import { addElipsisBetweenLength, getFlag } from "@/lib/functions/_helpers.lib";
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
import Image from "next/image";

import React, { useState } from "react";

// export interface TableData extends UserWinRatio {
//   // rank: number;
//   // player: string;
//   // wallet: string;
//   // totalGames: number;
//   // totalWins: number;
//   // winRatio: string;
//   // prize: number;
//   // type: "up" | "down";
//   // _id: string;
// }
interface HeadCell {
  id: keyof UserWinRatio;
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
    id: "totalTradesCount",
    numeric: true,
    disablePadding: false,
    label: "Trades",
    isSort: true
  },
  {
    id: "totalWinsCount",
    numeric: true,
    disablePadding: false,
    label: "Wins",
    isSort: true
  },
  {
    id: "winRatio",
    numeric: true,
    disablePadding: false,
    label: "Win ratio",
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
    property: keyof UserWinRatio
  ) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onRequestSort } = props;
  const createSortHandler =
    (property: keyof UserWinRatio) => (event: React.MouseEvent<unknown>) => {
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
                headCell.id === "walletId" ||
                headCell.id === "totalTradesCount" ||
                headCell.id === "totalWinsCount"
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

export interface WinTableProps {
  winners: UserWinRatio[] | [];
  isLoading: boolean;
  sortTable: (data: keyof UserWinRatio) => void;
}

export default function WinTable({
  winners,
  isLoading,
  sortTable
}: WinTableProps) {
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof UserWinRatio
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
            <TableBody className="table_section">
              {winners?.length
                ? winners.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <>
                        <TableRow hover key={index}>
                          <TableCell id={labelId} align="left">
                            <Stack
                              direction="row"
                              alignItems="center"
                              className="rankingnumber"
                            >
                              <Typography variant="body1">
                                {row?.rank}
                              </Typography>

                              <i>
                                {row?.rank === 1 ? (
                                  <img src={assest?.crown1} alt="" />
                                ) : row?.rank === 2 ? (
                                  <img src={assest?.crown2} alt="" />
                                ) : row?.rank === 3 ? (
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
                                      : `${assest.graphuparrow}`
                                  }
                                  alt="tranding_img"
                                />
                              </i>
                              <Box className="userSection">
                                <figure>
                                  <Image
                                    src={`${row?.profile_image}`}
                                    alt="user"
                                    width={32}
                                    height={32}
                                  />
                                </figure>
                                <i className="flagIcon">
                                  <img
                                    // src={row.flagimg}
                                    src={`${getFlag(row?.country)}`}
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
                              {addElipsisBetweenLength(
                                row._id as string,
                                16,
                                2
                              )}
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ display: { xs: "none", md: "table-cell" } }}
                          >
                            <Typography variant="body1">
                              {row.totalTradesCount}
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ display: { xs: "none", md: "table-cell" } }}
                          >
                            <Typography>{row.totalWinsCount}</Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography className="turnovertext">
                              {row.winRatio}
                            </Typography>
                          </TableCell>

                          <TableCell
                            align="center"
                            sx={{ border: "0 !important" }}
                          >
                            <Typography className="prizetext">500</Typography>
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
                          key={`t_${index}`}
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
                                    {addElipsisBetweenLength(
                                      row._id as string,
                                      16,
                                      2
                                    )}
                                  </Typography>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Typography className="title">
                                    Trades
                                  </Typography>
                                  <Typography className="description">
                                    {row?.totalTradesCount}
                                  </Typography>
                                </ListItem>
                                <ListItem disablePadding>
                                  <Typography className="title">
                                    Wins
                                  </Typography>
                                  <Typography className="description">
                                    {row?.totalWinsCount}
                                  </Typography>
                                </ListItem>
                              </List>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </HistoryTableWrap>
  );
}
