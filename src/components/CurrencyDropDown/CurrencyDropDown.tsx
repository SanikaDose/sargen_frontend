// import React, { useState } from 'react';
// import { Box, FormControl, MenuItem, OutlinedInput, Select, InputAdornment, FormLabel } from '@mui/material';
// import styles from './style.module.css';

// type CurrencyValueSelectorProps = {
//   currenciesWithSymbols?: Record<string, string>;
//   defaultCurrency?: string;
//   placeholder?: string;
//   //width?: string | number;
//   //height?: string | number;
//   // borderRadius?: string | number;
//   //backgroundColor?: string;
//   label: string;
//   name: string;
//   required?: boolean;
// };

// const fallbackCurrenciesWithSymbols: Record<string, string> = {
//   USD: '$',
//   EUR: '€',
//   INR: '₹',
//   JPY: '¥',
//   AED: 'د.إ',
//   BTC: '₿',
//   DOGE: 'Ð',
// };

// const CurrencyValueSelector: React.FC<CurrencyValueSelectorProps> = ({
//   currenciesWithSymbols,
//   placeholder = 'Select Currency',
//   // width,
//   //height,
//   // borderRadius,
//   // backgroundColor,
//   name,
//   label,
//   required,
// }) => {
//   const currenciesData =
//     currenciesWithSymbols && Object.keys(currenciesWithSymbols).length > 0
//       ? currenciesWithSymbols
//       : fallbackCurrenciesWithSymbols;

//   const currencyList = Object.keys(currenciesData);
//   const [currency, setCurrency] = useState('');

//   const handleCurrencyChange = (event: any) => {
//     setCurrency(event.target.value);
//   };

//   return (
//     <Box
//       className={styles.container}
//       sx={{
//         padding: 0,
//         display: 'flex',
//         gap: 2,
//         width: '100%',
//       }}
//     >
//       <FormControl fullWidth margin='normal'>
//         <FormLabel
//           htmlFor={name}
//           sx={{
//             fontWeight: 600,
//             mb: 0,
//             color: '#313131',
//             '&.Mui-focused': { color: '#313131' }, // ✅ prevent blue on focus
//             '&:hover': { color: '#313131' },
//           }}
//         >
//           {label}
//           {required && <span style={{ color: 'red' }}> *</span>}
//         </FormLabel>
//         <Select
//           displayEmpty
//           value={currency}
//           variant="outlined"
//           size="small"
//           fullWidth
//           onChange={handleCurrencyChange}
//           input={
//             <OutlinedInput
//               placeholder={placeholder}
//               startAdornment={
//                 currency && currenciesData[currency] ? (
//                   <InputAdornment position="start">{currenciesData[currency]}</InputAdornment>
//                 ) : undefined
//               }
//               sx={{
//                 //width,
//                 // height,
//                 borderRadius: '16px',
//                 //backgroundColor,
//               }}
//             />
//           }
//         >
//           <MenuItem disabled value="">
//             <em>{placeholder}</em>
//           </MenuItem>
//           {currencyList.map((cur) => (
//             <MenuItem key={cur} value={cur}>
//               {cur}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };

// export default CurrencyValueSelector;

import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  SelectChangeEvent,
} from '@mui/material';

export type DropdownOption = {
  label: string;
  value: string;
};

export interface DropdownWithLabelProps {
  label: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  options: DropdownOption[];
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  onFocus?: () => void;
  inputRef?: React.Ref<any>;
}

const DropdownWithLabel: React.FC<DropdownWithLabelProps> = ({
  label,
  placeholder = 'Select',
  name,
  required = false,
  options,
  value,
  onChange,
  onFocus,
  inputRef,
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <FormControl fullWidth margin="normal">
        <FormLabel
          htmlFor={name}
          sx={{
            fontWeight: 600,
            mb: 0,
            color: '#313131',
            '&.Mui-focused': { color: '#313131' },
          }}
        >
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </FormLabel>
        <Select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          size="small"
          displayEmpty
          inputRef={inputRef}
          input={
            <OutlinedInput
              placeholder={placeholder}
              sx={{
                borderRadius: '16px',
                '& input::placeholder': {
                  fontWeight: 500,
                  color: '#888',
                },
              }}
            />
          }
        >
          <MenuItem disabled value="">
            <em style={{ fontWeight: 500, color: '#888' }}>{placeholder}</em>
          </MenuItem>
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropdownWithLabel;
