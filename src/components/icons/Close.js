import styled from '@emotion/styled';

const CloseIcon = styled.svg`
  color: var(--appblack);
  height: 3rem;
  width: 3rem;
  max-height: min-content;
  max-width: min-content;
  z-index: 6;
  fill: var(--appblack);
  background-color: transparent;
  pointer-events: none;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  flex: 1 1 25%;
`;

const CloseModal = () => {
  return (
    <CloseIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        id="closeicon"
        d="M20 6.91L17.09 4 12 9.09 6.91 4 4 6.91 9.09 12 4 17.09 6.91 20 12 14.91 17.09 20 20 17.09 14.91 12 20 6.91z"
      />
    </CloseIcon>
  );
};

export default CloseModal;
