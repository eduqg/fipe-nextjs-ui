import React from 'react';

import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import MuiSelect, { SelectProps as MuiSelectProps } from '@mui/material/Select';
import { OutlinedInput } from '@mui/material';

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
export interface SelectOption {
  codigo: string;
  nome: string;
}

interface SelectProps {
  options: SelectOption[];
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
      displayEmpty
      input={<OutlinedInput />}
      MenuProps={MenuProps}
      inputProps={{ 'aria-label': 'Without label' }}
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
