"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { dispatchGameAction, getGameState } from "@/lib/actions/games";
import { reduceGame } from "@/lib/game";
import { supabaseBrowser } from "@/lib/supabase/browser";
import type { Game, GameAction } from "@/lib/types";

export type SyncStatus = "connecting" | "live" | "polling";

type Broadcast = { state: Game["state"]; version: number; origin: string };

const POLL_MS = 4000;
const hasRealtime = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export function useGame(initial: Game) {
  const [game, setGame] = useState<Game>(initial);
  const [status, setStatus] = useState<SyncStatus>(hasRealtime ? "connecting" : "polling");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(0);
  const versionRef = useRef(initial.version);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const originRef = useRef("");

  const accept = useCallback((incoming: Game) => {
    if (incoming.version <= versionRef.current) return;
    versionRef.current = incoming.version;
    setGame(incoming);
  }, []);

  useEffect(() => {
    const supabase = supabaseBrowser();
    if (!supabase) return;
    if (!originRef.current) originRef.current = crypto.randomUUID();
    const channel = supabase.channel(`game:${initial.id}`, { config: { broadcast: { self: false } } });
    channel
      .on("broadcast", { event: "state" }, ({ payload }) => {
        const message = payload as Broadcast;
        if (message.origin === originRef.current) return;
        accept({ id: initial.id, code: initial.code, boardId: initial.boardId, state: message.state, version: message.version });
      })
      .subscribe((state) => {
        if (state === "SUBSCRIBED") setStatus("live");
        else if (state === "CHANNEL_ERROR" || state === "TIMED_OUT" || state === "CLOSED") setStatus("polling");
      });
    channelRef.current = channel;
    return () => {
      channelRef.current = null;
      supabase.removeChannel(channel);
    };
  }, [initial.id, initial.code, initial.boardId, accept]);

  useEffect(() => {
    let cancelled = false;
    const poll = async () => {
      if (document.visibilityState === "hidden") return;
      try {
        const latest = await getGameState(initial.id);
        if (!cancelled && latest) accept(latest);
      } catch {
        return;
      }
    };
    const interval = window.setInterval(poll, status === "live" ? POLL_MS * 4 : POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") void poll();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
  }, [initial.id, status, accept]);

  const dispatch = useCallback(
    async (action: GameAction) => {
      setGame((current) => ({ ...current, state: reduceGame(current.state, action) }));
      setPending((count) => count + 1);
      setError(null);
      try {
        const result = await dispatchGameAction(initial.id, action);
        accept(result);
        channelRef.current?.send({
          type: "broadcast",
          event: "state",
          payload: { state: result.state, version: result.version, origin: originRef.current } satisfies Broadcast,
        });
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Noe gikk galt.");
        try {
          const latest = await getGameState(initial.id);
          if (latest) {
            versionRef.current = 0;
            accept(latest);
          }
        } catch {
          return;
        }
      } finally {
        setPending((count) => count - 1);
      }
    },
    [initial.id, accept],
  );

  return { game, dispatch, status, error, pending: pending > 0 };
}
