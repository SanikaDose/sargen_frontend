// stories/FileUploadButton.stories.tsx
import { Meta, StoryObj } from '@storybook/react';

import SideBar from './SideBar';

const meta: Meta<typeof SideBar> = {
  title: 'Components/SideBar',
  component: SideBar,
};

export default meta;

type Story = StoryObj<typeof SideBar>;

export const Default: Story = {
  args: {
    open: true,
    drawerList: ['All mail', 'Trash', 'Spam'],
  },
};
