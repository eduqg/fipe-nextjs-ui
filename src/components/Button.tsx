import React, { ReactNode } from 'react';

import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

interface ButtonProps extends MuiButtonProps {
  children: ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <MuiButton sx={{ width: 200, height: 50, padding: 1, margin: 2 }} {...rest}>
      {children}
    </MuiButton>
  );
}
