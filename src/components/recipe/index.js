import React from 'react';
import { connect } from 'react-redux';

import fetchRecipe from '../../store/actions/fetch-recipe';
import IngredientList from '../ingredient-list';

export class Recipe extends React.Component {
  componentDidMount () {
    this.props.fetch( this.props.params.id );
  }

  render () {
    const {
      name,
      description,
      ingredients = [],
    } = this.props;

    return (
      <div>
        <h1>{name}</h1>
        <p>
          {description}
        </p>

        <IngredientList ingredients={ingredients} />
      </div>
    );
  }
}

const mapStateToProps = ({ recipes, }, { params: { id } }) => ({
  ...( recipes.find( r => r.id === id ) || {} ),
});

const mapDispatchToProps = dispatch => ({
  fetch: id => dispatch( fetchRecipe( id ) ),
});

export default connect( mapStateToProps, mapDispatchToProps )( Recipe );

