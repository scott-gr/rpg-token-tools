/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled/macro';
import CloseModal from './icons/Close';
 //
 // ─── STYLES ─────────────────────────────────────────────────────────────────────
 //
const customStyle = (props) =>
  css`
    color: ${props.color};
  `;

// This is the text input and color form modal
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
  width: 25rem;
  max-height: 90vh;
  z-index: 2;
  display: flex;
  cursor: default;
  place-content: center;
  flex-direction: column;
`;

const TokenText = styled.input`
  ${customStyle}
  font-size: var(--s1);
  border: 2px solid var(--appgrey);
  cursor: text;
  &:hover {
    border: 2px dashed var(--appblack);
  }
`;

const TextColorPicker = styled.input`
  height: 3rem;
  width: 3rem;
  border: 2px solid var(--appgrey);
  cursor: pointer;
  background-color: none;
  &:hover {
    border: 2px dashed var(--appblack);
  }
`;
const ModalContent = styled.div`
  pointer-events: all;
  overflow: auto;
  width: fit-content;
  flex: 1 1 75%;
  display: flex;
  align-content: center;
  padding: 1rem;
  gap: 1rem;
`;

const TextEditor = (props) => {
  return (

      <OpenModal>
        <CloseModal />
        <ModalContent>
          <TokenText
            name="tokentext"
            title="tokentext"
            type="text"
            value={props.textvalue}
            placeholder="Text... color ->->->"
            onChange={props.ontextinput}
            color={props.colortext}
          />
          <TextColorPicker
            name="textcolor"
            title="textcolor"
            type="color"
            value={props.txtcolorvalue}
            onChange={props.ontxtcolorinput}
          />
        </ModalContent>
      </OpenModal>
  );
};

export default TextEditor;
