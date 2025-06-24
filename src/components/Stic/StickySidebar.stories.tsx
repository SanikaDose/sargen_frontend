import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import StickySidebar from './StickySidebar';

const meta: Meta<typeof StickySidebar> = {
  title: 'Components/StickySidebar',
  component: StickySidebar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof StickySidebar>;

export const MobileView: Story = {
  render: () => <StickySidebar />,
};
