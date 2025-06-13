// Toaster.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Toaster from "./Toaster";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { showToast } from "./toasterSlice";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toaster",
  component: Toaster,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;
export const SuccessToast: Story = {
  render: () => {
    store.dispatch(
      showToast({
        message: "Operation completed successfully!",
        severity: "success",
      })
    );
    return <Toaster />;
  },
};

export const ErrorToast: Story = {
  render: () => {
    store.dispatch(
      showToast({
        message: "Something went wrong!",
        severity: "error",
      })
    );
    return <Toaster />;
  },
};

export const InfoToast: Story = {
  render: () => {
    store.dispatch(
      showToast({
        message: "Just so you know...",
        severity: "info",
      })
    );
    return <Toaster />;
  },
};

export const WarningToast: Story = {
  render: () => {
    store.dispatch(
      showToast({
        message: "Be careful!",
        severity: "warning",
      })
    );
    return <Toaster />;
  },
};
