import { TypographyVariantsOptions } from "@mui/material/styles";

export const typography: TypographyVariantsOptions = {
  fontFamily: "UAF Sans, sans-serif",

  h1: {
    fontWeight: 700,
    fontSize: "clamp(1.75rem, 5vw, 3rem)",
    lineHeight: 1.05,
    textTransform: "uppercase",
  },
  h2: {
    fontWeight: 500,
    fontSize: "clamp(1.25rem, 3.2vw, 2rem)",
    lineHeight: 1.15,
  },
  h3: {
    fontWeight: 700,
    fontSize: "clamp(1.125rem, 2.4vw, 1.5rem)",
    lineHeight: 1.25,
  },
  h4: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "23px",
    letterSpacing: "3px",
  },
  h5: {
    fontWeight: 700,
    fontSize: "clamp(1rem, 2vw, 1.125rem)",
    lineHeight: 1.3,
  },
  h6: {
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "23px",
  },
  subtitle1: {
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "18px",
  },
  subtitle2: {
    fontWeight: 600,
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    lineHeight: 1.3,
  },
  body1: {
    fontWeight: 700,
    fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
    lineHeight: 1.35,
  },
  body2: {
    fontWeight: 400,
    fontSize: "clamp(0.9375rem, 1.6vw, 1.25rem)",
    lineHeight: 1.45,
  },
  button: {
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "19px",
  },
  caption: {
    fontWeight: 500,
    fontSize: "clamp(0.8125rem, 1.4vw, 1rem)",
    lineHeight: 1.2,
    textTransform: "uppercase",
  },
  overline: {
    fontWeight: 500,
    fontSize: "clamp(1rem, 2.2vw, 1.5rem)",
    lineHeight: 1.25,
  },
};
