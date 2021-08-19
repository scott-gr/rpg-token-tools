/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled/macro';

const ImgForm = styled.form`
  width: 50%;
  & > div > input {
    width: 50%;
    -webkit-tap-highlight-color: transparent;
    z-index: 1;
    opacity: 0;
    cursor: pointer;
  }
`;
const UploadImage = (props) => {
  return (
    <ImgForm method="post" encType="multipart/form-data">
      <div css={props.usecss} form="imagefile">
        {props.children}
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
