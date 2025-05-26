import type { Meta, StoryObj } from '@storybook/react';
import imageUploader from './imageUpload';

const meta: Meta<typeof imageUploader> = {
  title: 'Components/imageUploader',
  component: imageUploader,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof imageUploader>;

export const Default: Story = {};
