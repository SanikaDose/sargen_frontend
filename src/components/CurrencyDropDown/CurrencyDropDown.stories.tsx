import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import DropdownWithLabel from './CurrencyDropDown';

const meta: Meta<typeof DropdownWithLabel> = {
  title: 'Components/DropdownWithLabel',
  component: DropdownWithLabel,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DropdownWithLabel>;
type DropdownWithLabelProps = ComponentProps<typeof DropdownWithLabel>;

const currencyOptions = [
  { name: 'Rupee', code: 'rupee' },
  { name: 'Dollar', code: 'dollar' },
  { name: 'Euro', code: 'euro' },
  { name: 'Yen', code: 'yen' },
  { name: 'Pound', code: 'pound' },
  { name: 'Franc', code: 'franc' },
  { name: 'Won', code: 'won' },
  { name: 'Ruble', code: 'ruble' },
  { name: 'Dinar', code: 'dinar' },
  { name: 'Dirham', code: 'dirham' },
  { name: 'Peso', code: 'peso' },
  { name: 'Lira', code: 'lira' },
  { name: 'Shekel', code: 'shekel' },
  { name: 'Krona', code: 'krona' },
  { name: 'Krone', code: 'krone' },
  { name: 'Ringgit', code: 'ringgit' },
  { name: 'Rial', code: 'rial' },
  { name: 'Kip', code: 'kip' },
  { name: 'Taka', code: 'taka' },
  { name: 'Shilling', code: 'shilling' },
  { name: 'Rand', code: 'rand' },
  { name: 'Kuna', code: 'kuna' },
  { name: 'Forint', code: 'forint' },
  { name: 'Baht', code: 'baht' },
  { name: 'Tugrik', code: 'tugrik' },
  { name: 'Kyat', code: 'kyat' },
  { name: 'Dong', code: 'dong' },
  { name: 'Zloty', code: 'zloty' },
  { name: 'Colon', code: 'colon' },
  { name: 'Cedi', code: 'cedi' },
  { name: 'Guarani', code: 'guarani' },
  { name: 'Leu', code: 'leu' },
  { name: 'Manat', code: 'manat' },
  { name: 'Ouguiya', code: 'oug' },
  { name: 'Ngultrum', code: 'ngultrum' },
  { name: 'Dram', code: 'dram' },
  { name: 'Lilangeni', code: 'lilangeni' },
  { name: 'Pula', code: 'pula' },
  { name: 'Tala', code: 'tala' },
  { name: 'Paanga', code: 'paanga' },
  { name: 'Kina', code: 'kina' },
  { name: 'Dalasi', code: 'dalasi' },
  { name: 'Birr', code: 'birr' },
  { name: 'Ariary', code: 'ariary' },
  { name: 'Rufiyaa', code: 'rufiyaa' },
  { name: 'Vatu', code: 'vatu' },
  { name: 'Loti', code: 'loti' },
  { name: 'Escudo', code: 'escudo' },
  { name: 'Mark', code: 'mark' },
  { name: 'Lev', code: 'lev' },
  { name: 'Somoni', code: 'somoni' },
  { name: 'Lek', code: 'lek' },
  { name: 'Denar', code: 'denar' },
  { name: 'New Shekel', code: 'new_shekel' },
  { name: 'Balboa', code: 'balboa' },
  { name: 'Cordoba', code: 'cordoba' },
  { name: 'Kwanza', code: 'kwanza' },
  { name: 'Yuan', code: 'yuan' },
  { name: 'Tenge', code: 'tenge' },
  { name: 'Som', code: 'som' },
];

const CurrencyDropdownComponent = (args: DropdownWithLabelProps) => {
  const [value, setValue] = useState('');

  return (
    <DropdownWithLabel
      {...args}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export const CurrencyDropdown: Story = {
  render: CurrencyDropdownComponent,
  args: {
    label: 'Select Currency',
    name: 'currency',
    required: true,
    placeholder: 'Choose a currency',
    options: currencyOptions.map((opt) => ({
      label: opt.name,
      value: opt.code,
    })),
  },
};
