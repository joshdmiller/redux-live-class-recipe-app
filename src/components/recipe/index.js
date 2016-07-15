import React from 'react';
import { connect } from 'react-redux';

export const Recipe = ({
  name,
  description,
}) => (
  <div>
    <h1>{name}</h1>
    <p>
      {description}
    </p>
  </div>
);

const mapStateToProps = ({ recipes, }, { params: { id } }) => ({
  ...( recipes.find( r => r.id === id ) || {} ),
});

export default connect( mapStateToProps )( Recipe );

