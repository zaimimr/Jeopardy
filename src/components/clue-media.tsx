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
  const length = media.text?.length ?? 0;
  const textSize = hasImage
    ? "text-[clamp(1.6rem,3.4vw,3.2rem)]"
    : length > 160
      ? "text-[clamp(1.8rem,4.2vw,4.2rem)]"
      : length > 80
        ? "text-[clamp(2.2rem,5.4vw,5.6rem)]"
        : "text-[clamp(2.6rem,6.8vw,7.2rem)]";
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
          className={`max-w-[24ch] text-balance text-center leading-[1.1] ${textSize} ${
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
