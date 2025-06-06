import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CardsBar, { CardsBarCard } from './CardsBar';

const meta: Meta<typeof CardsBar> = {
  title: 'Dashboard/CardsBar',
  component: CardsBar,
};

export default meta;

type Story = StoryObj<typeof CardsBar>;

const sampleCards: CardsBarCard[] = [
  {
    title: 'Pending Assessments',
    value: 8,
    color: 'primary.main',
  },
  {
    title: 'Upcoming Meetings',
    value: 2,
    color: 'secondary.main',
  },
  {
    title: 'Completed Reviews',
    value: 14,
    color: 'success.main',
  },
  {
    title: 'Average Score',
    value: '87%',
    color: 'info.main',
  },
  {
    title: 'Recent Feedback',
    value: '“Great attention to detail.”',
    description: '— Manager',
    color: 'text.primary',
  },
  {
    title: 'Pending Assessments',
    value: 8,
    color: 'primary.main',
  },
  {
    title: 'Upcoming Meetings',
    value: 2,
    color: 'secondary.main',
  },
  {
    title: 'Completed Reviews',
    value: 14,
    color: 'success.main',
  },
  {
    title: 'Average Score',
    value: '87%',
    color: 'info.main',
  },
  {
    title: 'Recent Feedback',
    value: '“Great attention to detail.”',
    description: '— Manager',
    color: 'text.primary',
  },
];

export const Default: Story = {
  args: {
    heading: 'Welcome, Assessor!',
    cards: sampleCards,
  },
};
