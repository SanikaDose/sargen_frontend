// stories/FileUploadButton.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { Mail as MailIcon } from '@mui/icons-material';
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
    drawerList: [
      { label: 'All mail', toNavigate: '/mail', Icon: MailIcon },
      { label: 'Trash', toNavigate: '/trash', Icon: MailIcon },
      { label: 'Spam', toNavigate: '/spam', Icon: MailIcon },
    ],
  },
};
