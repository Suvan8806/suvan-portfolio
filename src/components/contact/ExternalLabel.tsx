import { ExternalIcon } from "@/components/ui";

/** External-link affordance: authored icon + screen-reader "new tab" note. */
export function ExternalLabel() {
  return (
    <>
      <ExternalIcon className="shrink-0" />
      <span className="sr-only"> (opens in a new tab)</span>
    </>
  );
}

/** Props for an anchor that opens in a new tab. */
export const NEW_TAB = { target: "_blank", rel: "noopener noreferrer" } as const;
