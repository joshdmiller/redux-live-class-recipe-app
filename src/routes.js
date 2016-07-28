import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './components/main';
import RecipeList from './components/recipe-list';
import Recipe from './components/recipe';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={RecipeList} />

    <Route path="/recipes">
      <IndexRoute component={RecipeList} />

      <Route path=":id/:slug" component={Recipe} />
    </Route>
  </Route>
);

