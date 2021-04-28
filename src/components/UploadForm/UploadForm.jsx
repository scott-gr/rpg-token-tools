import React from 'react';

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

      <button type="submit">Submit</button>
    </>
  );
}

export default UploadForm;
