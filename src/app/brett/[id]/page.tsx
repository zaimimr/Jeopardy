import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BoardActions } from "@/components/board-actions";
import { SiteHeader } from "@/components/site-header";
import { getBoard } from "@/lib/actions/boards";
import { boardRows, countFilled } from "@/lib/board";
import { themeStyle, THEMES } from "@/lib/themes";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/brett/[id]">): Promise<Metadata> {
  const { id } = await params;
  const board = await getBoard(id);
  return { title: board?.title ?? "Brett" };
}

export default async function BoardPage({ params }: PageProps<"/brett/[id]">) {
  const { id } = await params;
  const board = await getBoard(id);
  if (!board) notFound();
  const rows = boardRows(board.content);
  const { filled, total } = countFilled(board.content);
  return (
    <div style={themeStyle(board.content.theme)} className="stage-spotlight flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-5 pb-16 pt-6 md:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-balance text-4xl font-medium leading-tight md:text-6xl">{board.title}</h1>
          {board.subtitle ? <p className="font-display text-2xl text-brass-light">{board.subtitle}</p> : null}
          <p className="text-cream-dim">
            {board.content.categories.length} kategorier · {rows} rader · {filled} av {total} spørsmål ferdig utfylt · tema:{" "}
            {THEMES[board.content.theme ?? "midnatt"].label}
          </p>
        </div>

        <BoardActions boardId={board.id} title={board.title} />

        <section
          aria-label="Forhåndsvisning"
          className="grid gap-1.5"
          style={{ gridTemplateColumns: `repeat(${board.content.categories.length}, minmax(0, 1fr))` }}
        >
          {board.content.categories.map((category) => (
            <div key={category.id} className="brass-plate flex min-h-12 items-center justify-center rounded-sm px-2 text-center font-display text-sm font-semibold leading-tight md:text-base">
              {category.title}
            </div>
          ))}
          {Array.from({ length: rows }, (_, rowIndex) =>
            board.content.categories.map((category) => {
              const clue = category.clues[rowIndex];
              return clue ? (
                <div key={clue.id} className="numeral flex h-12 items-center justify-center rounded-sm text-lg panel-lit md:h-16 md:text-2xl">
                  {clue.points}
                </div>
              ) : (
                <div key={`${category.id}-${rowIndex}`} />
              );
            }),
          )}
        </section>
      </main>
    </div>
  );
}
