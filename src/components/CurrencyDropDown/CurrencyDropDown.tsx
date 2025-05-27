import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  IconButton,
} from '@mui/material';
import styles from './style.module.css'; // ✅ import the CSS module

const currencies = ['USD', 'EUR', 'INR', 'JPY', 'UAE'];
const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  INR: '₹',
  JPY: '¥',
  UAE: 'د.إ'
};

const CurrencyValueSelector: React.FC = () => {
  const [currency, setCurrency] = useState('USD');
  const [value, setValue] = useState('10');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleCurrencyChange = (event: any) => {
    setCurrency(event.target.value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const isValid = /^(\d+\.?\d{0,2}|\.\d{0,2})?$/.test(input);
    if (isValid) {
      setValue(input);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (val: string) => {
    setValue(val);
    setAnchorEl(null);
  };

  return (
    <Box className={styles.container}>
      <FormControl className={styles.formControl}>
        <InputLabel id="currency-label">Currency</InputLabel>
        <Select
          labelId="currency-label"
          value={currency}
          label="Currency"
          onChange={handleCurrencyChange}
          input={
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">
                  {currencySymbols[currency]}
                </InputAdornment>
              }
              label="Currency"
            />
          }
        >
          {currencies.map((cur) => (
            <MenuItem key={cur} value={cur}>
              {cur}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        className={styles.textField}
        label="Value"
        type="text"
        value={value}
        onChange={handleValueChange}
        inputProps={{
          inputMode: 'decimal',
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleMenuClick}></IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default CurrencyValueSelector;
