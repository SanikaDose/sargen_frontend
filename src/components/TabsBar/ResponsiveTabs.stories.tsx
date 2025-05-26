// src/components/responsive-tabs/responsive-tabs.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { ResponsiveTabs, ResponsiveTabsProps } from './ResponsiveTabs';

const meta: Meta<typeof ResponsiveTabs> = {
  title: 'Components/ResponsiveTabs',
  component: ResponsiveTabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ResponsiveTabs>;

export const Default: Story = {
  args: {
    tabs: ['Overview', 'Features', 'Pricing', 'Contact'],
  },
};

export const WithDefaultIndex: Story = {
  args: {
    tabs: ['Overview', 'Features', 'Pricing', 'Contact'],
    defaultIndex: 2,
  },
};
