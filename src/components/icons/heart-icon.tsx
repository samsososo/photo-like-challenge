import React, {FunctionComponent} from 'react';
import Svg, {Path} from 'react-native-svg';

type HeartIconProps = {
  size?: number;
  filled?: boolean;
  color?: string;
};

export const HeartIcon: FunctionComponent<HeartIconProps> = ({size = 20, filled = false, color}) => {
  const fillColor = filled ? (color || '#dc2626') : 'none';
  const strokeColor = filled ? 'none' : (color || '#9ca3af');

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={fillColor}>
      <Path
        d="M16.5 3.5c-1.74 0-3.41.81-4.5 2.09C10.91 4.31 9.24 3.5 7.5 3.5 4.42 3.5 2 5.92 2 9c0 6.08 7.55 10.54 9.34 11.57.41.23.9.23 1.31 0C14.45 19.54 22 15.08 22 9c0-3.08-2.42-5.5-5.5-5.5z"
        stroke={strokeColor}
        strokeWidth={2}
      />
    </Svg>
  );
};
