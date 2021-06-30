/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
///https://konvajs.org/docs/react/Intro.html
import { Stage, Layer, Circle, Image, Text, Transformer } from 'react-konva';
import useImage from 'use-image';

//
// ─── FORM STYLES ───────────────────────────────────────────────────────────────────
//
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
const UploadBtn = styled.div`
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.67, 0.17, 0.4, 0.83);
  background-color: var(--appblue);
  position: relative;
  bottom: 0;
  color: var(--appwhite);
  font-size: 1.5rem;
  width: fit-content;
  justify-self: center;
  align-self: flex-end;
  justify-items: center;
  padding: 1rem;
  cursor: pointer;
`;
const BtnLabel = styled.label`
  cursor: pointer;
`;
// ─── EDITOR MENU STYLES ───────────────────────────
const PaintTools = styled.section`
  display: grid;
  column-width: 25%;
  grid-template-areas:
    'bcolor bstyle overlay texttools'
    'bclabel bslabel olabel texttools';
  gap: 0.5rem;
`;

const BorderColor = styled.input`
  grid-area: bcolor;
  width: 5rem;
  height: 3rem;
  padding: 0;
  margin: 0;
  border: none;
  place-self: center;
`;
const Overlay = styled.input`
  grid-area: overlay;
  width: 5rem;
  height: 3rem;
  padding: 0;
  margin: 0;
  border: none;
  place-self: center;
`;
const BorderColorLabel = styled.label`
  grid-area: bclabel;
  font-size: 1.5rem;
  place-self: center;
  text-align: center;
`;
const BorderStyleLabel = styled.label`
  grid-area: bslabel;
  font-size: 1.5rem;
  place-self: center;
  text-align: center;
`;
const OverlayLabel = styled.label`
  grid-area: olabel;
  font-size: 1.5rem;
  overflow-wrap: anywhere;
  place-self: center;
  text-align: center;
`;

// ─── TEXT EDITOR STYLES ────────────────────────────────────
const TextEditor = styled.section`
  grid-area: texttools;
  display: grid;
  grid-template-areas:
    'text textcolor fontpicker size'
    'textlabel textlabel textlabel textlabel';
`;
const TokenText = styled.input`
  grid-area: text;
  width: 10rem;
  height: 3rem;
  margin: 0;
  border: none;
  place-self: center;
  resize: none;
  padding: 5px;
`;
const TextLabel = styled.label`
  grid-area: textlabel;
  font-size: 1.5rem;
  place-self: center;
  text-align: center;
`;
const TextColorPicker = styled.input`
  grid-area: textcolor;
  width: 5rem;
  height: 3rem;
  padding: 0;
  margin: 0;
  border: none;
  place-self: center;
`;

const UploadImage = () => {
  const [picture, setPicture] = useState('');
  const [altText, setAltText] = React.useState('No image uploaded');
  const [isDragging, setDragging] = React.useState(false);
  const [image] = useImage(picture);
  const [bordercolor, setBorderColor] = useState('#fb4b4e');
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
        height={window.innerHeight / 2}
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
            y={window.innerHeight / 4}
            stroke={bordercolor}
            radius={150}
            fillEnabled={false}
          />
          <Text
            text={text}
            x={window.innerWidth / 2}
            y={window.innerHeight / 4 + 150}
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
        <BorderColor
          name="bordercolor"
          type="color"
          value={bordercolor}
          onChange={(e) => setBorderColor(e.target.value)}
        />
        <BorderColorLabel htmlFor="bordercolor">
          Border
          <br /> Color
        </BorderColorLabel>
        {/* Border Style picker */}
        <BorderStyleLabel htmlFor="borderstyle">
          Border
          <br /> Style
        </BorderStyleLabel>
        <Overlay
          name="overlay"
          type="color"
          value={overlay}
          onChange={(e) => setOverlay(e.target.value)}
        />
        <OverlayLabel htmlFor="overlay">
          Overlay
          <br /> Color
        </OverlayLabel>
        <TextEditor>
          <TokenText
            name="tokentext"
            type="text"
            value={text}
            placeholder="Optional nameplate..."
            onChange={(e) => setText(e.target.value)}
          ></TokenText>
          <TextColorPicker
            name="textcolor"
            type="color"
            value={textcolor}
            onChange={(e) => setTextcolor(e.target.value)}
          />
          <TextLabel htmlFor="tokentext">Add Text</TextLabel>
        </TextEditor>
      </PaintTools>

      {/* //
      // ─── IMAGE UPLOAD FORM ───────────────────────────────────────────
      // */}
      <ImgForm method="post" encType="multipart/form-data">
        <UploadBtn>
          <BtnLabel htmlFor="imageFile">Upload an Image </BtnLabel>
          <ChooseFile
            type="file"
            id="imageFile"
            name="imageFile"
            capture="user"
            onChange={onImageChange}
            accept="image/png, image/jpeg, image/webp"
          />
        </UploadBtn>
      </ImgForm>
    </>
  );
};

export default UploadImage;
