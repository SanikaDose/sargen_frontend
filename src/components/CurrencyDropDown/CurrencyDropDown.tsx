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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const currencies = ['USD', 'EUR', 'INR', 'JPY'];
const predefinedValues = ['10', '20', '50', '100'];
const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  INR: '₹',
  JPY: '¥',
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

  // Regex: optional digits, optional 1 decimal point, max 2 decimal digits
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
    <Box display="flex" gap={2}>
      {/* Currency with symbol */}
      <FormControl sx={{ minWidth: 200 }}>
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

      {/* Input field + dropdown menu */}
     <TextField
  label="Value"
  type="text" // Use text to remove spinner arrows
  value={value}
  onChange={handleValueChange}
  sx={{ minWidth: 200 }}
  inputProps={{
    inputMode: 'decimal', // numeric keyboard on mobile
  }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={handleMenuClick}>
      
        </IconButton>
      </InputAdornment>
    ),
  }}
/>


      {/* Dropdown menu for values */}
      {/* <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {predefinedValues.map((val) => (
          <MenuItem key={val} onClick={() => handleMenuItemClick(val)}>
            {val}
          </MenuItem>
        ))}
      </Menu> */}
    </Box>
  );
};

export default CurrencyValueSelector;
