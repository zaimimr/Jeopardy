import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameBoard } from "@/components/game-board";
import { getGame } from "@/lib/actions/games";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/spill/[code]">): Promise<Metadata> {
  const { code } = await params;
  const game = await getGame(code);
  return { title: game ? `${game.board.title} · ${game.code}` : "Spill" };
}

export default async function GamePage({ params }: PageProps<"/spill/[code]">) {
  const { code } = await params;
  const game = await getGame(code);
  if (!game) notFound();
  return <GameBoard initial={game} />;
}
