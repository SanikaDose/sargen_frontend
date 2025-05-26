import React from 'react';
import { Button } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/MUIButton',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'contained', 'outlined'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
    children: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    color: 'secondary',
    variant: 'text',
  },
};

export const SuccessContained: Story = {
  args: {
    children: 'Success',
    color: 'success',
    variant: 'contained',
  },
};

export const ErrorOutlined: Story = {
  args: {
    children: 'Error',
    color: 'error',
    variant: 'outlined',
  },
};
