import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type DropdownOption = {
  label: string;
  value: string;
};

type MultiSelectPlaceholderProps = {
  options?: DropdownOption[];
  placeholder?: string;
  width?: number;
  multiSelect: boolean;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const defaultOptions: DropdownOption[] = [
  { label: 'Thousand', value: '1000' },
  { label: 'Lakh', value: '100000' },
  { label: 'Crore', value: '10000000' },
];

export const Dropdown: React.FC<MultiSelectPlaceholderProps> = ({
  options = defaultOptions,
  placeholder = 'Placeholder',
  width = 300,
  multiSelect = false,
}) => {
  const theme = useTheme();
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;

    if (multiSelect) {
      setSelectedItems(typeof value === 'string' ? value.split(',') : value);
    } else {
      setSelectedItems([value]);
    }
  };

  const getStyles = (value: string, selected: readonly string[], theme: Theme) => ({
    fontWeight: selected.includes(value) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
  });

  return (
    <FormControl sx={{ m: 0, mt: 3, width: '100%' }}>
      <Select
        multiple={multiSelect}
        displayEmpty
        value={multiSelect ? selectedItems : selectedItems[0] || ''}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (!multiSelect && typeof selected === 'string') {
            const selectedOption = options.find((o) => o.value === selected);
            return selectedOption?.label || <em>{placeholder}</em>;
          }

          if (multiSelect && Array.isArray(selected)) {
            const labels = selected.map((val) => options.find((o) => o.value === val)?.label).filter(Boolean);
            return labels.length ? labels.join(', ') : <em>{placeholder}</em>;
          }

          return <em>{placeholder}</em>;
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{ width: '100%', borderRadius: '16px' }}
      >
        <MenuItem disabled value="">
          <em>{placeholder}</em>
        </MenuItem>
        {options.map(({ label, value }) => (
          <MenuItem key={value} value={value} style={getStyles(value, selectedItems, theme)}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
