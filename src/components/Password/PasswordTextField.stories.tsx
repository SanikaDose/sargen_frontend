// stories/PasswordTextField.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';
import { PasswordTextField } from '@/components/Password/Password';
import { PasswordTextFieldProps } from './Password.types';
const meta: Meta<typeof PasswordTextField> = {
  title: 'Components/PasswordTextField',
  component: PasswordTextField,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PasswordTextField>;

const Wrapper = (args: PasswordTextFieldProps) => {
  const methods = useForm({ defaultValues: { password: '' } });
  //control={methods.control}
  return (
    <FormProvider {...methods}>
      <form>
        <PasswordTextField {...args} name="password" />
      </form>
    </FormProvider>
  );
};

export const Default: Story = {
  render: (args) => <Wrapper {...args} />,
  args: {
    showStrengthIndicator: true,
    showPasswordToggle: true,
    showLockIcon: true,
    label: 'Password',
    placeholder: 'Enter your password',
    autoComplete: 'new-password',
  },
};
