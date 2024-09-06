/* eslint-disable no-nested-ternary */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable react/no-array-index-key */

import { IaffiliateData } from "@/api/functions/game.api";
import {
  addElipsisBetweenLength,
  customLink
} from "@/lib/functions/_helpers.lib";
import { HistoryTableWrap } from "@/styles/StyledComponents/HistoryTableWrap";
import CopyIcon from "@/ui/Icons/CopyIcon";
import SliderRightArrow from "@/ui/Icons/SliderRightArrow";
import SortIcon from "@/ui/Icons/SortIcon";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
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

import React, { useState } from "react";
import { toast } from "sonner";

export interface TableData extends IaffiliateData {
  // date: string;
  // name: string;
  // link: string;
  // friends: number;
  // earnToday: number;
  // earningTotal: number;
}
interface HeadCell {
  id: keyof TableData;
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
    id: "link_name",
    numeric: true,
    disablePadding: false,
    label: "Name",
    isSort: false
  },
  // {
  //   id: "walletId",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Link",
  //   isSort: false
  // },
  {
    id: "total_affiliated_users",
    numeric: true,
    disablePadding: false,
    label: "Friends",
    isSort: true
  },
  {
    id: "total_earnings_todays",
    numeric: true,
    disablePadding: false,
    label: "Earn today",
    isSort: true
  },
  {
    id: "total_earnings",
    numeric: true,
    disablePadding: false,
    label: "Earnings total",
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

            sx={{
              display:
                headCell.id === "createdAt" ||
                headCell.id === "affiliate_link" ||
                headCell.id === "total_affiliated_users"
                  ? { md: "table-cell", xs: "none" }
                  : {},

              textAlign: headCell.id === "link_name" ? "left !important" : ""
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

interface ReferralTableProps {
  affliateList: IaffiliateData[] | [];
  isLoading: boolean;
  sortTable: (data: keyof IaffiliateData) => void;
}

export default function ReferralTable({
  affliateList,
  isLoading,
  sortTable
}: ReferralTableProps) {
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof TableData
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

  const handleClick = (value: string) => {
    navigator.clipboard.writeText(customLink(value));
    toast.success("Link Copied!");
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
            {!isLoading ? (
              <TableBody className="table_section">
                {affliateList.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <>
                      <TableRow hover key={index}>
                        <TableCell
                          id={labelId}
                          align="left"
                          sx={{ display: { xs: "none", md: "table-cell" } }}
                        >
                          <Typography variant="body1">
                            {moment(row.createdAt).format("DD.MM.YYYY")}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "left !important"
                          }}
                        >
                          {/* <Link href={row.walletId} className="name_link">
                              Link Name
                            </Link> */}
                          {row?.link_name}
                          {/* {row?.link_name
                            ? row?.link_name
                            : `Link Name #${index + 1}`} */}
                          <Button
                            className="name_link"
                            onClick={() => {
                              handleClick(row.affiliate_link as string);
                            }}
                          >
                            <CopyIcon />
                          </Button>
                        </TableCell>

                        {/* <TableCell
                          align="center"
                          sx={{ display: { xs: "none", md: "table-cell" } }}
                        >
                          <Typography variant="body1">
                            {addElipsisBetweenLength(
                              row.walletId as string,
                              16,
                              2
                            )}
                          </Typography>
                        </TableCell> */}
                        <TableCell
                          align="center"
                          sx={{ display: { xs: "none", md: "table-cell" } }}
                        >
                          <Typography variant="body1">
                            {row.total_affiliated_users}
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography className="turnovertext">
                            {row.total_earnings_todays}
                          </Typography>
                        </TableCell>

                        <TableCell
                          align="center"
                          sx={{ border: "0 !important" }}
                        >
                          <Typography className="prizetext">
                            ${row.total_earnings}
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
                                <Typography className="title">Date</Typography>
                                <Typography className="description">
                                  {moment(row.createdAt).format("DD.MM.YYYY")}
                                </Typography>
                              </ListItem>
                              <ListItem disablePadding>
                                <Typography className="title">Link</Typography>
                                <Typography className="description">
                                  {addElipsisBetweenLength(
                                    row.walletId as string,
                                    16,
                                    2
                                  )}
                                </Typography>
                              </ListItem>
                              <ListItem disablePadding>
                                <Typography className="title">
                                  Friends
                                </Typography>
                                <Typography className="description">
                                  {row?.total_affiliated_users}
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
                  <TableCell colSpan={6}>No Data Found</TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </HistoryTableWrap>
  );
}
