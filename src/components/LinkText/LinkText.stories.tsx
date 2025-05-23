// src/components/linkText/LinkText.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { LinkText } from './LinkText';

const meta: Meta<typeof LinkText> = {
  title: 'Components/LinkText',
  component: LinkText,
  tags: ['autodocs'],
  argTypes: {
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinkText>;

export const Default: Story = {
  args: {
    href: '#',
    underline: 'hover',
    children: 'Hover Underline Link',
  },
};

export const NoUnderline: Story = {
  args: {
    href: '#',
    underline: 'none',
    children: 'No Underline Link',
  },
};

export const AlwaysUnderline: Story = {
  args: {
    href: '#',
    underline: 'always',
    children: 'Always Underline Link',
  },
};
