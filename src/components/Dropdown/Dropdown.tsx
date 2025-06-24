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
  // width = 300,
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

  const getStyles = (name: string, selected: readonly string[], theme: Theme) => ({
    fontWeight: selected.includes(name) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
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
            return selected || <em>{placeholder}</em>;
          }
          if (multiSelect && (selected as string[]).length === 0) {
            return <em>{placeholder}</em>;
          }
          return (selected as string[]).join(', ');
        }}
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{ width: '100%', borderRadius: '16px' }}
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
