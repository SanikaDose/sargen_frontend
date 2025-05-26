import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type MultiSelectPlaceholderProps = {
  options?: string[];
  placeholder?: string;
  width?: number;
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

const defaultOptions = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export const Dropdown: React.FC<MultiSelectPlaceholderProps> = ({
  options = defaultOptions,
  placeholder = 'Placeholder',
  width = 300,
}) => {
  const theme = useTheme();
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedItems>) => {
    const {
      target: { value },
    } = event;
    setSelectedItems(typeof value === 'string' ? value.split(',') : value);
  };

  const getStyles = (name: string, selected: readonly string[], theme: Theme) => ({
    fontWeight: selected.includes(name) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
  });

  return (
    <FormControl sx={{ m: 1, width, mt: 3 }}>
      <Select
        multiple
        displayEmpty
        value={selectedItems}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>{placeholder}</em>;
          }
          return selected.join(', ');
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem disabled value="">
          <em>{placeholder}</em>
        </MenuItem>
        {options.map((name) => (
          <MenuItem key={name} value={name} style={getStyles(name, selectedItems, theme)}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
