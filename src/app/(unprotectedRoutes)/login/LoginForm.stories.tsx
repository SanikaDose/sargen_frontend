'use client';

import { Meta, StoryObj } from '@storybook/react';
import LoginForm from './page';

const meta: Meta<typeof LoginForm> = {
  title: 'Components/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {
    loading: false,
    onSubmit: async (data: any) => {
      alert('Heelo');
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    onSubmit: async (data: any) => {
      console.log('Submitted while loading:', data);
    },
  },
};
