import { CupSecWrapper } from "@/styles/StyledComponents/CupSecWrapper";
import { primaryColors } from "@/themes/_muiPalette";
import CupIcon from "@/ui/Icons/CupIcon";
import StockDownIcon from "@/ui/Icons/StockDownIcon";
import StockUpIcon from "@/ui/Icons/StockUpIcon";
import UserIcon from "@/ui/Icons/UserIcon";
import { Box, Button, List, ListItem, Stack, Typography } from "@mui/material";

const CupSec = () => {
  return (
    <CupSecWrapper>
      <Stack direction="row" alignItems="center" flexWrap="wrap">
        <Box className="cup_sec_left">
          <List disablePadding>
            <ListItem disablePadding>
              <i>
                <CupIcon />
              </i>
              <Typography>
                <Typography variant="caption" className="title">
                  All time
                </Typography>
                <Typography variant="caption" className="amount">
                  468,006,240
                </Typography>
              </Typography>
            </ListItem>
            <ListItem disablePadding>
              <i>
                <UserIcon />
              </i>
              <Typography>
                <Typography variant="caption" className="title">
                  Live Players
                </Typography>
                <Typography variant="caption" className="amount">
                  491
                </Typography>
              </Typography>
            </ListItem>
          </List>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          className="cup_sec_rgt"
        >
          <Button>
            <StockUpIcon IconColor={primaryColors?.color34d16a} />
          </Button>
          <Button>
            <StockDownIcon IconColor={primaryColors?.colorE85151} />
          </Button>
          <Button>
            <StockDownIcon IconColor={primaryColors?.colorE85151} />
          </Button>
        </Stack>
      </Stack>
    </CupSecWrapper>
  );
};

export default CupSec;
