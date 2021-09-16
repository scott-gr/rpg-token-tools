/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled/macro';
import Modal from './Modal';
//
// ─── STYLES ─────────────────────────────────────────────────────────────────────
//
const customStyle = (props) =>
  css`
    color: ${props.color};
  `;

const TokenText = styled.input`
  ${customStyle}
  font-size: var(--s1);
  border: 2px solid var(--appgrey);
  cursor: text;
  &:hover {
    border: 2px dashed var(--appblack);
  }
  min-width: 50%;
`;

const TextColorPicker = styled.input`
  height: 3rem;
  width: 5rem;
  border: 2px solid var(--appgrey);
  cursor: pointer;
  background-color: none;
  &:hover {
    border: 2px dashed var(--appblack);
  }
`;

const TxtGrid = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;



const TxtGridColumn = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  & > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  & > * + * {
    margin-top: var(1rem);
  }
`;

const TxtInputLabel = styled.label`
  color: var(--appblack);
  font-size: 1rem;
`;
const TextEditor = (props) => {
  return (
    <Modal btntxt="Add Text" modalID="TextModal">
      <TxtGrid>
        <TxtGridColumn>
          <TxtInputLabel for="tokentext">Display Text</TxtInputLabel>
          <TokenText
            name="tokentext"
            title="tokentext"
            type="text"
            value={props.textvalue}
            placeholder="heroic name here"
            onChange={props.ontextinput}
            color={'#292f36'}
          />
        </TxtGridColumn>
        <TxtGridColumn>
          <TxtInputLabel>Text Color</TxtInputLabel>
          <TextColorPicker
            name="textcolor"
            title="textcolor"
            type="color"
            value={props.txtcolorvalue}
            onChange={props.ontxtcolorinput}
          />
        </TxtGridColumn>
      </TxtGrid>
    </Modal>
  );
};

export default TextEditor;
