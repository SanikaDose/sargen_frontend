import type { Meta, StoryObj } from '@storybook/react';
import { CustomButton } from './CustomButton';

const meta: Meta<typeof CustomButton> = {
  title: 'Components/CustomButton',
  component: CustomButton,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['text', 'contained', 'outlined'],
    },
    color: {
      control: 'color',
    },
    icon: {
      control: 'select',
      options: ['left', 'right', 'alert', 'save', 'success','cancel', undefined],
    },
    height: {
      control: { type: 'text' },
      description: 'Height of the button (e.g., "48px" or 48)',
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the button (e.g., "200px" or 200)',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof CustomButton>;

export const Default: Story = {
  args: {
    children: 'Click Me',
    variant: 'contained',
    color: '#10557C',
    icon: 'right',
    height: '48px',
    width: '160px',
  },
};

export const IconOnly: Story = {
  args: {
    icon: 'success',
    variant: 'outlined',
    color: '#28a745',
    height: '48px',
    width: '48px',
  },
};

export const CustomSize: Story = {
  args: {
    children: 'Custom Size',
    variant: 'contained',
    icon: 'alert',
    color: '#f44336',
    height: '60px',
    width: '220px',
  },
};
