/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
///https://konvajs.org/docs/react/Intro.html
import { Stage, Layer, Circle, Image, Text, Transformer } from 'react-konva';
import useImage from 'use-image';
//https://github.com/wellyshen/react-cool-dimensions
import useDimensions from 'react-cool-dimensions';
import { ResizeObserver } from '@juggle/resize-observer';
import ButtonBar from '../components/ButtonBar';
import TextEditor from '../components/TextEditor';

//
// ─── STYLES ───────────────────────────────────────────────────────────────────
//

const CanvasArea = styled.div`
  max-height: 400px;
  min-height: 300px;
  display: flex;
  flex-wrap: wrap;
  gap: var(--s0);
  --threshold: 30rem;
  & > * {
    flex-grow: 1;
    height: 99%;
    flex-basis: calc((var(--threshold) - 100%) * 999);
  }
  & > :first-child {
    flex-grow: 2;
    min-width: 65%;
  }
`;
// // ─── EDITOR MENU STYLES ───────────────────────────

const dynamicStyle = (props) => css`
  background: ${props.bgColor};
  display: ${props.btnDisplay};
  color: ${props.labelcolor};
`;
const btnStyle = css`
  display: flex;
  justify-content: center;
  font-family: 'Inconsolata', 'Helvetica', 'Arial', sans-serif;
  height: var(--s3);
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  z-index: 1;
  text-decoration: none;
  border: 4px solid var(--appgrey);
  color: var(--appblack);
  background: var(--appwhite);
  position: relative;

  cursor: pointer;
  /* width: 100%; */
  &:after {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px solid var(--appgrey);
    background-color: var(--appgrey);
    left: 4px;
    top: 4px;
    z-index: -1;
    content: '';
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    -o-transition: all 0.2s;
  }
  &:hover {
    top: 2px;
    left: 2px;
    cursor: pointer;
    border: 4px solid var(--appblack);
  }
  &:hover:after {
    top: -2px;
    left: -2px;
    cursor: pointer;
  }
`;
const ButtonLabel = styled.label`
  ${dynamicStyle};
  z-index: 0;
  font-size: var(--s1);
  position: absolute;
  align-self: center;
  text-align: center;
  cursor: pointer;
  -webkit-filter: invert(100%);
  filter: invert(100%);
`;

// function from https://stackoverflow.com/a/15832662/512042
function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const MainView = () => {
  const [picture, setPicture] = useState('');
  const [altText, setAltText] = React.useState('No image uploaded');
  const [isDragging, setDragging] = React.useState(false);
  const [image] = useImage(picture);
  const [bordercolor, setBorderColor] = useState('#f7fff7');
  // const [overlay, setOverlay] = useState('');
  const [text, setText] = useState('');
  const [textcolor, setTextcolor] = React.useState('#f7fff7');

  const { observe, width, height } = useDimensions({
    useBorderBoxSize: true, // Tell the hook to measure based on the border-box size, default is false
    polyfill: ResizeObserver, // Use polyfill to make this feature works on more browsers
  });

  const onImageChange = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
    setAltText('Your uploaded image');
  };
  const onBorderColorChange = (e) => setBorderColor(e.target.value);
  const onTextColorChange = (e) => setTextcolor(e.target.value);

  const stageRef = React.useRef(null);

  let uri = '';
  const handleExport = () => {
    picture === ''
      ? alert('upload an image first')
      : ((uri = stageRef.current.toDataURL({
          pixelratio: 2,
        })),
        downloadURI(uri, 'token.png'));
  };

  return (
    <CanvasArea>
      {/* // // ─── CANVAS ELEMENT USING REACT-KONVA
      https://konvajs.org/docs/react/Intro.html ------------ // */}
      <div
        ref={observe}
        css={css`
          height: unset;
          max-height: 400px;
          min-height: 288px;
        `}
      >
        <Stage
          width={width}
          height={height * 0.99}
          ref={stageRef}
          css={css`
            border-color: var(--appgrey);
            border-style: dashed;
            border-width: 1px;
            overflow: hidden;
            height: 100%;
          `}
        >
          <Layer>
            <Image
              image={image}
              draggable={true}
              alt={altText}
              css={css`
                width: 100%;
                height: 100%;
                object-fit: contain;
              `}
              //
              // CURSOR GRABBING HAND
              //
              onMouseOver={() => {
                document.body.style.cursor = 'grab';
              }}
              onMouseOut={() => {
                document.body.style.cursor = 'default';
              }}
              onMouseDown={() => {
                document.body.style.cursor = 'grabbing';
              }}
              onDragStart={() => {
                setDragging(true);
                document.body.style.cursor = 'grabbing';
              }}
              onDragEnd={() => {
                setDragging(false);
                document.body.style.cursor = 'grab';
              }}
            />
            {/* //
// ─── CIRCLE FOR TOKEN BORDER ────────────────────────────────────────────────────
// */}
            <Circle
              x={width / 2}
              y={height / 2}
              stroke={bordercolor ? bordercolor : '#fb4b4e'}
              radius={135}
              fillEnabled={false}
            />
            <Text
              text={text}
              x={width / 2}
              y={height / 2 + 150}
              fill={textcolor}
              align="center"
              fontSize={20}
              draggable={true}
              onMouseOver={() => {
                document.body.style.cursor = 'grab';
              }}
              onMouseOut={() => {
                document.body.style.cursor = 'default';
              }}
              onMouseDown={() => {
                document.body.style.cursor = 'grabbing';
              }}
              onDragStart={() => {
                setDragging(true);
                document.body.style.cursor = 'grabbing';
              }}
              onDragEnd={() => {
                setDragging(false);
                document.body.style.cursor = 'grab';
              }}
            />
          </Layer>
        </Stage>
      </div>
      <ButtonBar
        ImageChange={onImageChange}
        export={handleExport}
        bordercolor={bordercolor}
        bordercolorinput={onBorderColorChange}
        ontextcolorinput={onTextColorChange}
      >
        <TextEditor
          usecss={css`
            ${btnStyle}
          `}
          textvalue={text}
          ontextinput={(e) => setText(e.target.value)}
          txtcolorvalue={textcolor}
          ontxtcolorinput={(e) => setTextcolor(e.target.value)}
        >
          {' '}
          <ButtonLabel htmlFor="overlay" labelcolor={'#f7fff7'}>
            Add Text
          </ButtonLabel>
        </TextEditor>{' '}
      </ButtonBar>
    </CanvasArea>
  );
};

export default MainView;
