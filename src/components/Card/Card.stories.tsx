// components/KPICard/Card.stories.tsx
import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'A reusable KPI selection card using MUI `Card`, `Checkbox`, and `Typography`. It supports toggling via click or checkbox and is styled with CSS Modules.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'KPI label text displayed next to the checkbox.',
    },
    isSelected: {
      control: 'boolean',
      description: 'Controls whether the checkbox is checked.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the card and checkbox if true.',
    },
    onToggle: {
      action: 'toggled',
      description: 'Callback triggered when the card or checkbox is toggled.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Static examples
export const Default: Story = {
  args: {
    label: 'Energy Efficiency',
    isSelected: false,
    isDisabled: false,
  },
};

export const Selected: Story = {
  args: {
    label: 'Water Usage',
    isSelected: true,
    isDisabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Emission Reduction',
    isSelected: false,
    isDisabled: true,
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [isSelected, setIsSelected] = useState(false);
    return <Card label="Interactive KPI" isSelected={isSelected} onToggle={() => setIsSelected((prev) => !prev)} />;
  },
};
