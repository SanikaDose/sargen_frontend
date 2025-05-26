// OverallCostProfileCard.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import OverallCostProfileCard from './OverallCostProfileCard';

const meta: Meta<typeof OverallCostProfileCard> = {
  title: 'Components/OverallCostProfileCard',
  component: OverallCostProfileCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OverallCostProfileCard>;

export const Default: Story = {
  args: {
    fieldName: 'Total Cost',
    value: '500',
  },
};

export const WithCustomColors: Story = {
  args: {
    fieldName: 'Remaining Budget',
    value: '2000',
    boxBackgroundColor: '#e0f7fa',
    textColor: '#00796b',
  },
};

export const Warning: Story = {
  args: {
    fieldName: 'Over Budget',
    value: '1200',
    boxBackgroundColor: '#ffebee',
    textColor: '#c62828',
  },
};
