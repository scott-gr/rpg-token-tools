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
  align-self: flex-start;
  gap: var(--s1);
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
  margin-bottom: -1.25rem;
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
          <TxtInputLabel for="txtsize">Text Size</TxtInputLabel>
          <input
            type="range"
            name="txtsize"
            min="1"
            max="7"
            step="1"
            list="tickmarks"
            value="3"
          />
          <datalist id="tickmarks">
            <option value="1" />
            <option value="2" />
            <option value="3" />
            <option value="4" />
            <option value="5" />
            <option value="6" />
            <option value="7" />
          </datalist>
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
          <TxtInputLabel>Font</TxtInputLabel>

          <select>
            {/* this text is too large. Create emotion css element */}
            <option value="">select...</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </TxtGridColumn>
      </TxtGrid>
    </Modal>
  );
};

export default TextEditor;
