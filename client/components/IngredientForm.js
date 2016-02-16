import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ListItem from 'material-ui/lib/lists/list-item';
import Checkbox from 'material-ui/lib/checkbox';
import Popover from 'material-ui/lib/popover/popover';

class IngredientForm extends Component {
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
    const { isNewForm, fields: { name, amount }, handleSubmit, submitting, handleDelete } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <ListItem
          style={{paddingTop:'0px'}}
          leftCheckbox={<Checkbox disabled={true}/>}
          primaryText={
            <div>
              <TextField
                floatingLabelText="Ingredient"
                style={{width: '40%', marginRight:'8px'}}
                type="text"
                underlineShow={true}
                {...name}
                onBlur={event => {
                  name.onChange(event);
                  if (name.value && amount.value) {
                    setTimeout(() =>
                      handleSubmit());
                  }
                }}
              />
              <TextField
                floatingLabelText="Amount"
                style={{width: '40%'}}
                type="text"
                underlineShow={true}
                {...amount}
                onBlur={event => {
                  amount.onChange(event);
                  if (name.value && amount.value) {
                    setTimeout(() =>
                      handleSubmit());
                  }
                }}
              />
            </div>
          }
          rightIconButton={isNewForm ? <RaisedButton type="submit" primary={true} disabled={submitting} label='add'/> : <RaisedButton type="button" onTouchTap={this.handleTouchTap} disabled={submitting} label='delete'/>}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <RaisedButton type="button" onTouchTap={handleDelete} disabled={submitting} label='Are you sure?'/> 
        </Popover>
      </form>
    );
  }
}

IngredientForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  isNewForm: PropTypes.bool.isRequired
};

IngredientForm = reduxForm({
  form: 'ingredient',
  fields: ['name', 'amount']
})(IngredientForm);

export default IngredientForm;
