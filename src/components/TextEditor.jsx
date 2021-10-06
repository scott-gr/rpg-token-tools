/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled/macro';
import FontFaceObserver from 'fontfaceobserver';
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
  font-size: var(--s2);
  pointer-events: all;
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
  pointer-events: all;
  border: 2px solid var(--appgrey);
  cursor: pointer;
  background-color: none;
  &:hover {
    border: 2px dashed var(--appblack);
  }
`;

const TextSizeSlider = styled.input`
  pointer-events: all;
`;

const FontPicker = styled.select`
  ${customStyle}
  font-size: var(--s1);
  pointer-events: all;
  cursor: pointer;
  cursor: context-menu;
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
            fontfamily={props.fontfamily}
            value={props.textvalue}
            placeholder="Adventurer"
            onChange={props.ontextinput}
            color={'#292f36'}
          />
          <TxtInputLabel htmlFor="txtsize">Text Size</TxtInputLabel>
          <TextSizeSlider
            type="range"
            name="txtsize"
            min={20}
            max={90}
            step="5"
            list="tickmarks"
            value={props.textsize}
            onChange={props.ontextslide}
          />
          {/* not all browsers support the tickmarks, and that's okay. It's just aesthetic */}
          <datalist id="tickmarks">
            <option value={20} />
            <option value={30} />
            <option value={40} />
            <option value={50} />
            <option value={60} />
            <option value={70} />
            <option value={80} />
            <option value={90} />
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

          <FontPicker
            name="font"
            value={props.fontfamily}
            fontfamily={props.fontfamily}
            onChange={props.onfontpick}
          >
            {/*
              --nouveau: 'Federo';
              --vanilla: 'Hina Mincho', serif;
              --olde: 'IM Fell English SC', serif;
              --elvish: 'Tangerine', cursive;
              --npc: 'Geo', sans-serif;
              --digital: 'Quantico', sans-serif; 
              */}
            <FontOption
              css={css`
                font-family: var(--nouveau);
              `}
              value="Federo"
            >
              nouveau
            </FontOption>
            <FontOption
              css={css`
                font-family: var(--vanilla);
              `}
              value="Hina Mincho, serif"
            >
              vanilla
            </FontOption>
            <FontOption
              css={css`
                font-family: var(--olde);
              `}
              value="IM Fell English SC, serif"
            >
              olde
            </FontOption>
            <FontOption
              css={css`
                font-family: var(--elvish);
                font-size: var(--s2);
              `}
              value="Tangerine, cursive"
            >
              elvish
            </FontOption>
            <FontOption
              css={css`
                font-family: var(--npc);
              `}
              value="Geo, sans-serif"
            >
              npc
            </FontOption>
            <FontOption
              css={css`
                font-family: var(--digital);
              `}
              value="Quantico, sans-serif"
            >
              digital
            </FontOption>
          </FontPicker>
        </TxtGridColumn>
      </TxtGrid>
    </Modal>
  );
};

export default TextEditor;
