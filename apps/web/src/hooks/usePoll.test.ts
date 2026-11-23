import { act, renderHook } from "@testing-library/react";
import { usePoll } from "./usePoll";
import { POLL_FLOW_NODES, POLL_FLOW_START_ID } from "../data/tutorial-flow";

test("a visitor can advance and go back without an account or API", async () => {
  const { result } = renderHook(() => usePoll());
  expect(result.current.currentNode.id).toBe(POLL_FLOW_START_ID);
  await act(async () => { await result.current.submitAnswer("ack"); });
  expect(result.current.currentNode.id).toBe("q1");
  expect(result.current.canGoBack).toBe(true);
  await act(async () => { await result.current.goBack(); });
  expect(result.current.currentNode.id).toBe(POLL_FLOW_START_ID);
  expect(result.current.canGoBack).toBe(false);
});

test.each(["yes", "no"] as const)("visitor completes the %s branch at q7", async (branch) => {
  const { result } = renderHook(() => usePoll());
  const visited: string[] = [];
  for (let step = 0; step < 60 && !result.current.isCompleted; step++) {
    const node = result.current.currentNode;
    visited.push(node.id);
    const answer = node.kind === "yes_no" ? (node.id === "q7" ? branch : "yes") : "ack";
    await act(async () => { await result.current.submitAnswer(answer); });
  }
  expect(result.current.isCompleted).toBe(true);
  expect(visited).toContain(branch === "yes" ? "s7_success" : "conv_success");
});

test("every tutorial edge points to an existing node", () => {
  for (const node of Object.values(POLL_FLOW_NODES)) {
    for (const edge of node.edges) expect(POLL_FLOW_NODES[edge.to]).toBeDefined();
  }
});
