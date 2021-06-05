import { Global, css} from '@emotion/react';

export const GlobalStyles = () => (
  <Global
    styles={css`
      :root {
        --londrina: 'Londrina Solid', serif;
        --opensans: 'Open Sans', system;
        --appblack: #292f36ff;
        --appred: #fb4b4eff;
        --appwhite: #f7fff7ff;
        --appblue: #499dd4ff;
        font-display: optional;
      }
      body {
        font-family: var(--opensans);
        margin: 0;
        padding: 0;
        bottom: 0;
        overflow-x: hidden;
        width: 100%;
      }
      html {
        background-color: var(--appblack);
        color: var(--appwhite);
        padding: 0;
        margin: 0;
        overflow-x: hidden;
        bottom: 0;
        min-height: 100%;
      }
      button {
        cursor: pointer;
      }
      img {
        margin: 0;
        padding: 0;
      }
      input[type='file' i]::-webkit-file-upload-button {
        cursor: pointer;
      }
    `}
  />
);
