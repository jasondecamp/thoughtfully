import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Intro from './Intro';
import Dashboard from './Dashboard';
import LoginModal from '../auth/LoginModal';
import ForgotPasswordModal from '../auth/ForgotPasswordModal';

export class LandingPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loginModal: false,
      forgotPasswordModal: false
    };
  }

  handleForgotPassword = () => {
    this.setState({ loginModal: false, forgotPasswordModal: true });
  };

  render() {
    return (
      <div className="home-landing-page">
        {(!this.props.auth || !this.props.auth.user) &&
        <Intro login={() => this.setState({ loginModal: true })}/>
        }
        {this.props.auth && this.props.auth.user &&
        <Dashboard user={this.props.auth.user}/>
        }
        <LoginModal show={this.state.loginModal} onHide={() => this.setState({ loginModal: false})}
          onForgotPassword={this.handleForgotPassword}/>
        <ForgotPasswordModal show={this.state.forgotPasswordModal} onHide={() => this.setState({ forgotPasswordModal: false})}/>
      </div>
    );
  }

}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
    auth: state.auth
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
