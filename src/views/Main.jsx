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

//component imports
import TextEditor from '../components/TextEditor';
import UploadIcon from '../components/icons/Upload';
import UploadImage from '../components/UploadImage';
import DownloadImage from '../components/DownloadImage';
import DownloadIcon from '../components/icons/Download';

//
// ─── STYLES ───────────────────────────────────────────────────────────────────
//

const dynamicStyle = (props) => css`
  background: ${props.bgColor};
  display: ${props.btnDisplay};
  color: ${props.labelcolor};
`;

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

const ButtonBar = styled.section`
  display: flex;
  flex-wrap: wrap;
  font-size: var(--s2);
  gap: 0.5rem;
  padding-inline-start: 0;
  padding-inline-end: 0;
  margin-block-start: 0;
  height: 100%;
  margin-block-end: 0;
  & > * {
    flex-grow: 1;

    flex-basis: calc((40rem - 100%) * 999);
  }
  & > :nth-last-of-type(n + 7),
  :nth-last-of-type(n + 7) ~ * {
    flex-basis: 100%;
  }
`;
const ButtonLabel = styled.label`
  ${dynamicStyle};
  z-index: 1;
  font-size: var(--s1);
  position: absolute;
  align-self: center;
  text-align: center;
  cursor: pointer;
  -webkit-filter: invert(100%);
  filter: invert(100%);
`;

// ─── EDITOR MENU STYLES ───────────────────────────
const btnStyle = css`
  display: flex;
  justify-content: center;
  font-family: 'Inconsolata', 'Helvetica', 'Arial', sans-serif;
  height: var(--s3);
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
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

const ToolBtn = styled.button`
  ${btnStyle}
  ${dynamicStyle};
`;

const ColorInput = styled.input`
  z-index: 4;
  width: 100%;
  height: 100%;
  opacity: 0;
  padding: 0;
  margin: 0;
  border: none;
  cursor: pointer;
  inset: 0px;
  position: absolute;
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
  const [overlay, setOverlay] = useState('');
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
  const stageRef = React.useRef(null);

  const handleExport = () => {
    const uri = stageRef.current.toDataURL({
      pixelratio: 2,
    });
    console.log(uri);
    downloadURI(uri, 'token.png');
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

      <ButtonBar>
        <ToolBtn bgColor={bordercolor}>
          <ColorInput
            name="bordercolor"
            title="bordercolor"
            type="color"
            onInput={(e) => setBorderColor(e.target.value)}
            value={bordercolor}
          />
          <ButtonLabel
            htmlFor="bordercolor"
            labelcolor={bordercolor ? bordercolor : '#f7fff7'}
          >
            Border Color
          </ButtonLabel>
        </ToolBtn>
        <ToolBtn>
          {/* Border Style picker */}
          <ButtonLabel htmlFor="borderstyle" labelcolor={'#f7fff7'}>
            Border Style
          </ButtonLabel>
        </ToolBtn>
        <ToolBtn bgColor={overlay} form="overlaycolor">
          <ColorInput
            name="overlay"
            title="overlay"
            id="overlaycolor"
            type="color"
            value={overlay}
            onInput={(e) => setOverlay(e.target.value)}
          />
          <ButtonLabel
            htmlFor="overlay"
            labelcolor={overlay ? overlay : '#f7fff7'}
          >
            Overlay Color
          </ButtonLabel>
        </ToolBtn>
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
        </TextEditor>
        {/* // ─── IMAGE UPLOAD FORM ───────────────────────────────────────────
      //  */}

        <UploadImage
          onImageInput={onImageChange}
          usecss={css`
            ${btnStyle}
            align-items: center;
            column-gap: var(--s0);
            border-color: var(--appblue);
            &:after {
              border-color: var(--appblue);
              background-color: var(--appblue);
            }
            &:hover {
              > * > * {
                fill: var(--appblue);
                filter: invert(1);
              }
            }
          `}
        >
          <ButtonLabel htmlFor="imageFile" labelcolor="#f7fff7">
            Upload <UploadIcon />
          </ButtonLabel>
        </UploadImage>
        <DownloadImage
          handleclick={handleExport}
          usecss={css`
            ${btnStyle};
            width: 100%;
            border-color: var(--appred);
            &:after {
              border-color: var(--appred);
              background-color: var(--appred);
            }
            &:hover {
              > * > * {
                fill: var(--appred);
                stroke: var(--appred);
                filter: invert(1);
              }
            }
          `}
        >
          <ButtonLabel labelcolor="#f7fff7">
            Download <DownloadIcon />{' '}
          </ButtonLabel>
        </DownloadImage>
      </ButtonBar>
    </CanvasArea>
  );
};

export default MainView;
