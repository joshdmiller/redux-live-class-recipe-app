import React from 'react';

export default ({
  ingredient,
}) => (
  <span>
    {
      ingredient.get( 'qty' ) &&
        <span>
          {ingredient.get( 'qty' )}
          { ingredient.get( 'unit' ) && <span>({ingredient.get( 'unit' )})</span> }:&nbsp;
        </span>
    }
    <span>{ingredient.get( 'name' )}</span>
  </span>
);


