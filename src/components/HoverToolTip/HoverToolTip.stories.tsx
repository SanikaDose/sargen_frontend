import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TooltipLabel from './HoverToolTip';

const meta: Meta<typeof TooltipLabel> = {
  title: 'Components/TooltipLabel',
  component: TooltipLabel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof TooltipLabel>;

export const WithButton: Story = {
  args: {
    label: 'tooltip hover',
    children: <button>click me</button>,
  },
};
