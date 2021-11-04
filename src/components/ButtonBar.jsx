/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { memo, useState } from 'react';
import styled from '@emotion/styled/macro';
import UploadIcon from '../icons/Upload';
import UploadImage from './UploadImage';
import DownloadImage from './DownloadImage';
import DownloadIcon from '../icons/Download';
// import TextEditor from './TextEditor';
import BorderStyle from './BorderStyle';
//
// ─── STYLES ────────────────────────────────────────────────────f─────────────────
//

// Dynamic color props for button style to match color selector input values
const dynamicStyle = (props) => css`
  background: ${props.bgColor};
  display: ${props.btnDisplay};
  color: ${props.labelcolor};
`;

const Buttons = styled.section`
  display: flex;
  flex-wrap: wrap;
  font-size: var(--s1);
  gap: 0.5rem;
  padding-inline-start: 1rem;
  padding-inline-end: 1rem;
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
export const ButtonLabel = styled.label`
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

const btnStyle = css`
  display: flex;
  justify-content: center;
  font-family: 'Inconsolata', 'Helvetica', 'Arial', sans-serif;
  height: var(--s3);
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  border: 4px solid var(--appgrey);
  color: var(--appblack);
  background: var(--appwhite);
  position: relative;
  cursor: pointer;
  /* hovering over a button has a 'pushed button' animation */
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

export const ToolBtn = styled.button`
  ${btnStyle};
  ${dynamicStyle};
`;

export const Summary = ToolBtn.withComponent('summary');

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

const ButtonBar = memo((props) => {
  const [overlay, setOverlay] = useState('');

  return (
    <Buttons>
      {/* // ─── BORDER COLOR BUTTON ───────────────────────────────────────── */}
      <ToolBtn bgColor={props.bordercolor}>
        <ColorInput
          name="bordercolor"
          title="bordercolor"
          type="color"
          onInput={props.bordercolorinput}
          value={props.bordercolor}
        />
        <ButtonLabel
          htmlFor="bordercolor"
          labelcolor={props.bordercolor ? props.bordercolor : '#f7fff7'}
        >
          Border Color
        </ButtonLabel>
      </ToolBtn>
      {/* // ─── BORDER STYLE BUTTON ───────────────────────────────────────── */}
      <BorderStyle onshapechange={props.onshapechange} />
      {/* // ─── Image overlay color button ───────────────────────────────────────── */}
      <ToolBtn
        bgColor={overlay}
        form="overlaycolor"
        css={css`
          opacity: 0.9;
        `}
      >
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
      </ToolBtn>{' '}
      {/* // ─── ADD TEXT BUTTON ───────────────────────────────────────── */}
      {props.children}
      {/* // ─── IMAGE UPLOAD FORM ───────────────────────────────────────────  */}
      <UploadImage
        onImageInput={props.ImageChange}
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
      {/* // ─── DOWNLOAD BUTTON, opens new tab with token image ───────────────────────────────────────── */}
      <DownloadImage
        handleclick={props.export}
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
    </Buttons>
  );
});

export default ButtonBar;
