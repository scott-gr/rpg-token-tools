import React from 'react';
import styled from '@emotion/styled';
import useCanvas from './CanvasHook';


// ─── CANVAS ELEMENT STYLE ───────────────────────────────────────────────────────
const MyCanvas = styled.canvas`
  border-color: red;
  border-style: solid;
  border-width: 2px;
  width: 300px;
  height: 300px;
  place-self: center;
`;
// ────────────────────────────────────────────────────────────────────────────────


const Canvas = (props) => {
  const { draw, ...rest } = props;
  const canvasRef = useCanvas(draw);

  return <MyCanvas ref={canvasRef} {...rest} />;
};

export default Canvas;
