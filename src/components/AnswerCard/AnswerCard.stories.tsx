import type { Meta, StoryObj } from '@storybook/react';
import AnswerCard from './AnswerCard';

const meta: Meta<typeof AnswerCard> = {
  title: 'Components/AnswerCard',
  component: AnswerCard,
  tags: ['autodocs'],
  argTypes: {
    answerNumber: { control: 'number' },
    answerText: { control: 'text' },
    isSelected: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof AnswerCard>;

export const Default: Story = {
  args: {
    answerNumber: 1,
    answerText: 'How is product design and work instructions transferred to manufacturing?',
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    answerNumber: 2,
    answerText: 'Selected answer example showing blue background and white text.',
    isSelected: true,
  },
};

export const LongText: Story = {
  args: {
    answerNumber: 3,
    answerText:
      'This is a longer version of the answer to check how the component handles multiline wrapping and spacing for very long text inputs.',
    isSelected: false,
  },
};
