import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Divider from 'material-ui/lib/divider';
import Popover from 'material-ui/lib/popover/popover';

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);

    this.state = {
      open: false
    };
  }

  handleTouchTap(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  render() {
    const { fields: { name, category, overview }, handleSubmit, handleDelete } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <RaisedButton type="button" onTouchTap={this.handleTouchTap} label='delete'/>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <RaisedButton type="button" onTouchTap={handleDelete} label='Are you sure?'/> 
        </Popover>
        <div>
          <TextField
            floatingLabelText="Name"
            type="text"
            underlineShow={true}
            {...name}
            onBlur={event => {
              name.onChange(event);
              setTimeout(() =>
                handleSubmit());
            }}
          />
        </div>
        <div>
          <TextField
            floatingLabelText="Category"
            type="text"
            underlineShow={true}
            {...category}
            onBlur={event => {
              category.onChange(event);
              setTimeout(() =>
                handleSubmit());
            }}
          />
        </div>
        <div>
          <TextField
            floatingLabelText="Overview"
            multiLine={true}
            style={{width: '100%'}}
            type="text"
            underlineShow={true}
            {...overview}
            onBlur={event => {
              overview.onChange(event);
              setTimeout(() =>
                handleSubmit());
            }}
          />
        </div>
        <Divider />
      </form>
    );
  }
}

RecipeForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

RecipeForm = reduxForm({
  form: 'recipe',
  fields: ['name', 'category', 'overview']
})(RecipeForm);

export default RecipeForm;
