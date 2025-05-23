import { Meta, StoryObj } from '@storybook/react';
import Stepper from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
};

export default meta;

type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: {
    steps: [{ label: 'Test' }, { label: 'Test2' }, { label: 'Test3' }],
  },
};
