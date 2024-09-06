import React from "react";
import { SnackbarProvider } from "notistack";

type Props = {
  children: JSX.Element,
};

const ToastifyProvider =(props:Props) => {
  const {children}=props;
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      preventDuplicate
    >
      {children}
    </SnackbarProvider>
  );
};

export default ToastifyProvider;
