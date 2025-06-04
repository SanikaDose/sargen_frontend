// stories/FileUploadButton.stories.tsx
import { Meta, StoryObj } from '@storybook/react';

import SearchAppBar from './SearchInput';

const meta: Meta<typeof SearchAppBar> = {
  title: 'Components/SearchInput',
  component: SearchAppBar,
};

export default meta;

type Story = StoryObj<typeof SearchAppBar>;
