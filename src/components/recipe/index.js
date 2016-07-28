import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import fetchRecipe from '../../store/actions/fetch-recipe';
import IngredientList from '../ingredient-list';

export class Recipe extends React.Component {
  componentDidMount () {
    Recipe.fetch( this.props.dispatch, this.props.params );
  }

  render () {
    const {
      recipe,
    } = this.props;

    return (
      <div>
        <h1>{recipe.get( 'name' )}</h1>
        <p>
          {recipe.get( 'description' )}
        </p>

        <IngredientList ingredients={recipe.get( 'ingredients' )} />
      </div>
    );
  }

  static fetch ( dispatch, params ) {
    return dispatch( fetchRecipe( params.id ) );
  }
}

const mapStateToProps = ({ recipes, }, { params: { id } }) => ({
  recipe: recipes.find( r => r.get( 'id' ) === id ) || Map(),
});

export default connect( mapStateToProps )( Recipe );

