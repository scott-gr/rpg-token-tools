/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled/macro';
import CloseModal from '../icons/Close';

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
  width: 25rem;
  max-height: 90vh;
  z-index: 2;
  display: flex;
  cursor: default;
  place-content: center;
  flex-direction: column;
  
`;

const OpenBtn = styled.div`
  font-size: 1.5rem;
  
  display: flex;
  align-items: center;
`;
const TokenText = styled.input`
  ${customStyle}
  font-size: 1.5rem;
  /* height: 3rem; */
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

const Summary = styled.summary`
  z-index: 5;
  border: none;
  /* height: 3rem; */

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
    z-index: 2;
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
            title="tokentext"
            type="text"
            value={props.textvalue}
            placeholder="Text... color ->->->"
            onInput={props.ontextinput}
            color={props.txtcolorvalue ? props.txtcolorvalue : '#f7fff7'}
          />
          <TextColorPicker
            name="textcolor"
            title="textcolor"
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
