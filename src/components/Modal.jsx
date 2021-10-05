/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled/macro';
import CloseModal from '../icons/Close';
import React, { memo } from 'react';
import { Summary, ButtonLabel } from './ButtonBar';

const OpenModal = styled.div`
  background: var(--appwhite);
  border-radius: var(--s-2);
  border:none;
  box-shadow: 0 10px 20px rgba(5, 2, 2, 0.5);
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 90vh;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  pointer-events: all;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  min-width: 18rem;
  max-width: 80%;
  cursor: default;
  flex-direction: row;
  & > svg:hover {
    fill: var(--appred);
  }
`;

const ModalContent = styled.div`
  pointer-events: none;
  display: flex;
  width: 100%;
  align-items: center;
  justify-items: center;
  gap: 1rem;
  margin: 0 1rem 1rem 1rem;
`;

const ModalWrapper = styled.details`
  & ::-webkit-details-marker {
    display: none;
  }
`;

// gray overlay over everything when modal is open
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
  ${ModalWrapper}[open] & {
    opacity: 0.5;
    pointer-events: all;
    z-index: 2;
  }
`;

const Modal = (props) => {
  function handleXClick() {
    document.getElementById(props.modalID).removeAttribute('open');
  }
  return (
    <ModalWrapper id={props.modalID}>
      <Summary
        labelcolor={'#080008'}
        css={css`
          ${ButtonLabel}

          cursor: pointer;
          list-style: none;
          &:focus {
            outline: none;
          }
          place-items: center;
          text-align: center;
        `}
      >
        {props.btntxt}
        <Overlay />
      </Summary>
      <OpenModal
        css={css`
          width: ${props.width};
        `}
      >
        {' '}
        <CloseModal click={handleXClick} />
        <ModalContent>{props.children}</ModalContent>
      </OpenModal>
    </ModalWrapper>
  );
};

export default Modal;
