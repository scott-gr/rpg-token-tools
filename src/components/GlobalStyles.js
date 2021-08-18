import { Global, css } from '@emotion/react';

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
        --ratio: 1.5;
        --s-5: calc(var(--s-4) / var(--ratio));
        --s-4: calc(var(--s-3) / var(--ratio));
        --s-3: calc(var(--s-2) / var(--ratio));
        --s-2: calc(var(--s-1) / var(--ratio));
        --s-1: calc(var(--s0) / var(--ratio));
        --s0: 1rem;
        --s1: calc(var(--s0) * var(--ratio));
        --s2: calc(var(--s1) * var(--ratio));
        --s3: calc(var(--s2) * var(--ratio));
        --s4: calc(var(--s3) * var(--ratio));
        --s5: calc(var(--s4) * var(--ratio));
      }
      body {
        font-family: var(--sans);
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      html {
        background-color: var(--appblack);
        color: var(--appwhite);
        font-size: 16px;
      }
      button {
        cursor: pointer;
      }
      input[type='color'] {
        -webkit-appearance: none;
        padding: 0;
      }
      input[type='file' i]::-webkit-file-upload-button {
        cursor: pointer;
      }
      input[type='color']::-webkit-color-swatch-wrapper {
        padding: 0;
        border: none;
      }
      input[type='color']::-webkit-color-swatch {
        padding: 0;
        border: none;
      }
      img {
        width: 100%;
      }

      details summary {
        cursor: pointer;
        list-style: none;
      }

      details summary > * {
        display: inline;
      }
      * {
        box-sizing: border-box;
      }
    `}
  />
);
