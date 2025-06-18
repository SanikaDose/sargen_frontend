import type { Meta, StoryObj } from '@storybook/react';
import PlantInfoCard from './PlantInfoCard';
import defaultImage from '../../../public/images/plant-logo.png';
const meta: Meta<typeof PlantInfoCard> = {
  title: 'Components/PlantInfoCard',
  component: PlantInfoCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PlantInfoCard>;

export const Default: Story = {};

Default.args = {
  data: {
    name: 'Demo Plant',
    plantLogo: defaultImage.src,
    location: 'Mumbai',
    registrationNo: 'REG12345',
    age: 12,
    gstin: 'GSTIN987654',
    revenue: '5000000',
    numberOfEmployees: 150,
    numberOfLines: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    assessmentStartDate: new Date().toISOString(),
    debriefDate: new Date().toISOString(),
    assessmentCompletionPercentage: 75,
  },
  onClick: () => alert('Card clicked!'),
};
