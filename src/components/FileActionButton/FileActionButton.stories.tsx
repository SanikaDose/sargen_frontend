import type { Meta, StoryObj } from '@storybook/react';
import FileActionButton from './FileActionButton';

const meta: Meta<typeof FileActionButton> = {
  title: 'Components/FileActionButton',
  component: FileActionButton,
  argTypes: {
    icon: {
      control: 'select',
      options: ['upload', 'download'],
    },
    showIcon: {
      control: 'boolean',
    },
    showLabel: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: 'color',
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof FileActionButton>;


export const Upload: Story = {
  args: {
    icon: 'upload',
    label: 'Upload File',
    width: '200px',
    height: '50px',
  },
};

export const Download: Story = {
  args: {
    icon: 'download',
    label: 'Download File',
    width: '200px',
    height: '50px',
  },
};

export const IconOnly: Story = {
  args: {
    icon: 'upload',
    width: '48px',
    height: '48px',
  },
};
