import { Meta, StoryObj } from '@storybook/react';
import Loader from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
  args: {
    loading: true,
    size: 40,
    color: 'primary',
    thickness: 3.6,
  },
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {},
};

export const NotLoading: Story = {
  args: {
    loading: false,
  },
};

export const CustomSize: Story = {
  args: {
    size: 60,
  },
};

export const SecondaryColor: Story = {
  args: {
    color: 'secondary',
  },
};

export const ThinLoader: Story = {
  args: {
    thickness: 2,
  },
};
export const WithCustomBackdropColor: Story = {
  args: {
    loading: true,
    backdrop: true,
    backdropColor: 'rgba(255, 0, 0, 0.4)', // red overlay
  },
};
