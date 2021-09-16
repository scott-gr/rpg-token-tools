//reactsvgicons.com/
//  Bootstrap https://icons.getbootstrap.com/ | Bootstrap
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const ShapeIcon = styled.svg`
  color: var(--appblack);
  height: var(--s4);
  width: var(--s4);
  z-index: 6;
  fill: var(--appblack);
  background-color: transparent;
  flex: 1 1 25%;
  transition: all .125s;
  &:hover {
    fill: var(--appblue);
  }`;

export const CircleIcon = () => {
  return (
    <ShapeIcon viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
      />
    </ShapeIcon>
  );
};

export const SquareIcon = () => {
  return (
    <ShapeIcon viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" d="M14 1H2v14h14V1zM3 2v12h12V2H4z" />
    </ShapeIcon>
  );
};

export const HexAIcon = () => {
  return (
    <ShapeIcon viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M14 4.577L8 1 2 4.577v6.846L8 15l6-3.577V4.577zM8.5.134a1 1 0 00-1 0l-6 3.577a1 1 0 00-.5.866v6.846a1 1 0 00.5.866l6 3.577a1 1 0 001 0l6-3.577a1 1 0 00.5-.866V4.577a1 1 0 00-.5-.866L8.5.134z"
      />
    </ShapeIcon>
  );
};

export const HexBIcon = () => {
  return (
    <ShapeIcon
      css={{ transform: 'rotate(30deg)' }}
      viewBox="0 0 16 16"
      id="hexB"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M14 4.577L8 1 2 4.577v6.846L8 15l6-3.577V4.577zM8.5.134a1 1 0 00-1 0l-6 3.577a1 1 0 00-.5.866v6.846a1 1 0 00.5.866l6 3.577a1 1 0 001 0l6-3.577a1 1 0 00.5-.866V4.577a1 1 0 00-.5-.866L8.5.134z"
      />
    </ShapeIcon>
  );
};
