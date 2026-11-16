import Image from "next/image";
import { PROFILE } from "@/content/profile";
import styles from "./PhotoSlot.module.css";

const CORNERS = [styles.tl, styles.tr, styles.br, styles.bl];

/** 4:5 bracketed ID photo frame. Shows an IMAGE PENDING placeholder until PROFILE.photoSrc is set. */
export function PhotoSlot({ className = "" }: { className?: string }) {
  const src = PROFILE.photoSrc;
  return (
    <div className={`relative aspect-[4/5] w-full p-2 ${className}`}>
      <div className="relative h-full w-full overflow-hidden bg-void">
        {src ? (
          <Image
            src={src}
            alt={`Portrait of ${PROFILE.name}`}
            fill
            sizes="(min-width: 1024px) 272px, (min-width: 640px) 180px, 240px"
            className="object-cover object-[50%_42%]"
            priority
          />
        ) : (
          <Placeholder />
        )}
      </div>
      {CORNERS.map((corner) => (
        <span key={corner} aria-hidden="true" className={`${styles.corner} ${corner}`} />
      ))}
    </div>
  );
}

function Placeholder() {
  return (
    <div
      role="img"
      aria-label="Photo coming soon"
      className="relative grid h-full w-full place-items-center bg-[radial-gradient(ellipse_at_50%_35%,rgb(136_4_37/0.35),transparent_70%)]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 160 200"
        className="absolute inset-x-0 bottom-0 mx-auto h-[82%] text-cp-red/30"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="square"
      >
        <path d="M80 30a28 32 0 1 0 0.01 0Z" />
        <path d="M66 90v14L28 120c-10 4-16 14-16 26v54M94 90v14l38 16c10 4 16 14 16 26v54" />
        <path d="M60 150h40M64 162h32" strokeOpacity={0.6} />
      </svg>
      <span aria-hidden="true" className={styles.scan} />
      <span
        aria-hidden="true"
        className="data absolute bottom-[12%] left-1/2 -translate-x-1/2 whitespace-nowrap bg-void/85 px-2 py-1 text-mute"
      >
        Image pending
      </span>
    </div>
  );
}
