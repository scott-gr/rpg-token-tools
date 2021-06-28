import React from 'react';
import styled from '@emotion/styled';
import UploadImage from './components/UploadImage/UploadImage';


// ─── FLEXBOX LAYOUT WRAPPER ──────────────
const Layout = styled.main`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  place-self: center;
  margin: 0 2rem 0 2rem;
  row-gap: 1rem;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-top: 1rem;
  padding: 0;
`;

const WipMessage = styled.h2`
  text-align: center;
  margin: 0;
  padding: 0;
  color: var(--appred);
`;

function App() {

  return (
    <>
      <Layout>
        <PageTitle>RPG Token Tools</PageTitle>
        <ol>
          <li>Upload an image</li>
          <li>Select border style</li>
          <li>Add optional text and overlay</li>
          <li>Download image</li>
        </ol>
        <WipMessage>This is still a work in progress and some features may not be functional. Thanks for checking it out though!</WipMessage>
        <UploadImage />
      </Layout>
    </>
  );
}

export default App;
