"use client";

import { useCallback, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

export type Slot = { categoryId: string; row: number };

type Cell = { element: HTMLElement; categoryId: string; row: number };
type Anchor = Slot & { x: number; y: number };
type Session = { pointerId: number; startX: number; startY: number; anchors: Anchor[]; from: Anchor; to: Slot };

export type ClueDrag = { from: Slot; to: Slot; dx: number; dy: number };

const cellKey = (categoryId: string, row: number) => `${categoryId}:${row}`;

const sameSlot = (a: Slot, b: Slot) => a.categoryId === b.categoryId && a.row === b.row;

export function useClueDrag({
  onMove,
  columnPoints,
}: {
  onMove: (from: Slot, to: Slot) => void;
  columnPoints: (categoryId: string) => number[];
}) {
  const cells = useRef(new Map<string, Cell>());
  const session = useRef<Session | null>(null);
  const [drag, setDrag] = useState<ClueDrag | null>(null);

  const registerCell = useCallback(
    (categoryId: string, row: number) => (element: HTMLElement | null) => {
      const key = cellKey(categoryId, row);
      if (element) cells.current.set(key, { element, categoryId, row });
      else cells.current.delete(key);
    },
    [],
  );

  const measure = (): Anchor[] =>
    [...cells.current.values()].map(({ element, categoryId, row }) => {
      const rect = element.getBoundingClientRect();
      return { categoryId, row, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    });

  const columnAnchors = (anchors: Anchor[], categoryId: string) =>
    anchors.filter((anchor) => anchor.categoryId === categoryId).sort((a, b) => a.row - b.row);

  const onPointerDown = (categoryId: string, row: number) => (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const anchors = measure();
    const from = anchors.find((anchor) => anchor.categoryId === categoryId && anchor.row === row);
    if (!from || anchors.length < 2) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.focus();
    event.currentTarget.setPointerCapture(event.pointerId);
    session.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, anchors, from, to: { categoryId, row } };
    setDrag({ from: { categoryId, row }, to: { categoryId, row }, dx: 0, dy: 0 });
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    const active = session.current;
    if (!active || event.pointerId !== active.pointerId) return;
    const dx = event.clientX - active.startX;
    const dy = event.clientY - active.startY;
    const x = active.from.x + dx;
    const y = active.from.y + dy;
    let to: Slot = active.from;
    let best = Number.POSITIVE_INFINITY;
    for (const anchor of active.anchors) {
      const distance = (anchor.x - x) ** 2 + (anchor.y - y) ** 2;
      if (distance < best) {
        best = distance;
        to = { categoryId: anchor.categoryId, row: anchor.row };
      }
    }
    active.to = to;
    setDrag({ from: { categoryId: active.from.categoryId, row: active.from.row }, to, dx, dy });
  };

  const finish = (event: ReactPointerEvent<HTMLElement>, commit: boolean) => {
    const active = session.current;
    if (!active || event.pointerId !== active.pointerId) return;
    session.current = null;
    if (event.currentTarget.hasPointerCapture(active.pointerId)) event.currentTarget.releasePointerCapture(active.pointerId);
    setDrag(null);
    const from: Slot = { categoryId: active.from.categoryId, row: active.from.row };
    if (commit && !sameSlot(from, active.to)) onMove(from, active.to);
  };

  const handleProps = (categoryId: string, row: number) => ({
    onPointerDown: onPointerDown(categoryId, row),
    onPointerMove,
    onPointerUp: (event: ReactPointerEvent<HTMLElement>) => finish(event, true),
    onPointerCancel: (event: ReactPointerEvent<HTMLElement>) => finish(event, false),
    style: { touchAction: "none" } as CSSProperties,
  });

  const reorders = (state: ClueDrag) => state.from.categoryId === state.to.categoryId;

  const cellStyle = (categoryId: string, row: number): CSSProperties | undefined => {
    const active = session.current;
    if (!drag || !active) return undefined;
    if (sameSlot(drag.from, { categoryId, row })) {
      return { transform: `translate(${drag.dx}px, ${drag.dy}px)`, zIndex: 20, transition: "none" };
    }
    if (!reorders(drag) || categoryId !== drag.from.categoryId) return undefined;
    const anchors = columnAnchors(active.anchors, categoryId);
    const shift =
      drag.from.row < drag.to.row && row > drag.from.row && row <= drag.to.row
        ? anchors[row - 1].y - anchors[row].y
        : drag.to.row < drag.from.row && row >= drag.to.row && row < drag.from.row
          ? anchors[row + 1].y - anchors[row].y
          : 0;
    return { transform: `translateY(${shift}px)`, transition: "transform 140ms ease" };
  };

  const isDropTarget = (categoryId: string, row: number) =>
    Boolean(drag && !reorders(drag) && sameSlot(drag.to, { categoryId, row }));

  const pointsAtRow = (categoryId: string, row: number) => {
    const own = columnPoints(categoryId)[row];
    if (!drag) return own;
    const slot = { categoryId, row };
    if (reorders(drag)) {
      if (categoryId !== drag.from.categoryId) return own;
      const values = columnPoints(categoryId);
      const { from, to } = drag;
      if (row === from.row) return values[to.row];
      if (from.row < to.row && row > from.row && row <= to.row) return values[row - 1];
      if (to.row < from.row && row >= to.row && row < from.row) return values[row + 1];
      return own;
    }
    if (sameSlot(drag.from, slot)) return columnPoints(drag.to.categoryId)[drag.to.row];
    if (sameSlot(drag.to, slot)) return columnPoints(drag.from.categoryId)[drag.from.row];
    return own;
  };

  return { drag, registerCell, handleProps, cellStyle, isDropTarget, pointsAtRow };
}
