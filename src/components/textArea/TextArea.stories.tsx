// components/textArea/TextArea.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import TextArea from './TextArea';
const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    toolbar: {
      control: 'radio',
      options: ['full'],
    },
    readOnly: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    value: 'Hello, Welcome to Elansol Technologies!',
    toolbar: 'full',
    placeholder: 'Type here...',
  },
};
