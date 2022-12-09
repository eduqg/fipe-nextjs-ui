import React from 'react';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import MuiSelect, { SelectProps as MuiSelectProps } from '@mui/material/Select';
import { OutlinedInput } from '@mui/material';

export interface SelectOption {
  codigo: string;
  nome: string;
}

interface SelectProps {
  name: string;
  options: SelectOption[];
  selectProps?: MuiSelectProps;
  menuItemProps?: MenuItemProps;
  placeholder?: string;
}

export function Select({
  name,
  options,
  placeholder = 'Selecione um valor',
  selectProps = {},
  menuItemProps = {},
}: SelectProps) {
  return (
    <MuiSelect
      sx={{ width: '100%' }}
      displayEmpty
      input={<OutlinedInput />}
      inputProps={{ 'aria-label': 'Without label' }}
      id={`${name}-field`}
      {...selectProps}
    >
      <MenuItem disabled value="">
        <em>{placeholder}</em>
      </MenuItem>
      {options.map(item => (
        <MenuItem key={item.codigo} value={item.nome} {...menuItemProps}>
          {item.nome}
        </MenuItem>
      ))}
    </MuiSelect>
  );
}
