/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
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
  color: ${props.textcolor};
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
`;
// ─── EDITOR MENU STYLES ───────────────────────────
const btnStyle = css`
  display: flex;
  gap: 1rem;
  flex-flow: row-reverse wrap;
  /* &:hover {
    box-shadow: 0 6px 18px 0 rgba(#000, 0.1);
    transform: translateY(-6px);
  } */
  font-family: 'Inconsolata', 'Helvetica', 'Arial', sans-serif;
  text-align: center;
  place-content: center;
  place-self: center;
  height: 100%;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  /*Button Color & Border*/
  border: 4px solid var(--appgrey);
  color: var(--appblack);
  background: var(--appwhite);
  /*Position, Display, Size*/
  position: relative;
  padding: 12px;
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
`;
const PaintTools = styled.section`
  display: grid;
  column-width: 25%;
  grid-template-areas: 'bcolor bstyle overlay texttools';
  padding-bottom: 0.5rem;
`;

const ToolBtn = styled.button`
  ${btnStyle}
  ${dynamicStyle};
`;

const BorderColor = styled.input`
  z-index: 4;
  width: 100%;
  height: 100%;
  opacity: 0;
  padding: 0;
  margin: 0;
  border: none;
  cursor: pointer;
  top: 0px;
  left: 0;
  right: 0px;
  bottom: 0px;
  position: absolute;
`;
const Overlay = styled.input`
  width: 5rem;
  height: 3rem;
  padding: 0;
  margin: 0;
  border: none;
  place-self: center;
  cursor: pointer;
`;
const BorderColorLabel = styled.label`
  ${dynamicStyle};
  z-index: 1;
  font-size: 1.5rem;
  place-self: center;
  text-align: center;
  cursor: pointer;
  -webkit-filter: invert(100%);
  filter: invert(100%);
`;
const BorderStyleLabel = styled.label`
  font-size: 1.5rem;
  place-self: center;
  text-align: center;
  cursor: pointer;
`;
const OverlayLabel = styled.label`
  font-size: 1.5rem;
  overflow-wrap: anywhere;
  place-self: center;
  text-align: center;
  cursor: pointer;
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
        height={window.innerHeight / 3}
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
        <ToolBtn bgColor={bordercolor} btnDisplay={'block'} area="bcolor">
          <BorderColor
            name="bordercolor"
            type="color"
            value={bordercolor}
            onChange={(e) => setBorderColor(e.target.value)}
          />
          <BorderColorLabel htmlFor="bordercolor" textcolor={bordercolor}>
            Border Color
          </BorderColorLabel>
        </ToolBtn>
        <ToolBtn area="bstyle">
          {/* Border Style picker */}
          <BorderStyleLabel htmlFor="borderstyle">
            Border Style
          </BorderStyleLabel>
        </ToolBtn>
        <ToolBtn area="overlay">
          <Overlay
            name="overlay"
            type="color"
            value={overlay}
            onChange={(e) => setOverlay(e.target.value)}
          />
          <OverlayLabel htmlFor="overlay">Overlay Color</OverlayLabel>
        </ToolBtn>
        <ToolBtn area="texttools">
          <TextEditor />
        </ToolBtn>
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
