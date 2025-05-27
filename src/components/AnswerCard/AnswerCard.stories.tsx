import { Meta, StoryObj } from '@storybook/react';
import AnswerCard from './AnswerCard';

const meta: Meta<typeof AnswerCard> = {
  title: 'Components/AnswerCard',
  component: AnswerCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AnswerCard>;

export const Default: Story = {
  args: {
    questionNumber: 1,
    questionText:
      'How is product Design and WORK INSTRUCTIONS transferred to manufacturing so that they know how to produce it?',
  },
};
