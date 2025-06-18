import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { alpha, Components, Theme } from '@mui/material/styles';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import { brand, gray } from '../themePrimitives';

export const inputsCustomizations: Components<Theme> = {
  MuiButtonBase: {
    defaultProps: {
      disableTouchRipple: true,
      disableRipple: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        boxSizing: 'border-box',
        transition: 'all 100ms ease-in',
        '&:focus-visible': {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: '2px',
        },
      }),
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: (theme.vars || theme).shape.borderRadius,
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightMedium,
        letterSpacing: 0,
        boxShadow: 'none',
        padding: '8px 16px',
        fontSize: '0.875rem',
        lineHeight: 1.25,
        minWidth: 'auto',
        border: '1px solid',
        borderColor: 'transparent',
        '&:hover': {
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
        },
        '&:focus-visible': {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: '2px',
        },
        variants: [
          {
            props: {
              variant: 'contained',
            },
            style: {
              color: 'white',
              backgroundImage: `linear-gradient(to bottom, ${brand[400]}, ${brand[500]})`,
              boxShadow: `inset 0 2px 0 ${alpha(brand[200], 0.2)}, inset 0 -2px 0 ${alpha(brand[700], 0.4)}`,
              border: `1px solid ${brand[500]}`,
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'contained',
            },
            style: {
              color: 'white',
              backgroundImage: `linear-gradient(to bottom, ${alpha(brand[400], 0.8)}, ${brand[500]})`,
              boxShadow: `inset 0 2px 0 ${alpha(brand[200], 0.2)}, inset 0 -2px 0 ${alpha(brand[700], 0.4)}`,
              border: `1px solid ${brand[500]}`,
            },
          },
          {
            props: {
              variant: 'outlined',
            },
            style: {
              color: (theme.vars || theme).palette.text.primary,
              border: '1px solid',
              borderColor: gray[200],
              backgroundColor: alpha(gray[50], 0.3),
              '&:hover': {
                backgroundColor: gray[100],
                borderColor: gray[300],
              },
              '&:active': {
                backgroundColor: gray[200],
              },
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'outlined',
            },
            style: {
              color: brand[700],
              border: '1px solid',
              borderColor: brand[200],
              backgroundColor: brand[50],
              '&:hover': {
                backgroundColor: brand[100],
                borderColor: brand[400],
              },
              '&:active': {
                backgroundColor: alpha(brand[200], 0.7),
              },
            },
          },
          {
            props: {
              variant: 'text',
            },
            style: {
              color: gray[600],
              '&:hover': {
                backgroundColor: gray[100],
              },
              '&:active': {
                backgroundColor: gray[200],
              },
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'text',
            },
            style: {
              color: brand[700],
              '&:hover': {
                backgroundColor: alpha(brand[100], 0.5),
              },
              '&:active': {
                backgroundColor: alpha(brand[200], 0.7),
              },
            },
          },
        ],
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: 'none',
        borderRadius: (theme.vars || theme).shape.borderRadius,
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightMedium,
        letterSpacing: 0,
        color: (theme.vars || theme).palette.text.primary,
        border: '1px solid ',
        borderColor: gray[200],
        backgroundColor: alpha(gray[50], 0.3),
        '&:hover': {
          backgroundColor: gray[100],
          borderColor: gray[300],
        },
        '&:active': {
          backgroundColor: gray[200],
        },
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              width: '2.25rem',
              height: '2.25rem',
              padding: '0.25rem',
              [`& .${svgIconClasses.root}`]: { fontSize: '1rem' },
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              width: '2.5rem',
              height: '2.5rem',
            },
          },
        ],
      }),
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: () => ({
        borderRadius: '10px',
        boxShadow: `0 4px 16px ${alpha(gray[400], 0.2)}`,
        [`& .${toggleButtonGroupClasses.selected}`]: {
          color: brand[500],
        },
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: () => ({
        padding: '12px 16px',
        textTransform: 'none',
        borderRadius: '10px',
        fontWeight: 500,
      }),
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
    },
    styleOverrides: {
      root: () => ({
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          border: '1px solid',
          borderColor: gray[200],
          backgroundColor: '#FFFFFF',
          boxShadow: `inset 0 1px 0 1px hsla(220, 0%, 100%, 0.6), inset 0 -1px 0 1px hsla(220, 35%, 90%, 0.5)`,
          '&:hover': {
            borderColor: gray[300],
            backgroundColor: '#FFFFFF',
            boxShadow: 'none',
          },
          [`&.${outlinedInputClasses.focused}`]: {
            outlineOffset: 0,
            borderColor: gray[400],
          },
          '&:before, &:after': {
            display: 'none',
          },
        },
        '& .MuiInputLabel-root': {
          color: gray[600],
          '&.Mui-focused': {
            color: gray[800],
          },
        },
        '& .MuiFormHelperText-root': {
          color: gray[600],
        },
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: () => ({
        borderRadius: '8px',
        border: '1px solid',
        borderColor: gray[200],
        backgroundColor: '#FFFFFF',
        boxShadow: `inset 0 1px 0 1px hsla(220, 0%, 100%, 0.6), inset 0 -1px 0 1px hsla(220, 35%, 90%, 0.5)`,
        '&:hover': {
          borderColor: gray[300],
          backgroundColor: '#FFFFFF',
          boxShadow: 'none',
        },
        [`&.${outlinedInputClasses.focused}`]: {
          outlineOffset: 0,
          borderColor: gray[400],
        },
        '&:before, &:after': {
          display: 'none',
        },
      }),
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: () => ({
        color: gray[600],
        '&.Mui-focused': {
          color: gray[800],
        },
      }),
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: () => ({
        color: gray[600],
      }),
    },
  },
  MuiCheckbox: {
    defaultProps: {
      icon: <CheckBoxOutlineBlankRoundedIcon />,
      checkedIcon: <CheckRoundedIcon />,
      indeterminateIcon: <RemoveRoundedIcon />,
    },
    styleOverrides: {
      root: () => ({
        color: gray[400],
        '&.Mui-checked': {
          color: brand[500],
        },
        '&.Mui-indeterminate': {
          color: brand[500],
        },
      }),
    },
  },
  MuiRadio: {
    defaultProps: {
      icon: <CheckBoxOutlineBlankRoundedIcon />,
      checkedIcon: <CheckRoundedIcon />,
    },
    styleOverrides: {
      root: () => ({
        color: gray[400],
        '&.Mui-checked': {
          color: brand[500],
        },
      }),
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: () => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          margin: 2,
          padding: 0,
          transform: 'translateX(0px)',
          '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(16px)',
            '& + .MuiSwitch-track': {
              backgroundColor: brand[500],
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: gray[300],
          opacity: 1,
          transition: 'background-color 500ms',
        },
      }),
    },
  },
  MuiSlider: {
    styleOverrides: {
      root: () => ({
        color: brand[500],
        height: 3,
        '& .MuiSlider-track': {
          border: 'none',
        },
        '& .MuiSlider-thumb': {
          height: 24,
          width: 24,
          backgroundColor: '#fff',
          border: '2px solid currentColor',
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
          },
          '&:before': {
            display: 'none',
          },
        },
        '& .MuiSlider-valueLabel': {
          lineHeight: 1.2,
          fontSize: 12,
          background: 'unset',
          padding: 0,
          width: 32,
          height: 32,
          borderRadius: '50% 50% 50% 0',
          backgroundColor: brand[500],
          transformOrigin: 'bottom left',
          transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
          '&:before': { display: 'none' },
          '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
          },
          '& > *': {
            transform: 'rotate(45deg)',
          },
        },
      }),
    },
  },
};
