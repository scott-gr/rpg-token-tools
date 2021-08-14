/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
///https://konvajs.org/docs/react/Intro.html
import { Stage, Layer, Circle, Image, Text, Transformer } from 'react-konva';
import useImage from 'use-image';
import TextEditor from '../TextEditor/TextEditor';
//
// ─── FORM STYLES ───────────────────────────────────────────────────────────────────
//

const dynamicStyle = (props) => css`
  background: ${props.bgColor};
  display: ${props.btnDisplay};
  color: ${props.labelcolor};
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
gap: var(--s0);
  & > :last-child {
    flex-basis: 20rem;
    flex-grow: 1;
  }
  & > :first-child {
    flex-basis: 0;
    flex-grow: 999;
    min-width: 60%;
  }
`;

const ButtonBar = styled.section`
  display: flex;
  flex-wrap: wrap;
  font-size: var(--s2);
  gap: var(--s0);
  padding-inline-start: 0;
  padding-inline-end: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  & > * {
    flex-grow: 1;
    height: var(--s4);
    flex-basis: calc((30rem - 100%) * 999);
  }
  & > :nth-last-of-type(n + 6),
  :nth-last-of-type(n + 6) ~ * {
    flex-basis: 100%;
  }
`;

const ChooseFile = styled.input`
  width: 100%;
  -webkit-tap-highlight-color: transparent;
  z-index: 1;
  opacity: 0;
  cursor: pointer;
`;
const ImgForm = styled.form`

`;
// ─── EDITOR MENU STYLES ───────────────────────────
const btnStyle = css`
  display: flex;
  place-content: center;
  font-family: 'Inconsolata', 'Helvetica', 'Arial', sans-serif;
  height: var(--s4);
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  border: 4px solid var(--appgrey);
  color: var(--appblack);
  background: var(--appwhite);
  position: relative;

  cursor: pointer;
  width: 100%;
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
const UploadBtn = styled.div`
  ${btnStyle};
  border-color: var(--appblue);
  &:after {
    border-color: var(--appblue);
    background-color: var(--appblue);
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

const UploadImage = () => {
  const [picture, setPicture] = useState('');
  const [altText, setAltText] = React.useState('No image uploaded');
  const [isDragging, setDragging] = React.useState(false);
  const [image] = useImage(picture);
  const [bordercolor, setBorderColor] = useState('#f7fff7');
  const [overlay, setOverlay] = useState('');
  const [text, setText] = useState('');
  const [textcolor, setTextcolor] = React.useState('#f7fff7');

  const onImageChange = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
    setAltText('Your uploaded image');
  };

  const canvassize = {
    height: window.innerHeight * 0.5,
    width: window.innerWidth,
  };

  return (
    <Container>
      {/* // // ─── CANVAS ELEMENT USING REACT-KONVA
      https://konvajs.org/docs/react/Intro.html ------------ // */}
      <Stage
        pixelratio={1}
        width={canvassize.width}
        height={canvassize.height}
        css={css`
          border-color: var(--appgrey);
          border-style: dashed;
          border-width: 1px;
          box-sizing: content-box;
          overflow: hidden;
        `}
      >
        <Layer>
          <Image
            image={image}
            draggable={true}
            alt={altText}
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
            x={canvassize.width / 2}
            y={canvassize.height / 2}
            stroke={bordercolor ? bordercolor : '#fb4b4e'}
            radius={125}
            fillEnabled={false}
          />
          <Text
            text={text}
            x={canvassize.width / 2}
            y={canvassize.height / 2 + 150}
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
          usecss={btnStyle}
          textvalue={text}
          ontextinput={(e) => setText(e.target.value)}
          txtcolorvalue={textcolor}
          ontxtcolorinput={(e) => setTextcolor(e.target.value)}
        />

        {/* //
      // ─── IMAGE UPLOAD FORM ───────────────────────────────────────────
      // */}
        <ImgForm method="post" encType="multipart/form-data">
          <UploadBtn form="imagefile">
            <ButtonLabel htmlFor="imageFile" labelcolor="#f7fff7">
              Upload an Image{' '}
            </ButtonLabel>
            <ChooseFile
              type="file"
              id="imageFile"
              name="imageFile"
              title="imageFile"
              onInput={onImageChange}
              accept="image/png, image/jpeg, image/webp"
            />
          </UploadBtn>
        </ImgForm>
      </ButtonBar>
    </Container>
  );
};

export default UploadImage;
