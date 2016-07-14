import shortid from 'shortid';

export default ( name, description ) => ({
  type: 'ADD_RECIPE',
  id: shortid.generate(),
  name,
  description,
});

