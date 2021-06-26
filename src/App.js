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
  margin: 2rem 2rem 2rem 2rem;
  row-gap: 1rem;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin: 0;
  padding: 0;
`;

function App() {

  return (
    <>
      <Layout>
        <PageTitle>RPG Token Tools</PageTitle>
        <ol>
          <li>Upload an image</li>
          <li>Select border style</li>
        </ol>
        <UploadImage />
      </Layout>
    </>
  );
}

export default App;
