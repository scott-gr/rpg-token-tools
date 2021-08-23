import React from 'react';
import styled from '@emotion/styled';
import MainView from './views/Main';
import D20Icon from './components/icons/d20';

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
  & > *:not(header) {
    margin-top: 0;
    margin-bottom: 0;
  }
  & > header > * {
    margin-top: auto;
    margin-bottom: auto;
    text-align: center;
  }
`;

const Warning = styled.p`
color: var(--appred);
font-style: italic;
`

function App() {
  return (
    <>
      <Layout>
        <header>
          <h2>RPG Token Tools</h2>
          <p>
            <D20Icon /> Upload, select styles, download <D20Icon />
          </p>
          <Warning>
            Project is a work in progress and some editing features may not be
            working yet.
          </Warning>
        </header>
        <MainView />
      </Layout>
    </>
  );
}

export default App;
