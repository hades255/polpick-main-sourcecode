/* eslint-disable import/no-cycle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import { recentGameData } from "@/api/functions/game.api";
import { ToolTipTableContainer } from "@/styles/StyledComponents/ToolTipTableContainer";
import LowerCircuitIcon from "@/ui/Icons/LowerCircuitIcon";
import PrevIcon from "@/ui/Icons/PrevIcon";
import PrevMaxIcon from "@/ui/Icons/PrevMaxIcon";
import UpperCircuitIcon from "@/ui/Icons/UpperCircuitIcon";
import { Button, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

interface ToolTipTablePropType {
  data: recentGameData[];
  incrPage: () => void;
  decrPage: () => void;
  firstPage: () => void;
  lastPage: () => void;
}
export default function ToolTipTable({
  data,
  incrPage,
  decrPage,
  firstPage,
  lastPage
}: ToolTipTablePropType) {
  return (
    <ToolTipTableContainer>
      <Table sx={{ minWidth: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Start </TableCell>
            <TableCell align="left">End</TableCell>
            <TableCell align="left">Time</TableCell>
            <TableCell align="left">Players</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {trendList.map((row, index) => (
            <TableRow key={index} sx={{ "&:last-child td": { border: 0 } }}>
              <TableCell>
                {row?.circuit === "upper" ? (
                  <UpperCircuitIcon />
                ) : row?.circuit === "lower" ? (
                  <LowerCircuitIcon />
                ) : null}
              </TableCell>
              <TableCell align="left">
                <Typography>{row.start}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  className={`${
                    row?.circuit === "upper"
                      ? "upper"
                      : row?.circuit === "lower"
                      ? "lower"
                      : ""
                  }`}
                >
                  {row.end}
                </Typography>
              </TableCell>
              <TableCell align="left">
                {" "}
                <Typography>{row.time}</Typography>
              </TableCell>
              <TableCell align="left">
                {" "}
                <Typography>{row.players}</Typography>
              </TableCell>
            </TableRow>
          ))} */}
          {data.length
            ? data.map((row, index) => (
                <TableRow key={index} sx={{ "&:last-child td": { border: 0 } }}>
                  <TableCell>
                    {row?.result === "up" ? (
                      <UpperCircuitIcon />
                    ) : row?.result === "down" ? (
                      <LowerCircuitIcon />
                    ) : null}
                  </TableCell>
                  <TableCell align="left">
                    <Typography>{row.gameStartPrice}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      className={`${
                        row?.result === "up" ? (
                          <UpperCircuitIcon />
                        ) : row?.result === "down" ? (
                          <LowerCircuitIcon />
                        ) : null
                      }`}
                    >
                      {row.gameEndPrice}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    {" "}
                    <Typography>3m</Typography>
                  </TableCell>
                  <TableCell align="left">
                    {" "}
                    <Typography>
                      {row.usersCount < 9
                        ? "0" + `${row.usersCount}`
                        : row.usersCount}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className="controller_stack"
      >
        <Stack direction="row" alignItems="center" className="controller_left">
          <Button startIcon={<PrevMaxIcon />} onClick={firstPage} />
          <Button startIcon={<PrevIcon />} onClick={decrPage} />
        </Stack>

        <Stack direction="row" alignItems="center" className="controller_rgt">
          <Button startIcon={<PrevIcon />} onClick={incrPage} />
          <Button startIcon={<PrevMaxIcon />} onClick={lastPage} />
        </Stack>
      </Stack>
    </ToolTipTableContainer>
  );
}
