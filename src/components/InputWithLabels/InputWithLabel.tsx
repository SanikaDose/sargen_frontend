import React from 'react';
import { TextField, TextFieldProps, FormControl, FormLabel } from '@mui/material';

export interface InputWithLabelProps extends Omit<TextFieldProps, 'label'> {
  label: string;
  name: string;
  required?: boolean;
  allowEmojis?: boolean; // Optional prop to control emoji behavior
  readonly?: boolean; // Optional prop to make the input read-only
  hideAsterisk?: boolean;
}

/**
 * A reusable, production-ready input with a label.
 * Built on top of MUI's TextField and FormControl.
 * Prevents emoji input by default.
 */
export const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, name, required = false, allowEmojis = false, readonly = false, hideAsterisk = false, ...textFieldProps }, ref) => {
    // Emoji regex pattern - matches most common emojis and symbols
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F018}-\u{1F270}]|[\u{238C}-\u{2454}]|[\u{20D0}-\u{20FF}]/gu;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!allowEmojis) {
        // Get the character that would be inserted
        const char = event.key;

        // Check if the key pressed would insert an emoji
        if (char.length === 1 && emojiRegex.test(char)) {
          event.preventDefault();
          return;
        }
      }

      // Call the original onKeyDown if provided
      if (textFieldProps.onKeyDown) {
        textFieldProps.onKeyDown(event);
      }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      if (!allowEmojis) {
        const pastedText = event.clipboardData.getData('text');

        // Check if pasted text contains emojis
        if (emojiRegex.test(pastedText)) {
          event.preventDefault();

          // Optional: You can clean the text and insert only non-emoji characters
          const cleanedText = pastedText.replace(emojiRegex, '');
          const target = event.target as HTMLInputElement;

          // Insert cleaned text at cursor position
          const start = target.selectionStart || 0;
          const end = target.selectionEnd || 0;
          const currentValue = target.value || '';
          const newValue = currentValue.slice(0, start) + cleanedText + currentValue.slice(end);

          // Trigger onChange with cleaned value
          const syntheticEvent = {
            target: { ...target, value: newValue },
          } as React.ChangeEvent<HTMLInputElement>;

          if (textFieldProps.onChange) {
            textFieldProps.onChange(syntheticEvent);
          }

          return;
        }
      }

      // Call the original onPaste if provided
      if (textFieldProps.onPaste) {
        textFieldProps.onPaste(event);
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!allowEmojis) {
        const inputValue = event.target.value;

        // Remove emojis from the input value
        const cleanedValue = inputValue.replace(emojiRegex, '');

        // If the value changed after cleaning, update it
        if (cleanedValue !== inputValue) {
          event.target.value = cleanedValue;
        }
      }

      // Call the original onChange if provided
      if (textFieldProps.onChange) {
        textFieldProps.onChange(event);
      }
    };

    return (
      <FormControl fullWidth margin="normal">
        <FormLabel htmlFor={name} sx={{ fontWeight: 600, mb: 0, color: '#313131' }}>
          {label}
          {required && !hideAsterisk && <span style={{ color: 'red' }}> *</span>}
        </FormLabel>
        <TextField
          id={name}
          name={name}
          variant="outlined"
          size="small"
          required={required}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '16px',
              ...(readonly && {
                backgroundColor: '#f5f5f5', // Optional: Add background color for readonly state
              }),
            },
            '& input::placeholder': {
              fontWeight: 500, // Make placeholder bold
              color: '#888', // Optional: placeholder color
            },
          }}
          {...textFieldProps}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onChange={handleChange}
          InputProps={{
            ...textFieldProps.InputProps,
            readOnly: readonly, // This is the key fix
            inputProps: {
              ...textFieldProps.InputProps?.inputProps,
              min: 0,
            },
          }}
          inputRef={ref}
        />
      </FormControl>
    );
  },
);

InputWithLabel.displayName = 'InputWithLabel';
