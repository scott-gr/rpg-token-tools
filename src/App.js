import styled from '@emotion/styled';
import UploadForm from './components/UploadForm/UploadForm';
import Window from './components/Window/Window';

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
        <p>
          Ullamco consequat in in ad et aliquip qui ad irure cillum magna enim.
          In ex esse sit nulla ea. Anim nostrud commodo consequat consequat
          dolore mollit aute deserunt ex amet Lorem id adipisicing. Sunt enim
          officia anim ea. Cupidatat adipisicing veniam cupidatat excepteur.
        </p>
        <UploadForm />
        < Window />
      </Layout>
    </>
  );
}

export default App;
