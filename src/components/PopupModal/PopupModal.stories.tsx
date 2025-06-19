// components/PopupModal/PopupModal.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { PopupModal } from './PopupModal';

const meta: Meta<typeof PopupModal> = {
  title: 'Components/PopupModal',
  component: PopupModal,
  tags: ['autodocs'],
} satisfies Meta<typeof PopupModal>;

export default meta;

type Story = StoryObj<typeof PopupModal>;

export const Default: Story = {
  args: {
    label: 'Delete Confirmation',
    text: 'Are you sure you want to delete this item? This action cannot be undone.',
    primaryButtonText: 'Delete',
    secondaryButtonText: 'Cancel',
    onPrimaryClick: () => alert('Deleted!'),
    onSecondaryClick: () => alert('Cancelled!'),
  },
};

export const ConfirmOnly: Story = {
  args: {
    label: 'Proceed?',
    text: 'Do you want to continue with the operation?',
    primaryButtonText: 'Yes',
    secondaryButtonText: 'No',
    onPrimaryClick: () => alert('Confirmed'),
    onSecondaryClick: () => alert('Dismissed'),
  },
};
