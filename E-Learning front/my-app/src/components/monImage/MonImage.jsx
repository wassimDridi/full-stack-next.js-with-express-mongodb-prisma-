import React from 'react';

const MonImage = ({ url, width, height }) => {
  return (
    <img src={url} width={width} height={height} alt={url} className="img-fluid" />
  );
};

export default MonImage;
