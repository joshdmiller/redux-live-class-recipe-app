import React from 'react';

import Ingredient from '../ingredient';

export default ({
  ingredients = [],
}) => (
  ingredients.length ? <div>
    <h2>Ingredients</h2>
    <ul>
      { ingredients.map( ( i, idx ) => <li key={idx}><Ingredient {...i} /></li> )}
    </ul>
  </div> : null
);

