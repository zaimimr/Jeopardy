import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Remote } from "@/components/remote";
import { getGame } from "@/lib/actions/games";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Fjernkontroll" };

export default async function RemotePage({ params }: PageProps<"/spill/[id]/fjernkontroll">) {
  const { id } = await params;
  const game = await getGame(id);
  if (!game) notFound();
  return <Remote initial={game} />;
}
