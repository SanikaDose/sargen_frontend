// ProgressCircle.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ProgressCircle from './ProgressCircle';

const meta: Meta<typeof ProgressCircle> = {
  title: 'Components/ProgressCircle',
  component: ProgressCircle,
  tags: ['autodocs'],
  argTypes: {
    value: {
       control: { type: 'range', min: 0, max: 100 },
    },
    size: {
      control: 'number',
    },
    thickness: {
      control: 'number',
    },
    color: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressCircle>;

export const Default: Story = {
  args: {
    value: 75,
    size: 100,
    thickness: 4,
    color: '#1976d2',
  },
};
