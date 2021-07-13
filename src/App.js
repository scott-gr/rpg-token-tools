/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
  margin: 1rem 1rem 0 1rem;
  row-gap: 0.5rem;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin: 0;
  padding: 0;
  flex: 0 1 auto;
`;

const Intro = styled.section`
  height: fit-content;
  flex: 0 1 auto;
  font-size: 1rem;
  margin: 0;
  padding: 0;
`;

const WipMessage = styled.h2`
  text-align: center;
  height: auto;
  font-size: 1rem;
  margin: 0;
  padding: 0;
  color: var(--appred);
`;

const HowTo = styled.ol`
  font-size: 1rem;
  height: auto;
  padding: 0 2rem;
`;

function App() {
  return (
    <>
      <Layout>
        <PageTitle>RPG Token Tools</PageTitle>
        <Intro>
          <HowTo>
            <li>Upload an image</li>
            <li>Edit border, text, and overlay</li>
            <li>Download image</li>
          </HowTo>
          <WipMessage>
            Work in progress. Some features may not be functional.
          </WipMessage>
        </Intro>
        <UploadImage
          css={css`
            flex: 1 0 auto;
          `}
        />
      </Layout>
    </>
  );
}

export default App;
