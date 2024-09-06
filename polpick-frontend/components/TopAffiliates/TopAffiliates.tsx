/* eslint-disable import/order */
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled
} from "@mui/material";
// eslint-disable-next-line import/newline-after-import
import { CustomTableContainer } from "@/styles/StyledComponents/CustomTableContainer";
import CommonHeaderLanding from "../CommonHeaderLanding/CommonHeaderLanding";
// eslint-disable-next-line import/order
import CopySmallIcon from "@/ui/Icons/CopySmallIcon";
import CrownBronze from "@/ui/Icons/CrownBronze";
import CrownGold from "@/ui/Icons/CrownGold";
import CrownSilver from "@/ui/Icons/CrownSilver";
import PeopleSmallIcon from "@/ui/Icons/PeopleSmallIcon";

const rows = [
  {
    affiliate: "0x157435436456d3f...8e",
    user: "147",
    paid: "$7378",
    crowns: <CrownGold />
  },
  {
    affiliate: "0x157435436456d3f...8e",
    user: "147",
    paid: "$7378",
    crowns: <CrownSilver />
  },
  {
    affiliate: "0x157435436456d3f...8e",
    user: "147",
    paid: "$7378",
    crowns: <CrownBronze />
  },
  {
    affiliate: "0x157435436456d3f...8e",
    user: "147",
    paid: "$7378"
  },
  {
    affiliate: "0x157435436456d3f...8e",
    user: "147",
    paid: "$7378"
  },
  {
    affiliate: "0x157435436456d3f...8e",
    user: "147",
    paid: "$7378"
  },
  {
    affiliate: "0x157435436456d3f...8e",
    user: "147",
    paid: "$7378"
  },
  {
    affiliate: "0x157435436456d3f...8e",
    user: "147",
    paid: "$7378"
  },
  {
    affiliate: "0x157435436456d3f...8e",
    user: "147",
    paid: "$7378"
  },
  {
    affiliate: "0x157435436456d3f...8e",
    user: "147",
    paid: "$7378"
  }
];
export const TopAffiliatesWrap = styled(Box)`
  padding: 100px 0;
`;
export const TopAffiliates = () => {
  return (
    <TopAffiliatesWrap>
      <Container fixed>
        <CommonHeaderLanding
          mainTitle="Top affiliates"
          subTitle="See the leaderboard"
        />
        <CustomTableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell># </TableCell>
                <TableCell>Affiliate</TableCell>
                <TableCell>Brought users</TableCell>
                <TableCell>Winnings Paid </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" className="crown">
                    <Typography variant="body1">
                      {index + 1} <i>{row.crowns}</i>
                    </Typography>
                  </TableCell>
                  <TableCell align="center" className="affiliate">
                    <Typography variant="body1">
                      {row.affiliate}{" "}
                      <i>
                        <CopySmallIcon />
                      </i>
                    </Typography>
                  </TableCell>
                  <TableCell align="center" className="people">
                    <Typography variant="body1">
                      <i>
                        <PeopleSmallIcon />
                      </i>
                      {row.user}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" className="paid">
                    {row.paid}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CustomTableContainer>
      </Container>
    </TopAffiliatesWrap>
  );
};
