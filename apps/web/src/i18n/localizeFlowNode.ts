import i18n from "../i18n";
import { FlowAccordionItem, FlowNode } from "../api/poll.types";

const NS = "flow";

function pick(key: string, fallback?: string): string | undefined {
  if (i18n.exists(key, { ns: NS })) {
    return String(i18n.t(key, { ns: NS }));
  }
  return fallback;
}

/** Overlay EN (or other) copy onto API flow nodes. Ukrainian stays API-sourced. */
export function localizeFlowNode(node: FlowNode | null): FlowNode | null {
  if (!node) return null;

  const lang = (i18n.resolvedLanguage || i18n.language || "uk").split("-")[0];
  if (lang === "uk") return node;

  const base = node.id;
  const items: FlowAccordionItem[] | undefined = node.items?.map((item) => ({
    ...item,
    title: pick(`${base}.items.${item.id}.title`, item.title) ?? item.title,
    body:
      item.body !== undefined
        ? pick(`${base}.items.${item.id}.body`, item.body) ?? item.body
        : undefined,
  }));

  return {
    ...node,
    label: pick(`${base}.label`, node.label) ?? node.label,
    title:
      node.title !== undefined
        ? pick(`${base}.title`, node.title) ?? node.title
        : undefined,
    body:
      node.body !== undefined
        ? pick(`${base}.body`, node.body) ?? node.body
        : undefined,
    items,
  };
}
