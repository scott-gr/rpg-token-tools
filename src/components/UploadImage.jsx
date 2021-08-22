/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled/macro';

const ImgForm = styled.form`
  width: 100%;
  & > div > input {
    width: 100%;
    -webkit-tap-highlight-color: transparent;
    z-index: 1;
    opacity: 0;
    cursor: pointer;
    margin: 0;
    padding: 0;
    border: 0;
  }
`;
const UploadImage = (props) => {
  return (
    <ImgForm method="post" encType="multipart/form-data">
      <div css={props.usecss} form="imagefile">

        {/* // UPLOAD LABEL AND ICON HERE-----------*/}
        {props.children}
        {/* //----------------------- */}
        
        <input
          type="file"
          id="imageFile"
          name="imageFile"
          title="imageFile"
          onInput={props.onImageInput}
          accept="image/png, image/jpeg, image/webp"
        />
      </div>
    </ImgForm>
  );
};

export default UploadImage;
