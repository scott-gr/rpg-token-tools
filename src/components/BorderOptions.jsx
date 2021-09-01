// /** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';
import React from 'react';
// import styled from '@emotion/styled/macro';
///https://konvajs.org/docs/react/Intro.html
import { Circle, Rect, RegularPolygon } from 'react-konva';

export const CircleBorder = (circleProps) => {
  return (
    <Circle
      {...circleProps}
      radius={135}
      strokeWidth={10}
      shadowBlur={5}
      fillEnabled={false}
    />
  );
};

export const SquareBorder = (squareProps) => {
  return (
    <Rect
      {...squareProps}
      height={270}
      width={270}
      strokeWidth={10}
      shadowBlur={5}
      fillEnabled={false}
    />
  );
};

export const HexBorder = (hexProps) => {
  return (
    <RegularPolygon
      {...hexProps}
      sides={6}
      radius={135}
      strokeWidth={10}
      shadowBlur={5}
      fillEnabled={false}
    />
  );
};
