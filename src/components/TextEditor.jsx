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
    font-family: ${props.fontfamily};
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
  max-width: 15rem;
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

const TextSizeSlider = styled.input``;

const FontPicker = styled.select`
  ${customStyle}
  font-size: var(--s1);
`;

const FontOption = styled.option``;

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
  font-size: var(--s0);
  margin-bottom: -1.25rem;
`;
const TextEditor = (props) => {
  return (
    <Modal btntxt="Add Text" modalID="TextModal">
      <TxtGrid>
        <TxtGridColumn>
          <TxtInputLabel htmlFor="tokentext">Display Text</TxtInputLabel>
          <TokenText
            name="tokentext"
            title="tokentext"
            type="text"
            value={props.textvalue}
            placeholder="heroic name here"
            onChange={props.ontextinput}
            color={'#292f36'}
          />
          <TxtInputLabel htmlFor="txtsize">Text Size</TxtInputLabel>
          <TextSizeSlider
            type="range"
            name="txtsize"
            min="20"
            max="90"
            step="5"
            list="tickmarks"
            value={props.textsize}
            onChange={props.ontextslide}
          />
          {/* not all browsers support the tickmarks, and that's okay. It's just aesthetic */}
          <datalist id="tickmarks">
            <option value="20" />
            <option value="30" />
            <option value="40" />
            <option value="50" />
            <option value="60" />
            <option value="70" />
            <option value="80" />
            <option value="90" />
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
          <TxtInputLabel htmlFor="font">Font</TxtInputLabel>

          <FontPicker name="font">
            {/* this text is too large. Create emotion css element */}
            <FontOption value=""></FontOption>
            <FontOption value="font1">Font1</FontOption>
            <FontOption value="font2">Font2</FontOption>
          </FontPicker>
        </TxtGridColumn>
      </TxtGrid>
    </Modal>
  );
};

export default TextEditor;
