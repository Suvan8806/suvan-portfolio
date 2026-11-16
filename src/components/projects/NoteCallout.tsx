import { Panel } from "@/components/ui";

type NoteCalloutProps = { note: string };

/** Clarifying note from content, shown as a quiet panel. */
export function NoteCallout({ note }: NoteCalloutProps) {
  return (
    <Panel as="aside" aria-labelledby="sys-note">
      <h2 id="sys-note" className="label-red text-base">
        Sys note
      </h2>
      <p className="mt-2 max-w-[68ch] text-mute">{note}</p>
    </Panel>
  );
}
