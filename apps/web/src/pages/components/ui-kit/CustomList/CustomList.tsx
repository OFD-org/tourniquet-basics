import { List, ListItem, ListProps } from "@mui/material";
import { ReactNode } from "react";

type CustomListProps = {
  items: ReactNode[];
  type?: "number" | "square";
} & ListProps;

export const CustomList = ({ items, type = "square", ...props }: CustomListProps) => {
  const isNumbered = type === "number";

  return (
    <List
      component={isNumbered ? "ol" : "ul"}
      sx={{
        listStyleType: isNumbered ? "decimal" : "square",
        pl: 4,
        py: 1.5,
        ...(isNumbered && {
          '& li::marker': {
            fontFamily: "UAF Sans, sans-serif",
            fontSize: "20px",
            lineHeight: "20px",
            fontWeight: 400,
          },
        }),
        ...props.sx,
      }}
      {...props}
    >
      {items.map((item, i) => (
        <ListItem
          key={i}
          sx={{
            display: "list-item",
            mt: i !== 0 ? "6px" : 0,
            p: 0,
          }}
        >
          {item}
        </ListItem>
      ))}
    </List>
  );
};
