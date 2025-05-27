import { Meta, StoryObj } from '@storybook/react';
import QuestionCard from './QuestionCard';

const meta: Meta<typeof QuestionCard> = {
  title: 'Components/QuestionCard',
  component: QuestionCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof QuestionCard>;

export const Default: Story = {
  args: {
    questionNumber: 1,
    questionText:
      'How is product Design and WORK INSTRUCTIONS transferred to manufacturing so that they know how to produce it?',
  },
};
