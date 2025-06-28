// PreviewSideBox.stories.tsx
import React from 'react';
import PreviewSideBox from './PreviewSideBox';

// Storybook metadata
const previewSideBoxMeta = {
  title: 'Components/PreviewSideBox',
  component: PreviewSideBox,
  tags: ['autodocs'], // Optional: enables Docs addon
};

// Default story
export const Default = () => <PreviewSideBox />;

export default previewSideBoxMeta;
