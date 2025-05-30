"use client";
import * as React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "./toasterSlice";
import { RootState } from "@/store/store";
import styles from "./toaster.module.css";

export default function Toaster() {
  const dispatch = useDispatch();
  const { open, severity, message } = useSelector((state: RootState) => state.toasterGlobal);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(hideToast());
  };

  return (
    <div>
      <Snackbar className={styles.outerSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }} open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
