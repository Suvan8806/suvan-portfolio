import { ItemSlot } from "@/components/ui";
import type { Channel } from "./channels";
import { ExternalLabel, NEW_TAB } from "./ExternalLabel";

/** A network channel as a cyberware slot row: icon slot, field name, handle, external marker. */
export function ChannelRow({ channel }: { channel: Channel }) {
  return (
    <a
      href={channel.href}
      {...NEW_TAB}
      className="group flex min-h-11 items-center gap-4 p-2 transition-colors duration-150 hover:bg-panel-hi"
    >
      <ItemSlot size={56}>
        <channel.Icon size={24} />
      </ItemSlot>
      <span className="min-w-0 flex-1">
        <span className="kicker block">{channel.label}</span>
        <span className="block break-all text-lg font-semibold text-text group-hover:text-cp-cyan">
          {channel.handle}
        </span>
      </span>
      <span className="text-cp-cyan">
        <ExternalLabel />
      </span>
    </a>
  );
}
