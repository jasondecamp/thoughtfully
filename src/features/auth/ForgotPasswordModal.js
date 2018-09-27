import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Alerts from "../core/Alerts";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export class ForgotPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleSubmit = () => {
    this.props.actions.forgotPassword({
      email: this.state.email
    }).then(res => {
      this.props.alert.show({message:'Sent! You should recieve your link in the next few minutes.'});
      this.props.onHide();
    }, error => {
      this.props.alert.show({message:'Uh oh. Technical Difficulties.'});
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Drawer anchor="right" open={this.props.show} onClose={this.props.onHide} className="modal modal-forgot-password" classes={{paper:'modal-content'}}>
        <h3 className="modal-header">
          Forgot Password?
        </h3>
        <div className="modal-body">
          <h4>No worries.</h4>
          <p>Enter your email address below. We'll send you a unique link that you can use to reset your password.</p>
          <ValidatorForm className="forgot-form" id="forgotForm" noValidate
            onSubmit={this.handleSubmit} onError={this.handleError}>
            <TextValidator fullWidth className="form-row" label="Email" name="email" 
              validators={['required', 'isEmail']} errorMessages={['required', 'valid email required']}
              value={this.state.email} onChange={this.handleChange} />
          </ValidatorForm>
        </div>
        <div className="modal-footer">
          <Button onClick={this.props.onHide}>Cancel</Button>{' '}
          <Button type="submit" form="forgotForm" 
            className={classNames('purple-gradient',{
              'error': this.state.error, 
              'loading': this.props.auth.forgotPasswordPending
            })}>Send</Button>
        </div>
      </Drawer>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alerts(ForgotPasswordModal));
