// components/InfoBox/InfoBox.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import InfoBox from './InfoBox';

const meta: Meta<typeof InfoBox> = {
  title: 'Components/InfoBox',
  component: InfoBox,
  tags: ['autodocs'],
} satisfies Meta<typeof InfoBox>;

export default meta;

type Story = StoryObj<typeof InfoBox>;

export const Default: Story = {
  args: {
    heading: 'About Industry',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac nulla arcu. Nam accumsan vel lectus nec ullamcorper. Sed euismod ultrices velit, nec dignissim tortor aliquam eu. Praesent volutpat tortor a mi molestie blandit. Nulla euismod tortor a luctus maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio enim, ullamcorper ornare egestas in, tristique non velit. Sed molestie felis id quam cursus elementum. Curabitur lectus sapien, placerat vel nulla ut, euismod rhoncus nulla. Sed convallis vulputate purus, at varius nisl efficitur cursus. Pellentesque tincidunt, velit id vulputate semper, felis augue scelerisque ipsum, a tincidunt sapien lacus at leo. Etiam fringilla elit velit, nec mattis orci fermentum ut. In ut sapien ut ipsum posuere faucibus sit amet malesuada metus. Donec volutpat magna sed molestie placerat.',
  },
};

export const Empty: Story = {
  args: {
    heading: 'About Industry',
    content: '',
  },
};
