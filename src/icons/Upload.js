// icon:image-upload | Unicons https://iconscout.com/unicons | Iconscout
import styled from '@emotion/styled';

const UploadSVG = styled.svg`
  color: #f7fff7;
  fill: #f7fff7;
  opacity: 100%;
  background-color: transparent;
  height: 2.5rem;
  width: 2.5rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
  vertical-align: -0.5em;
  & :hover {
    fill: var(--appblue);
    stroke: var(--appblue);
  }
`;

function UploadIcon(props) {
  return (
    <UploadSVG>
      <svg viewBox="0 0 24 24" {...props}>
        <path d="M19 13a1 1 0 00-1 1v.38l-1.48-1.48a2.79 2.79 0 00-3.93 0l-.7.7-2.48-2.48a2.85 2.85 0 00-3.93 0L4 12.6V7a1 1 0 011-1h7a1 1 0 000-2H5a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3v-5a1 1 0 00-1-1zM5 20a1 1 0 01-1-1v-3.57l2.9-2.9a.79.79 0 011.09 0l3.17 3.17 4.3 4.3zm13-1a.89.89 0 01-.18.53L13.31 15l.7-.7a.77.77 0 011.1 0L18 17.21zm4.71-14.71l-3-3a1 1 0 00-.33-.21 1 1 0 00-.76 0 1 1 0 00-.33.21l-3 3a1 1 0 001.42 1.42L18 4.41V10a1 1 0 002 0V4.41l1.29 1.3a1 1 0 001.42 0 1 1 0 000-1.42z" />
      </svg>
    </UploadSVG>
  );
}

export default UploadIcon;
