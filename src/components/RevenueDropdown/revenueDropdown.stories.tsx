import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './revenueDropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const SingleSelect: Story = {
  args: {
    placeholder: 'Select Revenue Unit',
    multiSelect: false,
    options: [
      { label: 'Thousand', value: '1000' },
      { label: 'Lakh', value: '100000' },
      { label: 'Crore', value: '10000000' },
    ],
  },
};

export const MultiSelect: Story = {
  args: {
    placeholder: 'Select Revenue Units',
    multiSelect: true,
    options: [
      { label: 'Thousand', value: '1000' },
      { label: 'Lakh', value: '100000' },
      { label: 'Crore', value: '10000000' },
    ],
  },
};
