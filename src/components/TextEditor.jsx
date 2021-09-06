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

const TextEditor = (props) => {

  return (
    <Modal btntxt='Add Text' modalID="TextModal">
      <TokenText
        name="tokentext"
        title="tokentext"
        type="text"
        value={props.textvalue}
        placeholder="Text... color ->->->"
        onChange={props.ontextinput}
        color={'#292f36'}
      />
      <TextColorPicker
        name="textcolor"
        title="textcolor"
        type="color"
        value={props.txtcolorvalue}
        onChange={props.ontxtcolorinput}
      />
    </Modal>
  );
};

export default TextEditor;
