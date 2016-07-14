const KEY = 'REDUX_STATE';

export const dehydrate = store => next => action => {
  const value = next( action );
  const newState = store.getState();

  if ( global.window ) {
    global.window.localStorage.setItem( KEY, JSON.stringify( newState, null, 2 ) );
  }

  return value;
};

export const rehydrate = defaultState => {
  const fromStorage = global.window ? window.localStorage.getItem( KEY ) : null;
  return fromStorage ? JSON.parse( fromStorage ) : defaultState;
};

