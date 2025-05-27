// stories/FileUploadButton.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import FileUploadButton from './FileuploadButton';

const meta: Meta<typeof FileUploadButton> = {
  title: 'Components/FileUploadButton',
  component: FileUploadButton,
};

export default meta;

type Story = StoryObj<typeof FileUploadButton>;

export const Default: Story = {
  args: {
    label: 'Upload File',
    onFileSelect: (file: unknown) => alert(`Selected file: ${file}`),
    accept: '.png,.jpg,.jpeg,.pdf',
    size: 'medium',
    iconSize: '100',
  },
};
