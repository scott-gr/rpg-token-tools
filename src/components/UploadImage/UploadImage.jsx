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
  grid-area: ${props.area};
  color: ${props.labelcolor};
`;

const ChooseFile = styled.input`
  position: absolute;
  top: 0px;
  left: 0;
  right: 0px;
  bottom: 0px;
  width: 100%;
  -webkit-tap-highlight-color: transparent;
  z-index: 1;
  opacity: 0;
  cursor: pointer;
`;
const ImgForm = styled.form`
  justify-content: center;
  display: flex;
`;

const BtnLabel = styled.label`
  cursor: pointer;
  place-self: center;
`;
// ─── EDITOR MENU STYLES ───────────────────────────
const btnStyle = css`
  display: flex;
  place-content: center;
  font-family: 'Inconsolata', 'Helvetica', 'Arial', sans-serif;
  text-align: center;
  height: 3.5rem;
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
  font-size: 2.5rem;
  &:after {
    border-color: var(--appblue);
    background-color: var(--appblue);
  }
  place-content: center;
`;
const PaintTools = styled.section`
  display: flex;
  gap:.25rem;
  flex-flow: row wrap;
  grid-template-areas: 'bcolor bstyle overlay texttools';
  padding-bottom: 0.5rem;
`;

const ToolBtn = styled.button`
  width: 25%;
  flex: 1 1 25%;
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
  font-size: 1.5rem;
  place-self: center;
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
  const [bordercolor, setBorderColor] = useState(undefined);
  const [overlay, setOverlay] = useState('');
  const [text, setText] = useState('');
  const [textcolor, setTextcolor] = React.useState('#f7fff7');

  //   const checkDeselect = (e) => {
  //     // deselect when clicked on empty area
  //     const clickedOnEmpty = e.target === e.target.getStage();
  //     if (clickedOnEmpty) {
  //       selectShape(null);
  //     }
  //   };

  // const imageRef = React.useRef();
  // const trRef = React.useRef();

  //   React.useEffect(() => {
  //     if (isSelected) {
  //       // we need to attach transformer manually
  //       trRef.current.nodes([shapeRef.current]);
  //       trRef.current.getLayer().batchDraw();
  //     }
  //   }, [isSelected]);

  // When image uploaded in file input form, create a URL to use it as src and set default alt text
  const onImageChange = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
    setAltText('Your uploaded image');
  };

  return (
    <>
      {/* // // ─── CANVAS ELEMENT USING REACT-KONVA
      https://konvajs.org/docs/react/Intro.html ------------ // */}
      <Stage
        width={window.innerWidth}
        height={window.innerHeight * .4}
        css={css`
          place-self: center;
          margin: 0;
          padding: 0;
          border-color: var(--appgrey);
          border-style: dashed;
          border-width: 1px;
        `}
      >
        <Layer>
          {/* //
          // USER'S UPLOADED IMAGE
          //          */}
          <Image
            image={image}
            draggable={true}
            alt={altText}
            // ref={imageRef}
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
            x={window.innerWidth / 2}
            y={window.innerHeight / 6}
            stroke={bordercolor ? bordercolor : '#fb4b4e'}
            radius={125}
            fillEnabled={false}
          />
          <Text
            text={text}
            x={window.innerWidth / 2}
            y={window.innerHeight / 6 + 150}
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

      <PaintTools>
        <ToolBtn bgColor={bordercolor} area="bcolor">
          <ColorInput
            name="bordercolor"
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
        <ToolBtn area="bstyle">
          {/* Border Style picker */}
          <ButtonLabel htmlFor="borderstyle" labelcolor={'#f7fff7'}>
            Border Style
          </ButtonLabel>
        </ToolBtn>
        <ToolBtn bgColor={overlay} area="overlay" form="overlaycolor">
          <ColorInput
            name="overlay"
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
          renderas={ToolBtn}
          textvalue={text}
          ontextinput={(e) => setText(e.target.value)}
          txtcolorvalue={textcolor}
          ontxtcolorinput={(e) => setTextcolor(e.target.value)}
        />
      </PaintTools>

      {/* //
      // ─── IMAGE UPLOAD FORM ───────────────────────────────────────────
      // */}
      <ImgForm method="post" encType="multipart/form-data">
        <UploadBtn form="imagefile">
          <BtnLabel htmlFor="imageFile">Upload an Image </BtnLabel>
          <ChooseFile
            type="file"
            id="imageFile"
            name="imageFile"
            onInput={onImageChange}
            accept="image/png, image/jpeg, image/webp"
          />
        </UploadBtn>
      </ImgForm>
    </>
  );
};

export default UploadImage;
