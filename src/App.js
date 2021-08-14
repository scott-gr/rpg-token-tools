import React from 'react';
import styled from '@emotion/styled';
import UploadImage from './components/UploadImage/UploadImage';

// ─── FLEXBOX LAYOUT WRAPPER ──────────────
const Layout = styled.main`
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;
  padding: 0 1rem;
  & > * {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  & > :first-of-type:not(header) {
    margin-top: 0;
  }
  & > :last-child:not(header) {
    margin-bottom: 0;
  }
  & > header > h1 {
    margin-top: auto;
    margin-bottom: auto;
    text-align: center;
  }
`;

function App() {
  return (
    <>
      <Layout>
        <header>
          <h1>RPG Token Tools</h1>
          <ol>
            <li>Upload an image</li>
            <li>Edit border, text, and overlay</li>
            <li>Download image</li>
          </ol>
        </header>
        <UploadImage />
      </Layout>
    </>
  );
}

export default App;
