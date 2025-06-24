import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: { type: 'object' }, // ✅ Correct type
      description: 'List of options to select from',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text when nothing is selected',
    },
    width: {
      control: { type: 'number' },
      description: 'Width of the Select component',
    },
  },
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    options: ['Oliver Hansen', 'Van Henry', 'April Tucker', 'Ralph Hubbard', 'Omar Alexander'],
    placeholder: 'Select names',
    width: 300,
  },
};
