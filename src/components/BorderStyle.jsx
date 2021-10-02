import React, { memo } from 'react';
import Modal from './Modal';
import { CircleBorder, HexBorder, SquareBorder } from './BorderOptions';
import styled from '@emotion/styled/macro';
import {
  CircleIcon,
  HexAIcon,
  HexBIcon,
  SquareIcon,
} from '../icons/BorderIcons';

const RadioInput = styled.input`
  &[type='radio'] {
    opacity: 0; /* hidden but still tabable */
    position: absolute;
  }
  &[type='radio'] + span {
    font-family: 'Material Icons';
    color: #b3cefb;
    border-radius: 50%;
    padding: 12px;
    transition: all 0.4s;
    -webkit-transition: all 0.4s;
  }
`;

const ShapeMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 1rem;
  justify-content: space-evenly;
  align-items: center;
`;

// inspired by https://codepen.io/eliasmeire/pen/JGjaov/
const BorderStyle = memo((props) => {
  return (
    <Modal btntxt="Border Style" width="25rem" modalID="bordermodal">
      <ShapeMenu>
        <label htmlFor="circle">
          <RadioInput
            type="radio"
            id="circle"
            name="borderstyle"
            value="circle"
          />
          <CircleIcon />
        </label>

        <label htmlFor="square">
          <RadioInput
            type="radio"
            id="square"
            name="borderstyle"
            value="square"
          />
          <SquareIcon />
        </label>

        <label htmlFor="hexA">
          <RadioInput type="radio" id="hexA" name="borderstyle" value="hexA" />
          <HexAIcon />
        </label>

        <label htmlFor="hexB">
          <RadioInput type="radio" id="hexB" name="borderstyle" value="hexB" />
          <HexBIcon />
        </label>
      </ShapeMenu>
    </Modal>
  );
});

export default BorderStyle;
