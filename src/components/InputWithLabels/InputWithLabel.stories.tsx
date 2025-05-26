import type { Meta, StoryObj } from '@storybook/react';
import { InputWithLabel, InputWithLabelProps } from './InputWithLabel';

const meta: Meta<typeof InputWithLabel> = {
  title: 'Components/InputWithLabel',
  component: InputWithLabel,
  tags: ['autodocs'],
  args: {
    label: 'Full Name',
    name: 'fullName',
    placeholder: 'Enter your full name',
    required: true,
  },
};

export default meta;
type Story = StoryObj<typeof InputWithLabel>;

export const Default: Story = {};

export const EmailInput: Story = {
  args: {
    label: 'Email Address',
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    required: false,
  },
};

export const NumberInput: Story = {
  args: {
    label: 'Age',
    name: 'age',
    type: 'number',
    placeholder: 'Enter your age',
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Username',
    name: 'username',
    defaultValue: 'johndoe123',
  },
};
