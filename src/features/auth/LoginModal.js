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

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      register: false
    };
  }

  toggleRegister = (event) => {
    this.setState({register:!this.state.register});
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let action = this.state.register ? 'register' : 'login';
    this.props.actions[action]({
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    }).then(res => {
      let msg = action === 'login' ? 
        `Hello again, ${res.user.username}!` : 
        `Welcome, ${res.user.username}!`;
      this.props.alert.show({message:msg});
      this.props.onHide(true);
    }, error => {
      let msg = this.getErrorMessage(error.meta.error);
      this.props.alert.show({message:msg});
    });
  }

  handleError = () => {
    this.setState({error:true});
    setTimeout(() => this.setState({error: false}), 300);
  }

  getErrorMessage = (error) => {
    if(this.state.register) {
      switch(error.message) {
        case 'Validation error':
          if(error.details && error.details.email)
            return `Must be a valid email address.`;
          if(error.details && error.details.password)
            return `Password must be at least 5 characters.`;
          break;
        default:
          if(error.message.includes('users_email_unique'))
            return `This user email is already registered.`;
          if(error.message.includes('users_username_unique'))
            return `This username is already registered.`;
          break;
      }
    } 
    return `Oops. Please double check and try again.`;
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Drawer anchor="right" open={this.props.show} onClose={this.props.onHide} className="modal modal-login" classes={{paper:'modal-content'}}>
        <h3 className="modal-header">
          {this.state.register ? 'Register' : 'Sign in'}
          <a onClick={this.toggleRegister}>{ this.state.register ? '(already signed up?)' : '(not yet signed up?)'}</a>
        </h3>
        <div className="modal-body">
          <ValidatorForm className="login-form" id="loginForm" noValidate
            onSubmit={this.handleSubmit} onError={this.handleError}>
            <TextValidator fullWidth className="form-row" label="Username" name="username" 
              validators={['required','matchRegexp:^[A-Za-z0-9]+$']} errorMessages={['required','only letters and numbers']}
              value={this.state.username} onChange={this.handleChange} />
            { this.state.register && 
            <TextValidator fullWidth className="form-row" label="Email" name="email" 
              validators={['required', 'isEmail']} errorMessages={['required', 'valid email required']}
              value={this.state.email} onChange={this.handleChange} />
            }
            <TextValidator fullWidth className="form-row" label="Password" name="password" 
              validators={['required', 'minStringLength:5']} errorMessages={['required', 'too short! (min 5)']}
              type="password" value={this.state.password} onChange={this.handleChange} />
            { !this.state.register && 
            <div className="forgot"><a onClick={this.props.onForgotPassword}>forgot?</a></div>
            }

            { false && 
            <div className="social">
              <p className="divider"><span>or</span></p>
              <Button type="button" color="primary"><i className="fa fa-facebook"></i>Facebook</Button>{' '}
              <Button type="button" color="white"><i className="fa fa-google"></i>Google</Button>
            </div>
            }
          </ValidatorForm>
        </div>
        <div className="modal-footer">
          <Button onClick={this.props.onHide}>Cancel</Button>{' '}
          <Button type="submit" form="loginForm" 
            className={classNames('purple-gradient',{
              'error': this.state.error, 
              'loading': this.props.auth.registerPending ||  this.props.auth.loginPending
            })}>{ this.state.register ? 'Sign up' : 'Sign in'}</Button>
        </div>
      </Drawer>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    auth: state.auth
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
)(Alerts(LoginModal));
