import styled from '@emotion/styled';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
`;

function App() {
  return (
    <Layout>
      <div className="App">
        <h1>RPG Token Tools</h1>
        <p>
          Ullamco consequat in in ad et aliquip qui ad irure cillum magna enim.
          In ex esse sit nulla ea. Anim nostrud commodo consequat consequat
          dolore mollit aute deserunt ex amet Lorem id adipisicing. Sunt enim
          officia anim ea. Cupidatat adipisicing veniam cupidatat excepteur.
        </p>
      </div>
    </Layout>
  );
}

export default App;
