import React from 'react';

import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import MuiSelect, { SelectProps as MuiSelectProps } from '@mui/material/Select';

interface SelectProps {
  options: string[];
  selectProps?: MuiSelectProps;
  menuItemProps?: MenuItemProps;
  placeholder?: string;
}

export function Select({
  options,
  placeholder = 'Selecione um valor',
  selectProps = {},
  menuItemProps = {},
}: SelectProps) {
  return (
    <MuiSelect
      renderValue={(selected: unknown): string | JSX.Element => {
        if (!Array.isArray(selected)) return <></>;

        if (selected?.length === 0) return <em>{placeholder}</em>;

        return selected.join(', ');
      }}
      {...selectProps}
    >
      <MenuItem disabled value="">
        <em>{placeholder}</em>
      </MenuItem>
      {options.map(name => (
        <MenuItem key={name} value={name} {...menuItemProps}>
          {name}
        </MenuItem>
      ))}
    </MuiSelect>
  );
}
