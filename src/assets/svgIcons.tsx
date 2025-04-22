import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function HomeIcon({ color }: { color: string }) {
  return (
    <Svg width="27" height="27" viewBox="0 0 24 24" fill={color}>
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
    <Svg
      width={27}
      height={27}
      viewBox="0 0 24 24">
      <Path
        fill="#0bff0e"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"
        strokeWidth={0.5}
        stroke="#0bff0e"></Path>
    </Svg>
  );
}
