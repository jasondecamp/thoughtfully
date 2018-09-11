import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alerts from "../core/Alerts";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      register: false
    };
    this.toggleRegister = this.toggleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate(form) {
    
  }

  toggleRegister(event) {
    this.setState({register:!this.state.register});
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    event.target.className += ' was-validated'; 

    if(event.target.checkValidity()) {
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
        let msg = `Oops. Please double check and try again.`;
        this.props.alert.show({message:msg});
      });
    } else {
      this.setState({error:true});
      setTimeout(() => this.setState({error: false}), 300);
    }
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Drawer anchor="right" open={this.props.show} onClose={this.props.onHide} className="modal-login" classes={{paper:'modal-content'}}>
        <h3 className="modal-header">
          {this.state.register ? 'Register' : 'Sign in'}
          <a onClick={this.toggleRegister}>{ this.state.register ? '(already signed up?)' : '(not yet signed up?)'}</a>
        </h3>
        <div className="modal-body">
          <form className="login-form" onSubmit={this.handleSubmit} noValidate id="loginForm">

            <TextField fullWidth className="form-row" label="Username" name="username" 
              value={this.state.username} onChange={this.handleChange} />
            { this.state.register && 
            <TextField fullWidth className="form-row" label="Email" name="email" 
              value={this.state.email} onChange={this.handleChange} />
            }
            <TextField fullWidth className="form-row" label="Password" name="password" 
              type="password" value={this.state.password} onChange={this.handleChange} />
            
            { false && 
            <div className="social">
              <p className="divider"><span>or</span></p>
              <Button type="button" color="primary"><i className="fa fa-facebook"></i>Facebook</Button>{' '}
              <Button type="button" color="white"><i className="fa fa-google"></i>Google</Button>
            </div>
            }
            <p>
            </p>
          </form>
        </div>
        <div className="modal-footer">
          <Button onClick={this.props.onHide}>Cancel</Button>{' '}
          <Button type="submit" form="loginForm" 
            className={classNames('purple-gradient',{
              'error': this.state.error, 'loading': this.state.loading 
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
