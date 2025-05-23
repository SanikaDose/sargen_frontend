import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NextPrevButton } from './NextPrevButton';

const meta: Meta<typeof NextPrevButton> = {
  title: 'Components/CustomButton',
  component: NextPrevButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'contained', 'outlined'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'inherit'],
    },
    arrow: {
      control: 'select',
      options: ['left', 'right', 'up', 'down', undefined],
    },
    children: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof NextPrevButton>;

export const ArrowLeft: Story = {
  args: {
    children: 'Go Back',
    color: 'secondary',
    variant: 'text',
    arrow: 'left',
  },
};

export const ArrowRight: Story = {
  args: {
    children: 'Continue',
    color: 'success',
    variant: 'contained',
    arrow: 'right',
  },
};

export const ArrowUp: Story = {
  args: {
    children: 'Scroll Up',
    color: 'info',
    variant: 'outlined',
    arrow: 'up',
  },
};

export const ArrowDown: Story = {
  args: {
    children: 'Scroll Down',
    color: 'warning',
    variant: 'outlined',
    arrow: 'down',
  },
};
