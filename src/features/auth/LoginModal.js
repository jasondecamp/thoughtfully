import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'mdbreact';

export class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      login: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.type === 'checkbox' ? 
        event.target.checked : event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    event.target.className += ' was-validated'; 
    if(event.target.checkValidity()) this.props.actions.login({
        email: this.state.email,
        password: this.state.password
      }).then(res => {
        // TODO: show a welcome message
        this.props.onHide();
      }, error => {
        // TODO: show an error message
        console.log(error);
      });
    else {
      this.setState({error:true});
      setTimeout(() => this.setState({error: false}), 300);
    }
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    let register = () => this.setState({login:false});
    return (
      <Modal isOpen={this.props.show} toggle={this.props.onHide} modalClassName="right modal-login"
        fullHeight position="right">
        <ModalHeader toggle={this.props.onHide}>Sign in</ModalHeader>
        <ModalBody>
          <form className="text-center" onSubmit={this.handleSubmit} noValidate id="loginForm">
            <div className="md-form">
              <Input label="Email" name="email" type="email" validate required
                value={this.state.email} onChange={this.handleChange} error="!"/>
            </div>
            <div className="md-form">
              <Input label="Password" name="password" type="password" validate required
                value={this.state.password} onChange={this.handleChange} error="!"/>
              <label className="forgot-password"><a className="forgot-password" href="">Forgot password?</a></label>
            </div>
            <p className="divider"><span>or</span></p>
            <Button type="button" color="primary"><i className="fa fa-facebook"></i>Facebook</Button>{' '}
            <Button type="button" color="white"><i className="fa fa-google"></i>Google</Button>
            <p>
              <Button flat onClick={register}>Not a member?</Button>{' '}
            </p>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button flat onClick={this.props.onHide}>Cancel</Button>{' '}
          <Button gradient="purple" type="submit" form="loginForm" 
            className={`${this.state.error ? 'error' : ''} ${this.state.loading ? 'loading' : ''}`}>Sign in</Button>
        </ModalFooter>
      </Modal>

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
)(LoginModal);
