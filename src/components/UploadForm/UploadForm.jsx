// import React, { useState } from 'react';
import React, { Component } from 'react';
import styled from '@emotion/styled';

const ChooseFile = styled.input`
  opacity: 0;
`;

const UploadBtn = styled.div`
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.67, 0.17, 0.4, 0.83);
  background-color: var(--appblue);
  color: var(--appwhite);
  font-size: 1.5rem;
  display: grid;
  justify-items: center;
  padding: 1rem;
  /* cursor: pointer; */
`;



const ImgPreview = styled.img`
max-height: 300px;
max-width: 300px;
object-fit: contain;
`

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };

    this.onImageChange = this.onImageChange.bind(this);
  };

  onImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      this.setState({
        image: URL.createObjectURL(img),
      });
    }
  };

    render()
    {
      return (
        <>
        <ImgPreview src={this.state.image}/>
        <form method="post" enctype="multipart/form-data">
          <UploadBtn>
            <label htmlFor="imageFile">Upload an Image </label>

            <ChooseFile
              type="file"
              id="imageFile"
              name="imageFile"
              capture="user"
              onChange={this.onImageChange}
              accept="image/png, image/jpeg, image/webp"
            />
          </UploadBtn>
          {/* <button onClick={uploadHandler} type="submit">
          Submit
        </button> */}
        </form>
        </>
      );
    }
  }


export default UploadForm;
