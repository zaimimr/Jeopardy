import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Remote } from "@/components/remote";
import { getGame } from "@/lib/actions/games";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/spill/[code]/fjernkontroll">): Promise<Metadata> {
  const { code } = await params;
  return { title: `Fjernkontroll ${code.toUpperCase()}` };
}

export default async function RemotePage({ params }: PageProps<"/spill/[code]/fjernkontroll">) {
  const { code } = await params;
  const game = await getGame(code);
  if (!game) notFound();
  return <Remote initial={game} />;
}
