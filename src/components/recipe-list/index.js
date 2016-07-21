import React from 'react';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router';
import io from 'socket.io-client';
import ViewListIcon from 'material-ui/svg-icons/action/view-list';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import fetchRecipes from '../../store/actions/fetch-recipes';
import deleteRecipe from '../../store/actions/delete-recipe';
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

    const createSecondaryActionMenu = recipe => {
      const iconButton = (
        <IconButton touch={true} tooltip="actions" tooltipPosition="bottom-left">
          <MoreVertIcon color={grey400} />
        </IconButton>
      );

      return (
        <IconMenu iconButtonElement={iconButton}>
          <MenuItem onTouchTap={() => this.props.remove( recipe.id )}>
            Delete
          </MenuItem>
        </IconMenu>
      );
    };

    const go = r => this.context.router.push({ pathname: `/recipes/${r.id}/${r.slug}` });

    return (
      <List>
        { recipes.map( recipe => 
          <ListItem
            key={recipe.id}
            leftAvatar={<Avatar icon={<ViewListIcon />} />}
            primaryText={recipe.name}
            secondaryText={recipe.description}
            onTouchTap={() => go( recipe )}
            rightIconButton={createSecondaryActionMenu( recipe )}
          />
        )}
      </List>
    );
  }
}

RecipeList.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = ({ recipes }) => ({ recipes });

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch( fetchRecipes() ),
  add: recipe => dispatch( addRecipe( recipe ) ),
  remove: id => dispatch( deleteRecipe( id ) ),
});

export default connect( mapStateToProps, mapDispatchToProps )( RecipeList );

