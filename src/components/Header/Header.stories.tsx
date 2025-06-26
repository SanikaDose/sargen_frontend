import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: 'My Application',
  },
};

export const WithUser: Story = {
  args: {
    title: 'Dashboard',
    onMenuClick: () => alert('Menu clicked'),
    user: {
      name: 'Jane Doe',
      designation: 'Product Manager',
      avatarUrl: 'https://i.pravatar.cc/150?img=8',
    },
  },
};
