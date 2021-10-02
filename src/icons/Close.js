import styled from '@emotion/styled';

const CloseIcon = styled.svg`
  height: 3rem;
  width: 3rem;
  z-index: 6;
  fill: var(--appblack);
  background-color: transparent;
  justify-self: right;
  pointer-events: all;
  cursor: pointer;
  margin-inline-end: 0.5rem;
  &:hover {
    fill: var(--appred);
  }
`;

const WithIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: right;
  pointer-events: none;
  width: 100%;
`;

const CloseModal = (props) => {
  return (
    <WithIcon onClick={props.click}>
      <CloseIcon
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 6.91L17.09 4 12 9.09 6.91 4 4 6.91 9.09 12 4 17.09 6.91 20 12 14.91 17.09 20 20 17.09 14.91 12 20 6.91z" />
      </CloseIcon>
    </WithIcon>
  );
};

export default CloseModal;
