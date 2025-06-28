import { Meta, StoryObj } from '@storybook/react';
import ButtonWithLoader from './buttonWithLoader';

const meta: Meta<typeof ButtonWithLoader> = {
  title: 'Components/ButtonWithLoader',
  component: ButtonWithLoader,
  tags: ['autodocs'],
  args: {
    label: 'Submit',
    loading: false,
    loaderSize: 20,
    loaderThickness: 4,
    loaderColor: 'inherit',
    width: '160px',
    height: '44px',
    backgroundColor: '#1976d2',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof ButtonWithLoader>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const CustomSizeColor: Story = {
  args: {
    loading: true,
    loaderSize: 30,
    loaderThickness: 5,
    loaderColor: 'secondary',
  },
};

export const CustomDimensions: Story = {
  args: {
    width: '200px',
    height: '50px',
    backgroundColor: '#2e7d32',
  },
};
