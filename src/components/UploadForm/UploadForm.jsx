import React from 'react';
import styled from '@emotion/styled';

const UploadBtn = styled.button``;

function UploadForm() {
  return (
    <>
      <label htmlFor="imageFile">
        Upload an Image
        <input
          type="file"
          id="imageFile"
          name="imageFile"
          capture="user"
          // onChange={changeHandler}
          accept="image/png, image/jpeg, image/webp"
        />{' '}
      </label>

      <UploadBtn type="submit">Submit</UploadBtn>
    </>
  );
}

export default UploadForm;
