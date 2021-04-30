import styled from '@emotion/styled';
import UploadForm from './components/UploadForm/UploadForm';


const Layout = styled.main`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  min-height: : 100vh;
  overflow-x: : hidden;
  place-self: center;
  margin: 4rem 3rem 3rem 3rem;
    
  
`;

function App() {
  return (
    <>
      <Layout>
        <h1>RPG Token Tools</h1>
        <p>
          Ullamco consequat in in ad et aliquip qui ad irure cillum magna enim.
          In ex esse sit nulla ea. Anim nostrud commodo consequat consequat
          dolore mollit aute deserunt ex amet Lorem id adipisicing. Sunt enim
          officia anim ea. Cupidatat adipisicing veniam cupidatat excepteur.
        </p>
        <UploadForm />
      </Layout>
      </>
  );
}

export default App;
