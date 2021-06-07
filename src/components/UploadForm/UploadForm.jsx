import React, { Component } from 'react';
import styled from '@emotion/styled';
//
// ─── STYLES ─────────────────────────────────────────────────────────────────────
//

const ChooseFile = styled.input`
  opacity: 0;
  position: absolute;
  top: 0px;
  left: 0;
  right: 0px;
  bottom: 0px;
  width: 100%;
  -webkit-tap-highlight-color: transparent;
  z-index: 1;
  cursor: pointer;
`;

const ImgForm = styled.form`
  justify-content: center;
  display: flex;
`;

const UploadBtn = styled.div`
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.67, 0.17, 0.4, 0.83);
  background-color: var(--appblue);
  position: relative;
  color: var(--appwhite);
  font-size: 1.5rem;
  width: fit-content;
  justify-self: center;
  justify-items: center;
  padding: 1rem;
  cursor: pointer;
`;

const BtnLabel = styled.label `
  cursor: pointer;
`;

const ImgPreview = styled.img`
  max-height: 300px;
  max-width: 300px;
  object-fit: contain;
  place-self: center;
`;
// ────────────────────────────────────────────────────────────────────────────────


class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      alt: null,
    };

    this.onImageChange = this.onImageChange.bind(this);
  }

  onImageChange(e) {
      let img = e.target.files[0];
      this.setState({
        image: URL.createObjectURL(img),
        alt: "your uploaded image"
      });
      
  }

  render() {
    return (
      <>
        <ImgPreview src={this.state.image} alt={this.state.alt}/>
        <ImgForm method="post" encType="multipart/form-data">
          <UploadBtn>
            <BtnLabel htmlFor="imageFile">Upload an Image </BtnLabel>
            <ChooseFile
              type="file"
              id="imageFile"
              name="imageFile"
              capture="user"
              onChange={this.onImageChange}
              accept="image/png, image/jpeg, image/webp"
            />
          </UploadBtn>
        </ImgForm>
      </>
    );
  }
}

export default UploadForm;
