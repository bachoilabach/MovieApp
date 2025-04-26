import React from "react";
import Svg, { Path } from "react-native-svg";

export function HomeIcon({ color }: { color: string }) {
  return (
    <Svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
      <Path
        fill={color}
        stroke={color}
        strokeWidth={0.5}
        d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1"
      />
    </Svg>
  );
}

export function CheckIcon() {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Path
        fill="#0bff0e"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"
        strokeWidth={0.5}
        stroke="#0bff0e"
      ></Path>
    </Svg>
  );
}

export function PaginationIcon({ color }: { color: string }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill={color}>
      <Path
        fill="#000"
        d="M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h14.77q.69 0 1.152.463T21 6.616v10.769q0 .69-.463 1.153T19.385 19zM19.385 6H4.615q-.23 0-.423.192T4 6.616v10.769q0 .23.192.423t.423.192h14.77q.23 0 .423-.192t.192-.423V6.615q0-.23-.192-.423T19.385 6M4 6v12zm4.808 7.57v-3.14q0-.272-.252-.368t-.444.096l-1.278 1.277q-.242.242-.242.565t.242.566l1.277 1.276q.193.193.445.097q.252-.097.252-.37m8.358-2.134l-1.277-1.277q-.193-.192-.445-.096t-.252.369v3.138q0 .273.252.37t.444-.097l1.278-1.276q.242-.243.242-.566t-.243-.565"
        strokeWidth={0.5}
        stroke={color}
      ></Path>
    </Svg>
  );
}

export function SettingIcon({ color }: { color: string }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill={color}>
      <Path
        fill="#000"
        d="M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23a.987.987 0 0 0-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41a7.3 7.3 0 0 0 0 1.35l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68m-7.46 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5"
        strokeWidth={0.5}
        stroke={color}
      ></Path>
    </Svg>
  );
}

export function HeartIcon({ color }: { color: string }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"
        strokeWidth={0.5}
        stroke={color}
      ></Path>
    </Svg>
  );
}

export function SwipIcon({ color }: { color: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M21 7.385h-4.384V6.5H19.9q-1.708-1.392-3.704-2.263T12 3.365t-4.196.87Q5.808 5.109 4.1 6.5h3.285v.885H3V3h.885v2.506q1.78-1.36 3.83-2.192T12 2.48t4.285.833t3.83 2.192V3H21zM10.806 21l-5.667-5.654l.92-.894l3.441.857V6.5h1v10.152l-3.637-.983L11.214 20H18v-7h1v8zm1.521-6.5V10h1v4.5zm2.846 0V11h1v3.5zm-.725 2.635"
      />
    </Svg>
  );
}

export function RightArrowIcon() {
  return (
    <Svg width="32" height="32" viewBox="0 0 24 24">
      <Path
        fill={"black"}
        d="m13.292 12l-4.6-4.6l.708-.708L14.708 12L9.4 17.308l-.708-.708z"
      />
    </Svg>
  );
}

export function LeftArrowIcon() {
  return (
    <Svg width="32" height="32" viewBox="0 0 24 24">
      <Path
        fill={'black'}
        d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z"
      />
    </Svg>
  );
}
