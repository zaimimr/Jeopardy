import type { Metadata } from "next";
import { BoardEditor } from "@/components/board-editor";

export const metadata: Metadata = { title: "Rediger brett" };

export default async function EditBoardPage({ params, searchParams }: PageProps<"/brett/[id]/rediger">) {
  const { id } = await params;
  const query = await searchParams;
  const keyParam = typeof query.key === "string" ? query.key : null;
  return <BoardEditor boardId={id} keyFromUrl={keyParam} />;
}
