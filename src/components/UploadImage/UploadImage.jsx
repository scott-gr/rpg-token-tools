/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Stage, Layer, Circle, Image } from 'react-konva';
import { Portal } from 'react-konva-utils';
import useImage from 'use-image';
//
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

const UploadImage = () => {
  const [picture, setPicture] = useState('');
  const [isDragging, setDragging] = React.useState(false);
  const [image] = useImage(picture);


  const onImageChange = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
    // alt: 'your uploaded image',
  };

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
          <Portal selector=".top" enabled={isDragging}>
            <Image
              image={image}
              onDragStart={() => {
                setDragging(true);
              }}
              onDragEnd={() => {
                setDragging(false);
              }}
            />
          </Portal>
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
            onChange={onImageChange}
            accept="image/png, image/jpeg, image/webp"
          />
        </UploadBtn>
      </ImgForm>
    </>
  );
  
};

export default UploadImage
