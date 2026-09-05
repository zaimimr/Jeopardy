import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GameBoard } from "@/components/game-board";
import { getGame } from "@/lib/actions/games";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/spill/[id]">): Promise<Metadata> {
  const { id } = await params;
  const game = await getGame(id);
  return { title: game ? game.board.title : "Spill" };
}

export default async function GamePage({ params }: PageProps<"/spill/[id]">) {
  const { id } = await params;
  const game = await getGame(id);
  if (!game) notFound();
  return <GameBoard initial={game} />;
}
