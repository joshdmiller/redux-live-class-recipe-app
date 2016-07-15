import React from 'react';
import { connect } from 'react-redux';

import IngredientList from '../ingredient-list';

export const Recipe = ({
  name,
  description,
  ingredients = [],
}) => (
  <div>
    <h1>{name}</h1>
    <p>
      {description}
    </p>

    <IngredientList ingredients={ingredients} />
  </div>
);

const mapStateToProps = ({ recipes, }, { params: { id } }) => ({
  ...( recipes.find( r => r.id === id ) || {} ),
});

export default connect( mapStateToProps )( Recipe );

