/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import styled from '@emotion/styled/macro';
import CloseModal from '../svg/Close';

const customStyle = (props) =>
  css`
    color: ${props.color};
  `;

const OpenModal = styled.div`
  background: var(--appwhite);
  border-radius: 0.5em;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  left: 50%;
  max-width: 90%;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30em;
  text-align: left;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

const OpenBtn = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
`;
const TokenText = styled.input`
  ${customStyle}
  padding: .5rem;
  margin: 1rem;
  border: 1px solid var(--appgrey);
  cursor: pointer;
`;

const TextColorPicker = styled.input`
  padding: 0;
  margin: 0;
  border: none;
  border: 1px var(--appgrey);
`;

const Summary = styled.summary`
  padding: 0;
  margin: 0;
  z-index: 5;
  width: inherit;
  border: none;
  cursor: pointer;
  list-style: none;
  & ::-webkit-details-marker {
    display: none;
  }
  &:focus {
    outline: none;
  }
`;

const TextModal = styled.details`
  flex: 1 1 25%;
  & ::-webkit-details-marker {
    display: none;
  }
`;

const Overlay = styled.div`
  transition: opacity 0.2s ease-out;
  pointer-events: none;
  background: rgba(15, 23, 42, 0.8);
  position: fixed;
  opacity: 0;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
   ${TextModal}[open] & {
    opacity: 0.5;
    pointer-events: all;
    z-index: 0;
  }
`;

const ModalContent = styled.div`
  pointer-events: all;
  overflow: auto;
`;

const TextEditor = (props) => {
  return (
    <TextModal>
      <Summary>
        <OpenBtn css={props.usecss}>Add Text</OpenBtn>
        <Overlay />
      </Summary>
      <OpenModal>
        <CloseModal />
        <ModalContent>
          <TokenText
            name="tokentext"
            type="text"
            value={props.textvalue}
            placeholder="Enter text here..."
            onInput={props.ontextinput}
            color={props.txtcolorvalue ? props.txtcolorvalue : '#f7fff7'}
          />
          <TextColorPicker
            name="textcolor"
            type="color"
            value={props.txtcolorvalue}
            onInput={props.ontxtcolorinput}
          />
        </ModalContent>
      </OpenModal>
    </TextModal>
  );
};

export default TextEditor;
