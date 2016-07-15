import React from 'react';

export default ({
  qty,
  unit,
  name,
}) => (
  <span>
    { qty && <span>{qty} { unit && <span>({unit})</span> }:</span> }
    <span>{name}</span>
  </span>
);


