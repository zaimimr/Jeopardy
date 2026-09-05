import type { Media } from "@/lib/types";

export function ClueMedia({
  media,
  variant,
  develop = false,
}: {
  media: Media;
  variant: "question" | "answer";
  develop?: boolean;
}) {
  const hasImage = Boolean(media.image);
  const hasText = Boolean(media.text?.trim());
  const textSize = hasImage
    ? "text-[clamp(1.4rem,3vw,2.6rem)]"
    : (media.text?.length ?? 0) > 140
      ? "text-[clamp(1.6rem,3.6vw,3.4rem)]"
      : "text-[clamp(2rem,5vw,5rem)]";
  return (
    <div className="flex h-full min-h-0 w-full flex-col items-center justify-center gap-[3vh]">
      {hasImage ? (
        <div className={`relative min-h-0 flex-1 w-full ${develop ? "anim-develop" : ""}`}>
          <img
            src={media.image}
            alt=""
            className="absolute inset-0 mx-auto h-full w-full rounded-md object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          />
        </div>
      ) : null}
      {hasText ? (
        <p
          className={`max-w-[26ch] text-balance text-center leading-[1.15] ${textSize} ${
            variant === "answer" ? "font-display font-medium text-brass-light" : "font-ui font-medium text-cream"
          }`}
        >
          {media.text}
        </p>
      ) : null}
      {!hasImage && !hasText ? (
        <p className="font-display text-3xl italic text-cream-faint">
          {variant === "answer" ? "Ingen svar lagt inn" : "Ingen spørsmål lagt inn"}
        </p>
      ) : null}
    </div>
  );
}
