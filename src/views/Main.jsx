/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
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
// ────────────────────────────────────────────────────────────────────────────────

const MainView = () => {
  //
  // ─── State Hooks ─────────────────────────────────────────────────────────────────────
  //
  const [picture, setPicture] = useState('');
  const [altText, setAltText] = React.useState('No image uploaded');
  const [isDragging, setDragging] = React.useState(false);
  const [image] = useImage(picture);
  const [bordercolor, setBorderColor] = useState('#f7fff7');
  // const [overlay, setOverlay] = useState('');
  const [text, setText] = useState('');
  const [textcolor, setTextcolor] = React.useState('#fb4b4e');

  // useDimensions hook, observes the size of Stage for the other canvas elements to reference
  const { observe, width, height } = useDimensions({
    useBorderBoxSize: true, // Tell the hook to measure based on the border-box size, default is false
    polyfill: ResizeObserver, // Use polyfill to make this feature works on more browsers
  });

  // Creates image object url when file is uploaded
  const onImageChange = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
    setAltText('Your uploaded image');
  };

  // Change colors with input values
  const onBorderColorChange = (e) => setBorderColor(e.target.value);
  const onTextColorChange = (e) => setTextcolor(e.target.value);

  // refs for stage, image, and transformer nodes
  const stageRef = React.useRef(null);
  const imageRef = React.useRef();
  const trRef = React.useRef();

  // attach transformer node to canvas image https://konvajs.org/docs/react/Transformer.html
  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([imageRef.current]);
      // trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // the browser won't open the base64 DataURL, this solution puts it in an iframe to open in a new tab
  // https://ourcodeworld.com/articles/read/682/what-does-the-not-allowed-to-navigate-top-frame-to-data-url-javascript-exception-means-in-google-chrome
  function debugBase64(base64URL) {
    var win = window.open();
    win.document.write(
      '<html style="margin:0;"><iframe src="' +
        base64URL +
        '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe></html>'
    );
  }

  // captures current stageRef as base64 dataURL 'uri'. Will need to use different ref when image transform and stage cropping are implemented
  const handleExport = () => {
    let uri = '';
    picture === ''
      ? alert('Upload an image first')
      : ((uri = stageRef.current.toDataURL({
          pixelratio: 2,
        })),
        debugBase64(uri));
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
              onClick={onSelect}
              onTap={onSelect}
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
            {/* // TEXT CREATED BY ADD TEXT*/}
            <Text
              text={text}
              x={width / 2}
              y={height / 2 + 100}
              fill={textcolor}
              align="center"
              fontSize={30}
              fontStyle="bold"
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

      {/* // ─── IMAGE EDITING BUTTONS ─────────────────────────────────────── */}
      <ButtonBar
        ImageChange={onImageChange}
        export={handleExport}
        bordercolor={bordercolor}
        bordercolorinput={onBorderColorChange}
      >
        <TextEditor
          ontextcolorinput={onTextColorChange}
          textvalue={text}
          ontextinput={(e) => setText(e.target.value)}
          txtcolorvalue={textcolor}
          ontxtcolorinput={(e) => setTextcolor(e.target.value)}
        />
      </ButtonBar>
    </CanvasArea>
  );
};

export default MainView;
