import React from 'react';
import { List } from 'immutable';

import Ingredient from '../ingredient';

export default ({
  ingredients = List(),
}) => (
  ingredients.size ? <div>
    <h2>Ingredients</h2>
    <ul>
      { ingredients.map( ( i, idx ) => <li key={idx}><Ingredient ingredient={i} /></li> )}
    </ul>
  </div> : null
);

