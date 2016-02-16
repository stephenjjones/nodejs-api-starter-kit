import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';

import TextField from 'material-ui/lib/text-field';

class SearchForm extends Component {
  render() {
    const { fields: { query }, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          floatingLabelText="Search Recipes"
          type="text"
          underlineShow={true}
          {...query}
        />
      </form>
    );
  }
}

SearchForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

SearchForm = reduxForm({
  form: 'search',
  fields: ['query']
})(SearchForm);

export default SearchForm;
