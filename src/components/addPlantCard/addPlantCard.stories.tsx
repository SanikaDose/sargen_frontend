import type { Meta, StoryObj } from '@storybook/react';
import AddPlantCard from './AddPlantCard';

const meta: Meta<typeof AddPlantCard> = {
  title: 'Components/AddPlantCard',
  component: AddPlantCard,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AddPlantCard>;

export const Default: Story = {};
Default.args = {
  label: 'Click To Add Plant',
  backgroundColor: '#D4D4D4',
  onClick: () => alert('Add Plant Card Clicked'),
};
