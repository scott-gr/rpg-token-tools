import React from 'react';
import { Image, Transformer } from 'react-konva';

const TokenImage = ({
  image,
  altText,
  imgName,
  isSelected,
  onSelect,
  x,
  y,
  width,
  height,
}) => {
  const imgRef = React.useRef();
  const trRef = React.useRef();
  const [imgDragging, setImgDragging] = React.useState(false);

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([imgRef.current]);
    }
  }, [isSelected]);

  return (
    <>
      <Image
        image={image}
        draggable={true}
        alt={altText}
        name={imgName}
        ref={imgRef}
        x={x}
        y={y}
        width={width}
        height={height}
        onClick={onSelect}
        onTap={onSelect}
        onMouseOver={() => {
          document.body.style.cursor = 'grab';
        }}
        onMouseOut={() => {
          document.body.style.cursor = 'default';
        }}
        onMouseDown={() => {
          document.body.style.cursor = 'grabbing';
        }}
        onMouseUp={() => {
          document.body.style.cursor = 'grab';
        }}
        onDragStart={() => {
          setImgDragging(true);
          document.body.style.cursor = 'grabbing';
        }}
        onDragEnd={() => {
          setImgDragging(false);
          document.body.style.cursor = 'grab';
        }}
        onTransformStart={(e) => {
          x = e.target.x();
          y = e.target.y();
          width = e.target.width();
          height = e.target.height();
        }}
        onTransformEnd={(e) => {
          const node = imgRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          // node.scaleX(1);
          // node.scaleY(1);

          x = node.x();
          y = node.y();
          // set minimal value
          width = Math.max(5, node.width() * scaleX);
          height = Math.max(node.height() * scaleY);
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default TokenImage;
