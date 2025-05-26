// src/components/responsive-tabs/responsive-tabs.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { ResponsiveTabs } from './ResponsiveTabs';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const meta: Meta<typeof ResponsiveTabs> = {
  title: 'Components/ResponsiveTabs',
  component: ResponsiveTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ResponsiveTabs>;

export const Default: Story = {
  args: {
    tabs: [
      { label: 'Overview', icon: <HomeIcon /> },
      { label: 'Features', icon: <InfoIcon /> },
      { label: 'Pricing', icon: <SettingsIcon /> },
      { label: 'Contact', icon: <ContactMailIcon /> },
    ],
  },
};

export const WithDefaultIndex: Story = {
  args: {
    tabs: [
      { label: 'Overview', icon: <HomeIcon /> },
      { label: 'Features', icon: <InfoIcon /> },
      { label: 'Pricing', icon: <SettingsIcon /> },
      { label: 'Contact', icon: <ContactMailIcon /> },
    ],
    defaultIndex: 2,
  },
};

export const WithoutIcons: Story = {
  args: {
    tabs: [{ label: 'Overview' }, { label: 'Features' }, { label: 'Pricing' }, { label: 'Contact' }],
  },
};
