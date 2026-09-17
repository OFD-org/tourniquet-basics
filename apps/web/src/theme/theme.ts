import { createTheme } from '@mui/material/styles';
import { breakpoints } from './breakpoints';
import { palette } from './palette';
import { typography } from './typography';

const baseTheme = createTheme({
  palette,
  breakpoints,
  typography,
});

export const theme = createTheme({
  ...baseTheme,
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            display: 'flex',
            gap: "10px",
            borderRadius: "12px",
            padding: "16px 29px",
            backgroundColor: baseTheme.palette.primary.main,
            color: baseTheme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: baseTheme.palette.primary.dark,
            },
          },
        },
        {
          props: { variant: 'secondary' },
          style: {
            display: 'flex',
            gap: "10px",
            borderRadius: "12px",
            padding: "16px 29px",
            backgroundColor: baseTheme.palette.secondary.main,
            color: baseTheme.palette.secondary.contrastText,
            '&:hover': {
              backgroundColor: baseTheme.palette.secondary.dark,
            },
          },
        },
        {
          props: { variant: 'info' },
          style: {
            display: 'flex',
            gap: "10px",
            borderRadius: "12px",
            padding: "16px 29px",
            backgroundColor: baseTheme.palette.info.main,
            color: baseTheme.palette.info.contrastText,
            '&:hover': {
              backgroundColor: baseTheme.palette.info.dark,
            },
          },
        },
        {
          props: { variant: 'warning' },
          style: {
            display: 'flex',
            gap: "10px",
            borderRadius: "12px",
            padding: "16px 29px",
            backgroundColor: baseTheme.palette.warning.main,
            color: baseTheme.palette.warning.contrastText,
            '&:hover': {
              backgroundColor: baseTheme.palette.warning.dark,
            },
          },
        },
      ],
    },
  },
});
