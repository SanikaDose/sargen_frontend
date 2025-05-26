import type { Meta, StoryObj } from '@storybook/react';
import ImageUploader from './ImageUpload';

const meta: Meta<typeof ImageUploader> = {
  title: 'Components/ImageUploader',
  component: ImageUploader,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ImageUploader>;

export const Default: Story = {};
