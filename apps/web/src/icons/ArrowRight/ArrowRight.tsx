import { useTheme } from "@mui/material";
import { BaseIcon } from "../BaseIcon";
import { TIcon } from "../types";

export const ArrowRight: React.FC<TIcon> = ({ color, ...props }) => {
  const theme = useTheme();

  return (
    <BaseIcon viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        xmlns='http://www.w3.org/2000/svg'
        d='M5 12H19M19 12L12 5M19 12L12 19'
        stroke={color || theme.palette.secondary.main}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </BaseIcon>
  );
};
