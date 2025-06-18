import React, { useState } from 'react';
import { Box, FormControl, MenuItem, OutlinedInput, Select, InputAdornment } from '@mui/material';
import styles from './style.module.css';

type CurrencyValueSelectorProps = {
  currenciesWithSymbols?: Record<string, string>;
  defaultCurrency?: string;
  placeholder?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  backgroundColor?: string;
};

const fallbackCurrenciesWithSymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  INR: '₹',
  JPY: '¥',
  AED: 'د.إ',
  BTC: '₿',
  DOGE: 'Ð',
};

const CurrencyValueSelector: React.FC<CurrencyValueSelectorProps> = ({
  currenciesWithSymbols,
  placeholder = 'Select Currency',
  width,
  height,
  borderRadius,
  backgroundColor,
}) => {
  const currenciesData =
    currenciesWithSymbols && Object.keys(currenciesWithSymbols).length > 0
      ? currenciesWithSymbols
      : fallbackCurrenciesWithSymbols;

  const currencyList = Object.keys(currenciesData);
  const [currency, setCurrency] = useState('');

  const handleCurrencyChange = (event: any) => {
    setCurrency(event.target.value);
  };

  return (
    <Box
      className={styles.container}
      sx={{
        padding: 2,
        display: 'flex',
        gap: 2,
      }}
    >
      <FormControl fullWidth variant="outlined">
        <Select
          displayEmpty
          value={currency}
          onChange={handleCurrencyChange}
          input={
            <OutlinedInput
              placeholder={placeholder}
              startAdornment={
                currency && currenciesData[currency] ? (
                  <InputAdornment position="start">{currenciesData[currency]}</InputAdornment>
                ) : undefined
              }
              sx={{
                width,
                height,
                borderRadius: '16px',
                backgroundColor,
              }}
            />
          }
        >
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
          {currencyList.map((cur) => (
            <MenuItem key={cur} value={cur}>
              {cur}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CurrencyValueSelector;
