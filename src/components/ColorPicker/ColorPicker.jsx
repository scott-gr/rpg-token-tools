import React from 'react';

const ColorPicker = () => {
  return (
    <input
      type="color"
      value={color}
      onChange={(e) => setColor(e.target.value)}
    />
  );
};

export default ColorPicker;