import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing global toast notifications.
 *
 * - Controls the visibility, message, and severity of toast alerts.
 * - Provides actions to show and hide toast messages across the app.
 *
 * @author Pranay Mahalle
 * @date 2025-04-18
 */

type AlertSeverity = "success" | "info" | "warning" | "error";

type toasterValues = {
  open: boolean;
  message: string;
  severity: AlertSeverity;
};

const initialState: toasterValues = {
  open: false,
  message: "",
  severity: "success",
};

const toasterSlice = createSlice({
  name: "toasterState",
  initialState,
  reducers: {
    /**
     * Displays a toast message.
     *
     * - Sets `open` to true.
     * - Updates `message` and `severity` based on the payload.
     *
     * @param {Object} action.payload - Toast content
     * @param {string} action.payload.message - The message to display
     * @param {AlertSeverity} [action.payload.severity="success"] - Type of alert (success, info, warning, error)
     */

    showToast: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || "success";
    },
    /**
     * Hides the toast message.
     *
     * - Sets `open` to false.
     * - Clears the message.
     */

    hideToast: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { showToast, hideToast } = toasterSlice.actions;
export default toasterSlice.reducer;
