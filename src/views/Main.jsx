/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { memo, useEffect, useState, useRef } from 'react';
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
import Bordershape from '../components/BorderOptions';
import Konva from 'konva';

//
// ─── STYLES ───────────────────────────────────────────────────────────────────
//
Konva.hitOnDragEnabled = true;

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
  const [altText, setAltText] = useState('No image uploaded');
  const [name, setName] = useState(undefined);
  const [selectedImg, selectImage] = useState(null);
  const [isDragging, setDragging] = useState(false);
  const [image] = useImage(picture);
  const [bordercolor, setBorderColor] = useState('#f7fff7');
  // const [overlay, setOverlay] = useState('');
  const [text, setText] = useState('');
  const [textcolor, setTextcolor] = useState('#fb4b4e');
  const [fontfamily, setFontFamily] = useState('Federo');
  const [textsize, setTextsize] = useState(30);
  const [borderStyle, setBorderStyle] = useState('circle');
  const [xAxis, setxAxis] = useState(null);
  const [yAxis, setyAxis] = useState(null);
  const [scaleX, setScaleX] = useState(.75);
  const [scaleY, setScaleY] = useState(.75);
  // const [clip, setClip] = useState('');

  const layerRef = useRef();

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
  const resetToken = () => {
    setxAxis(image ? width / 2 - image.width / 2 : 40);
    setyAxis(image ? height / 2 - image.height / 2 : 40);
    setScaleX(null);
    setScaleY(null);
    // setClip('');
  };

  // Creates image object url when file is uploaded
  const onImageChange = (e) => {
    resetToken;
    setPicture(URL.createObjectURL(e.target.files[0]));
    setAltText('Your uploaded image');
    setName('Token' + picture);
    // setClip(clipImg)
  };

  const a = (2 * Math.PI) / 6;
  // const clipImg = (ctx) => {
  //   // clip areas based on selected borderstyle
  //   if (borderStyle === 'hexA') {
  //     ctx.beginPath();
  //     for (var i = 0; i < 6; i++) {
  //       ctx.lineTo(
  //         width / 2 - 141 * Math.cos(a * i),
  //         height / 2 - 141 * Math.sin(a * i)
  //       );
  //     }
  //     ctx.closePath();
  //   } else if (borderStyle === 'square') {
  //     ctx.rect(width / 2 - 140, height / 2 - 140, 280, 280);
  //   } else if (borderStyle === 'hexB') {
  //     ctx.beginPath();
  //     for (var i = 0; i < 6; i++) {
  //       ctx.lineTo(
  //         width / 2 - 141 * Math.cos(a * i),
  //         height / 2 - 141 * Math.sin(a * i)
  //       );
  //     }
  //     ctx.closePath();
  //   } else {
  //     ctx.arc(width / 2, height / 2, 139, 0, Math.PI * 2, false);
  //   }
  // };

  // Change colors with input values
  const onBorderColorChange = (e) => setBorderColor(e.target.value);
  const onTextColorChange = (e) => setTextcolor(e.target.value);
  const onTextInput = (e) => setText(e.target.value);
  const onTextSlide = (e) => setTextsize(e.target.value);
  const onFontPick = (e) => setFontFamily(e.target.value);
  const onBorderShapeChange = (e) => setBorderStyle(e.target.value);

  // the browser won't open the base64 DataURL, this solution puts it in an iframe to open in a new tab
  // https://ourcodeworld.com/articles/read/682/what-does-the-not-allowed-to-navigate-top-frame-to-data-url-javascript-exception-means-in-google-chrome
  function debugBase64(base64URL) {
    var win = window.open();
    win.document.write(
      '<iframe allowfullscreen allow-same-origin allow-scripts title="Your Token" src="' +
        base64URL +
        '"style="border:0; width:100%; height:100%; object-fit:scale-down; object-position:center center;"></iframe>'
    );
  }

  // removes transformer selection box from around the image before it is exported
  const deselectImg = () => {
    selectedImg === image ? selectImage(null) : console.log('nothing selected');
  };

  // captures current stageRef as base64 dataURL 'uri'. Will need to use different ref when image transform and stage cropping are implemented
  const createImgUrl = () => {
    // setClip(clipImg);
    let uri = '';
    picture === ''
      ? alert('Upload an image first')
      : ((uri = layerRef.current.toDataURL({
          pixelRatio: 1.5,
          height: 284,
          width: 284,
          x: width / 2 - 142,
          y: height / 2 - 142,
        })),
        debugBase64(uri));
  };

  // opens the token in a new browser tab
  const handleExport = async () => {
    try {
      const stepOne = await deselectImg();
      const stepThree = await createImgUrl();
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
          height={window.innerHeight}
          // width={width}
          // height={height * 0.99}
          css={css`
            /* border-color: var(--appgrey);
            border-style: dashed;
            border-width: 1px; */
            height: 100%;
            width: 100%;
          `}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          onTap={checkDeselect}
        >
          <Layer ref={layerRef} width={width} height={height * 0.99}>
            <TokenImage
              image={image}
              alt={altText}
              name={name}
              x={xAxis ? xAxis : image ? width / 2 - image.width / 2 : 40}
              y={yAxis ? yAxis : image ? height / 2 - image.height / 2 : 40}
              scaleX={scaleX ? scaleX : image ? image.scaleX : 1}
              scaleY={scaleY ? scaleY : image ? image.scaleY : 1}
              isSelected={image === selectedImg}
              onSelect={() => {
                checkDeselect;
                selectImage(image);
              }}
              onTap={() => {
                checkDeselect;
                selectImage(image);
              }}
            />

            {/*
// ─── CIRCLE FOR TOKEN BORDER ────────────────────────────────────────────────────
// */}
            <Bordershape
              width={width}
              height={height}
              borderstyle={borderStyle}
              bordercolor={bordercolor}
            />

            {/* // TEXT CREATED BY ADD TEXT*/}
            <Text
              x={width / 2 - 10}
              y={height / 2}
              fill={textcolor}
              align="center"
              text={text}
              fontFamily={fontfamily}
              fontSize={textsize}
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
              onTouchStart={() => {
                setDragging(true);
              }}
              onTouchEnd={() => {
                setDragging(false);
              }}
            />
          </Layer>
        </Stage>
      </div>

      {/* // ─── IMAGE EDITING BUTTONS ─────────────────────────────────────── */}
      <ButtonBar
        ImageChange={(checkDeselect, onImageChange)}
        export={handleExport}
        bordercolor={bordercolor}
        bordercolorinput={onBorderColorChange}
        onshapechange={onBorderShapeChange}
      >
        <TextEditor
          ontxtcolorinput={onTextColorChange}
          textvalue={text}
          ontextinput={onTextInput}
          txtcolorvalue={textcolor}
          ontextslide={onTextSlide}
          textsize={textsize}
          onfontpick={onFontPick}
          fontfamily={fontfamily}
        />
      </ButtonBar>
    </CanvasArea>
  );
});

export default MainView;
