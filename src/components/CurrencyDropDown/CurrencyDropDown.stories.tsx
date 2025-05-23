// src/components/CurrencyValueSelector/CurrencyValueSelector.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CurrencyValueSelector from './CurrencyDropDown';

const meta: Meta<typeof CurrencyValueSelector> = {
  title: 'Components/CurrencyValueSelector',
  component: CurrencyValueSelector,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CurrencyValueSelector>;

export const Default: Story = {};
