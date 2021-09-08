import React from 'react';
import { Image, Transformer } from 'react-konva';

const TokenImage = ({
  image,
  alt,
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
  const node = imgRef.current;


  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([imgRef.current]);
    }
  }, [isSelected]);

  return (
    <>
      <Image
        image={image}
        alt={alt}
        draggable={true}
        ref={imgRef}
        height={height}
        width={width}
        x={x}
        y={y}
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
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          x = node.x();
          y = node.y();
          // set minimal value
          width = Math.max(5, node.width() * scaleX);
          height = Math.max(node.height() * scaleY);
        }}
        onChange={() => {
          x = 40;
          y = 40;
          node.scaleY(1);
          node.scaleX(1);
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
