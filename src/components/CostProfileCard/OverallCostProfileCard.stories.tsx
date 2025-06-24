// OverallCostProfileCard.stories.tsx

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
  },
};

export const WithCustomColors: Story = {
  args: {
    fieldName: 'Remaining Budget',
    boxBackgroundColor: '#e0f7fa',
    textColor: '#00796b',
  },
};

export const Warning: Story = {
  args: {
    fieldName: 'Over Budget',
    boxBackgroundColor: '#ffebee',
    textColor: '#c62828',
  },
};
