import React from 'react';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router';

import ViewListIcon from 'material-ui/svg-icons/action/view-list';

export const RecipeList = ({
  recipes = [],
  //
}) => {
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

const mapStateToProps = ({ recipes }) => ({ recipes });

export default connect( mapStateToProps )( RecipeList );

