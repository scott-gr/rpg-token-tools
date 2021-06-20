/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Stage, Layer, Circle, Image } from 'react-konva';
// ─── STYLES ─────────────────────────────────────────────────────────────────────
//

const ChooseFile = styled.input`
  position: absolute;
  top: 0px;
  left: 0;
  right: 0px;
  bottom: 0px;
  width: 100%;
  -webkit-tap-highlight-color: transparent;
  z-index: 1;
  opacity: 0;
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

const BtnLabel = styled.label`
  cursor: pointer;
`;

//────────────────────────────────────────────────────────────────────────────────
class URLImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      isDragging: false,
    };
  }
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }
  loadImage() {
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };
  render() {
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        image={this.state.image}
        ref={(node) => {
          this.imageNode = node;
        }}
      />
    );
  }
}
class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUpload: null,
      alt: null,
    };

    this.onImageChange = this.onImageChange.bind(this);
  }

  onImageChange(e) {
    this.setState({
      imgUpload: URL.createObjectURL(e.target.files[0]),
      alt: 'your uploaded image',
    });
  }

  render() {
    return (
      <>
        <Stage
          width={326}
          height={326}
          css={css`
            place-self: center;
            margin: 3rem;
            padding: 0;
            border-color: var(--appwhite);
            border-style: solid;
            border-width: 3px;
            width: 326px;
            height: 326px;
          `}
        >
          <Layer>
            <URLImage src={this.state.imgUpload} />
          </Layer>
          <Layer>
            <Circle x={163} y={163} stroke="black" radius={150} />
          </Layer>
        </Stage>
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
