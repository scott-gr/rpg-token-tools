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

function App() {
  return (
    <>
      <Layout>
        <header>
          <h2>RPG Token Tools</h2>
          <p>
            <D20Icon /> Upload, select styles, download <D20Icon />
          </p>
        </header>
        <MainView />
      </Layout>
    </>
  );
}

export default App;
