import React from 'react';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router';
import io from 'socket.io-client';
import ViewListIcon from 'material-ui/svg-icons/action/view-list';

import fetchRecipes from '../../store/actions/fetch-recipes';
import { addRecipe } from '../../store/actions/create-recipe';

export class RecipeList extends React.Component {
  componentDidMount () {
    this.props.refresh();

    this._socket = io( 'http://localhost:3000/' );

    this._socket.on( 'NEW_RECIPE', recipe => {
      this.props.add( recipe );
    });
  }

  componentWillUnmount () {
    this._socket.close();
  }

  render () {
    const {
      recipes = [],
    } = this.props;

    return (
      <List>
        { recipes.map( recipe => 
          <ListItem
            key={recipe.id}
            leftAvatar={<Avatar icon={<ViewListIcon />} />}
            primaryText={recipe.name}
            secondaryText={recipe.description}
            containerElement={<Link to={`/recipes/${recipe.id}/${recipe.slug}`} />}
          />
        )}
      </List>
    );
  }
}

const mapStateToProps = ({ recipes }) => ({ recipes });

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch( fetchRecipes() ),
  add: recipe => dispatch( addRecipe( recipe ) ),
});

export default connect( mapStateToProps, mapDispatchToProps )( RecipeList );

