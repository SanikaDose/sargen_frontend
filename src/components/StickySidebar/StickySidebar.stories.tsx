import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import StickySidebar from './StickySidebar';

const meta: Meta<typeof StickySidebar> = {
  title: 'Components/StickySidebar',
  component: StickySidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: {
        type: 'radio',
        options: ['left', 'right'],
      },
      description: 'Determines which side the sidebar sticks to',
      defaultValue: 'right',
    },
  },
};

export default meta;

type Story = StoryObj<typeof StickySidebar>;

export const DefaultRight: Story = {
  args: {
    side: 'right',
  },
};

export const StickToLeft: Story = {
  args: {
    side: 'left',
  },
};

export const MobilePreview: Story = {
  args: {
    side: 'left',
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};
