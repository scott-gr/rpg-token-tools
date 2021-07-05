import React, { useState } from 'react';
import styled from '@emotion/styled';


const TextModal = styled.details`
  grid-area: texttools;
  justify-content: center;
  align-content: bottom;
`;
const TokenText = styled.input`
  grid-area: text;
  width: 10rem;
  height: 3rem;
  margin: 0;
  border: none;
  place-self: center;
  resize: none;
  padding: 5px;
`;

const TextColorPicker = styled.input`
  grid-area: textcolor;
  width: 5rem;
  height: 3rem;
  padding: 0;
  margin: 0;
  border: none;
  place-self: center;
`;

const TextLabel = styled.summary`
  grid-area: textlabel;
  font-size: 1.5rem;
  justify-content: left;
  text-align: left;
  align-content: bottom;
  cursor: pointer;
  list-style: none;
  & ::-webkit-details-marker {
    display: none;
  }
`;

const TextEditor = () => {
  const [text, setText] = useState('');
  const [textcolor, setTextcolor] = React.useState('#f7fff7');

  return (
    <TextModal>
      <TextLabel>Add Text</TextLabel>
      <TokenText
        name="tokentext"
        type="text"
        value={text}
        placeholder="Optional nameplate..."
        onChange={(e) => setText(e.target.value)}
      />
      <TextColorPicker
        name="textcolor"
        type="color"
        value={textcolor}
        onChange={(e) => setTextcolor(e.target.value)}
      />
    </TextModal>
  );
};

export default TextEditor;
