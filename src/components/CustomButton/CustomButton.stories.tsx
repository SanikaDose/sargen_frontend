import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NextPrevButton } from './CustomButton';

// const meta: Meta<typeof NextPrevButton> = {
//   title: 'Components/CustomButton',
//   component: NextPrevButton,
//   tags: ['autodocs'],
//   argTypes: {
//     variant: {
//       control: 'select',
//       options: ['text', 'contained', 'outlined'],
//     },
//     color: {
//       control: 'text',
//     },
//     icon: {
//       control: 'select',
//       options: ['left', 'right', 'alert', 'success', undefined],
//     },
//     children: {
//       control: 'text',
//     },
//   },
// };
// export default meta;

// type Story = StoryObj<typeof NextPrevButton>;

// export const ArrowLeft: Story = {
//   args: {
//     children: 'Go Back',
//     color: 'secondary',
//     variant: 'text',
//     icon: 'left',
//   },
// };

// export const ArrowRight: Story = {
//   args: {
//     children: 'Continue',
//     color: 'success',
//     variant: 'contained',
//     icon: 'right',
//   },
// };

// // export const ArrowUp: Story = {
// //   args: {
// //     children: 'Scroll Up',
// //     color: 'info',
// //     variant: 'outlined',
// //     arrow: 'up',
// //   },
// // };

// // export const ArrowDown: Story = {
// //   args: {
// //     children: 'Scroll Down',
// //     color: 'warning',
// //     variant: 'outlined',
// //     arrow: 'down',
// //   },
// // };

const meta: Meta<typeof NextPrevButton> = {
  title: 'Components/NextPrevButton',
  component: NextPrevButton,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['text', 'contained', 'outlined'],
    },
    color: {
      control: 'color',
    },
    icon: {
      control: 'select',
      options: ['left', 'right', 'alert', 'success', undefined],
    },
    height: {
      control: { type: 'text' },
      description: 'Height of the button (e.g., "48px" or 48)',
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the button (e.g., "200px" or 200)',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof NextPrevButton>;

export const Default: Story = {
  args: {
    children: 'Click Me',
    variant: 'contained',
    color: '#10557C',
    icon: 'right',
    height: '48px',
    width: '160px',
  },
};

export const IconOnly: Story = {
  args: {
    icon: 'success',
    variant: 'outlined',
    color: '#28a745',
    height: '48px',
    width: '48px',
  },
};

export const CustomSize: Story = {
  args: {
    children: 'Custom Size',
    variant: 'contained',
    icon: 'alert',
    color: '#f44336',
    height: '60px',
    width: '220px',
  },
};
