/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled/macro';
import CloseModal from './icons/Close';
import React, { memo } from 'react';
import { ToolBtn, ButtonLabel } from './ButtonBar';

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

const Summary = ToolBtn.withComponent('summary');

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

const Modal = memo((props) => {
  return (
    <ModalWrapper>
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
      <OpenModal>
        <CloseModal />
        <ModalContent>{props.children}</ModalContent>
      </OpenModal>
    </ModalWrapper>
  );
});

export default Modal;
