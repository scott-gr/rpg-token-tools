import { Global, css} from '@emotion/react';

export const GlobalStyles = () => (
  <Global
    styles={css`
      :root {
        --londrina: 'Londrina Solid', serif;
        --opensans: 'Open Sans', system;
        --sans: 'Inconsolata', 'Helvetica', 'Arial', sans-serif;
        --appblack: #292f36;
        --appgrey: #7e8286;
        --appred: #fb4b4e;
        --appwhite: #f7fff7;
        --appblue: #499dd4;
        font-display: optional;
      }
      body {
        font-family: var(--sans);
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
