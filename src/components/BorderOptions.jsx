import { Emboss } from 'konva/lib/filters/Emboss';
import React from 'react';
///https://konvajs.org/docs/react/Intro.html
import { Circle, Rect, RegularPolygon } from 'react-konva';

const CircleBorder = (circleProps) => {
  return (
    <Circle
      {...circleProps}
      radius={135}
      strokeWidth={10}
      shadowBlur={3}
      fillEnabled={false}
      onMouseDown={() => {
        document.body.style.cursor = 'no-drop';
      }}
      onMouseUp={() => {
        document.body.style.cursor = 'default';
      }}
    />
  );
};

const SquareBorder = (squareProps) => {
  return (
    <Rect
      {...squareProps}
      height={270}
      width={270}
      strokeWidth={10}
      shadowBlur={3}
      fillEnabled={false}
      onMouseDown={() => {
        document.body.style.cursor = 'no-drop';
      }}
      onMouseUp={() => {
        document.body.style.cursor = 'default';
      }}
    />
  );
};

const HexBorderA = (hexProps) => {
  return (
    <RegularPolygon
      {...hexProps}
      sides={6}
      radius={135}
      strokeWidth={10}
      shadowBlur={3}
      fillEnabled={false}
      onMouseDown={() => {
        document.body.style.cursor = 'no-drop';
      }}
      onMouseUp={() => {
        document.body.style.cursor = 'default';
      }}
    />
  );
};

const HexBorderB = (hexProps) => {
  return (
    <RegularPolygon
      {...hexProps}
      sides={6}
      radius={135}
      strokeWidth={10}
      shadowBlur={3}
      fillEnabled={false}
      rotation={30}
      onMouseDown={() => {
        document.body.style.cursor = 'no-drop';
      }}
      onMouseUp={() => {
        document.body.style.cursor = 'default';
      }}

    />
  );
};

const Bordershape = (props) => {
  if (props.borderstyle === 'hexA') {
    return (
      <HexBorderA
        x={props.width / 2}
        y={props.height / 2}
        stroke={props.bordercolor}
      />
    );
  } else if (props.borderstyle === 'square') {
    return (
      <SquareBorder
        x={props.width / 2 - 135}
        y={props.height / 2 -135}
        stroke={props.bordercolor}
      />
    );
  } else if (props.borderstyle === 'hexB') {
    return (
      <HexBorderB
        x={props.width / 2}
        y={props.height / 2}
        stroke={props.bordercolor}

      />
    );
  } else {
    return (
      <CircleBorder
        x={props.width / 2}
        y={props.height / 2}
        stroke={props.bordercolor}
      />
    );
  }
};

export default Bordershape;
