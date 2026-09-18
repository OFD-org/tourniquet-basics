import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "../../../../icons/ArrowRight";
import { tokens } from "../../../../theme/tokens";

export type FlowAccordionItem = {
  id: string;
  title: string;
  body?: string;
  mediaUrl?: string;
  defaultExpanded?: boolean;
};

type FlowAccordionProps = {
  items: FlowAccordionItem[];
  multi?: boolean;
};

export const FlowAccordion = ({ items, multi = true }: FlowAccordionProps) => {
  const { t } = useTranslation();
  const initiallyExpanded = items.filter((i) => i.defaultExpanded).map((i) => i.id);
  const [expanded, setExpanded] = useState<string[]>(
    initiallyExpanded.length ? initiallyExpanded : items[0] ? [items[0].id] : []
  );

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const isOpen = prev.includes(id);
      if (multi) {
        return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
      }
      return isOpen ? [] : [id];
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {items.map((item, index) => {
        const isExpanded = expanded.includes(item.id);
        return (
          <Box key={item.id} sx={{ position: "relative" }}>
            {index < items.length - 1 && (
              <Box
                aria-hidden
                sx={{
                  position: "absolute",
                  left: 28,
                  top: "100%",
                  width: 2,
                  height: 12,
                  bgcolor: tokens.color.pageMuted,
                  zIndex: 0,
                }}
              />
            )}
            <Accordion
              disableGutters
              expanded={isExpanded}
              onChange={() => toggle(item.id)}
              slotProps={{ transition: { timeout: 220 } }}
            >
              <AccordionSummary
                expandIcon={
                  <ArrowRight size='s' color={tokens.color.ink} direction='left' />
                }
                sx={{
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    transition: "transform 220ms ease",
                  },
                  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                    transform: "rotate(180deg)",
                  },
                }}
              >
                <Typography
                  variant='body1'
                  sx={{ color: tokens.color.ink, pr: 2, lineHeight: 1.35 }}
                >
                  {item.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant='body2'
                  sx={{
                    color: tokens.color.inkMuted,
                    lineHeight: 1.5,
                    whiteSpace: "pre-line",
                    mb: item.mediaUrl ? 2 : 0,
                  }}
                >
                  {item.body?.trim()
                    ? item.body
                    : t("flowUi.accordionFallback")}
                </Typography>
                {item.mediaUrl && (
                  <Box
                    component='img'
                    src={item.mediaUrl}
                    alt={item.title}
                    loading='lazy'
                    sx={{
                      display: "block",
                      width: "100%",
                      maxHeight: 360,
                      objectFit: "cover",
                      borderRadius: tokens.radius.sm,
                      border: `1px solid ${tokens.color.border}`,
                    }}
                  />
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
        );
      })}
    </Box>
  );
};
