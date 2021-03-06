import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ListItem from 'material-ui/lib/lists/list-item';
import Checkbox from 'material-ui/lib/checkbox';
import Popover from 'material-ui/lib/popover/popover';

class StepForm extends Component {
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
    const { isNewForm, fields: { text }, handleSubmit, handleDelete, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <ListItem
          leftCheckbox={<Checkbox disabled={true}/>}
          primaryText={
              <TextField
                hintText="What's the next step?"
                type="text"
                underlineShow={true}
                {...text}
                onBlur={event => {
                  text.onChange(event);
                  if (text.value) {
                    setTimeout(() =>
                      handleSubmit());
                  }
                }}
              />
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

StepForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  isNewForm: PropTypes.bool.isRequired
};

StepForm = reduxForm({
  form: 'step',
  fields: ['text']
})(StepForm);

export default StepForm;
