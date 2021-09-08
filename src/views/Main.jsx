/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { memo, useEffect, useState } from 'react';
import styled from '@emotion/styled/macro';
///https://konvajs.org/docs/react/Intro.html
import { Stage, Layer, Text, Group } from 'react-konva';
import useImage from 'use-image';
//https://github.com/wellyshen/react-cool-dimensions
import useDimensions from 'react-cool-dimensions';
import { ResizeObserver } from '@juggle/resize-observer';
import ButtonBar from '../components/ButtonBar';
import TextEditor from '../components/TextEditor';
import TokenImage from '../components/TokenImage';
import { CircleBorder, HexBorder } from '../components/BorderOptions';

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
// ────────────────────────────────────────────────────────────────────────────────

const MainView = memo(() => {
  //
  // ─── State Hooks ─────────────────────────────────────────────────────────────────────
  //
  const [picture, setPicture] = useState('');
  const [altText, setAltText] = React.useState('No image uploaded');
  const [name, setName] = React.useState(undefined);
  const [selectedImg, selectImage] = React.useState(null);
  const [isDragging, setDragging] = React.useState(false);
  const [image] = useImage(picture);
  const [bordercolor, setBorderColor] = useState('#f7fff7');
  // const [overlay, setOverlay] = useState('');
  const [text, setText] = useState('');
  const [textcolor, setTextcolor] = React.useState('#fb4b4e');
  const [borderStyle, setBorderStyle] = React.useState('circle');
  const [xAxis, setxAxis] = React.useState(null);
  const [yAxis, setyAxis] = React.useState(null);

  // useDimensions hook, observes the size of Stage for the other canvas elements to reference
  const { observe, width, height } = useDimensions({
    useBorderBoxSize: true, // Tell the hook to measure based on the border-box size, default is false
    polyfill: ResizeObserver, // Use polyfill to make this feature works on more browsers
  });

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectImage(null);
    }
  };

  // Creates image object url when file is uploaded
  const onImageChange = (e) => {
    resetXY;
    setPicture(URL.createObjectURL(e.target.files[0]));
    setAltText('Your uploaded image');
    setName('Token' + picture);
  };

  const resetXY = () => {
    setxAxis(image ? width / 2 - image.width / 2 : 40);
    setyAxis(image ? height / 2 - image.height / 3 : 40);
  };

  // Change colors with input values
  const onBorderColorChange = (e) => setBorderColor(e.target.value);
  const onTextColorChange = (e) => setTextcolor(e.target.value);
  const onTextInput = (e) => setText(e.target.value);

  const stageRef = React.useRef(null);
  // the browser won't open the base64 DataURL, this solution puts it in an iframe to open in a new tab
  // https://ourcodeworld.com/articles/read/682/what-does-the-not-allowed-to-navigate-top-frame-to-data-url-javascript-exception-means-in-google-chrome
  function debugBase64(base64URL) {
    var win = window.open();
    win.document.write(
      '<html style="margin:0; background:black;"><iframe src="' +
        base64URL +
        '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%" allowfullscreen></iframe></html>'
    );
  }

  // removes transformer selection box from around the image before it is exported
  const deselectImg = () => {
    selectedImg === image ? selectImage(null) : console.log('nothing selected');
  };

  // captures current stageRef as base64 dataURL 'uri'. Will need to use different ref when image transform and stage cropping are implemented
  const createImgUrl = () => {
    let uri = '';
    picture === ''
      ? alert('Upload an image first')
      : ((uri = stageRef.current.toDataURL({
          pixelratio: 2,
        })),
        debugBase64(uri));
  };

  // opens the token in a new browser tab
  const handleExport = async () => {
    try {
      const stepOne = await deselectImg();
      const stepTwo = await createImgUrl();
    } catch (err) {
      console.log('Sorry, something went wrong!');
    }
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
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            <Group>
              <TokenImage
                image={image}
                alt={altText}
                name={name}
                x={xAxis ? xAxis : image ? width / 2 - image.width / 2 : 40}
                y={yAxis ? yAxis : image ? height / 2 - image.height / 3 : 40}
                isSelected={image === selectedImg}
                onSelect={() => {
                  checkDeselect;
                  selectImage(image);
                }}
              />

              {/*
// ─── CIRCLE FOR TOKEN BORDER ────────────────────────────────────────────────────
// */}
              <HexBorder x={width / 2} y={height / 2} stroke={bordercolor} />
              {/* // TEXT CREATED BY ADD TEXT*/}
              <Text
                text={text}
                x={width / 2 - 10}
                y={height / 2 + 80}
                fill={textcolor}
                align="center"
                fontSize={30}
                fontStyle="bold"
                draggable={true}
                onDblClick={() => {
                  document.getElementById('TextModal').open = true;
                }}
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
            </Group>
          </Layer>
        </Stage>
      </div>

      {/* // ─── IMAGE EDITING BUTTONS ─────────────────────────────────────── */}
      <ButtonBar
        ImageChange={(checkDeselect, onImageChange)}
        export={handleExport}
        bordercolor={bordercolor}
        bordercolorinput={onBorderColorChange}
      >
        <TextEditor
          ontxtcolorinput={onTextColorChange}
          textvalue={text}
          ontextinput={onTextInput}
          txtcolorvalue={textcolor}
        />
      </ButtonBar>
    </CanvasArea>
  );
});

export default MainView;
