// components/textArea/TextArea.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import QuillTextArea from './QuillTextArea';
const meta: Meta<typeof QuillTextArea> = {
  title: 'Components/QuillTextArea',
  component: QuillTextArea,
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
} satisfies Meta<typeof QuillTextArea>;

export default meta;

type Story = StoryObj<typeof QuillTextArea>;

export const Default: Story = {
  args: {
    value: 'Hello, Welcome to Elansol Technologies!',
    toolbar: 'full',
    placeholder: 'Type here...',
  },
};
