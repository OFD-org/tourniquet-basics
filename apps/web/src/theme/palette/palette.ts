import { PaletteOptions } from '@mui/material/styles'


declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    info: true;
    warning: true;
  }
}

export const palette: PaletteOptions = {
  background: {
    paper: 'rgba(7, 5, 25, 0.8)',
    default: 'rgba(7, 5, 25, 1)',
  },
  primary: {
    main: 'rgba(189, 198, 133, 1)',
    dark: 'rgba(165, 178, 86, 1)',
    contrastText: '#000',
  },
  secondary: {
    main: 'rgba(30, 30, 30, 1)',
    dark: 'rgba(48, 48, 48, 1)',
    contrastText: '#fff',
  },
  info: {
    main: 'rgba(222, 227, 194, 1)',
    dark: 'rgba(198, 206, 153, 1)',
    contrastText: '#000',
  },
  warning: {
    main: 'rgba(247, 247, 247, 1)',
    dark: 'rgba(219, 219, 219, 1)',
    contrastText: '#000',
  },
  common: {
    white: 'rgba(255, 255, 255, 1)',
    black: 'rgba(0, 0, 0, 1)',
  },
};
