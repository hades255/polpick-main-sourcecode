import Box from "@mui/material/Box";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ModalCloseIcon from "../Icons/ModalCloseIcon";

const MuiDialog = styled(Dialog)`
  .MuiPaper-root {
    background-color: transparent;
    box-shadow: none;
    filter: none;
    border-radius: 0;
    max-width: 100%;
    position: relative;
    /* .modal_header {
      display: none;
    } */
  }
  .MuiModal-backdrop {
    background: linear-gradient(
      145.86deg,
      rgba(49, 57, 99, 0.8) 4.73%,
      rgba(23, 28, 49, 0.8) 79.8%
    );
    backdrop-filter: blur(5px);
    transform: matrix(1, 0, 0, -1, 0, 0);
  }
  .MuiDialogContent-root {
    padding: 36px 46px;
    background: #354072;
    box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.05);
    border-radius: 32px;
    @media (max-width: 599px) {
      padding: 35px 20px;
    }
  }
`;

interface MuiModalWrapperProps extends DialogProps {
  open: boolean;
  onClose?: () => void;
  scroll?: "paper" | "body";
  children: JSX.Element | JSX.Element[];
  title?: string;
  modalBodyClass?: string;
}

export default function MuiModalWrapper({
  open,
  onClose,
  scroll,
  children,
  title,
  modalBodyClass,
  ...props
}: MuiModalWrapperProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <MuiDialog
      className="hello"
      // fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      scroll={scroll}
      aria-labelledby="responsive-dialog-title"
      {...props}
    >
      <Box className="modal_header">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography>{title}</Typography>
          <IconButton onClick={onClose} autoFocus>
            <ModalCloseIcon />
          </IconButton>
        </Stack>
      </Box>

      <DialogContent className={modalBodyClass}>{children}</DialogContent>
    </MuiDialog>
  );
}
