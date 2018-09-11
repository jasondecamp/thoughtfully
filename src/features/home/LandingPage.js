import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Intro from './Intro';
import Dashboard from './Dashboard';
import LoginModal from '../auth/LoginModal';

export class LandingPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loginModal: false
    };
  }

  render() {
    let toggle = () => this.setState({ loginModal: !this.state.loginModal});
    return (
      <div className="home-landing-page">
        {(!this.props.auth || !this.props.auth.user) &&
        <Intro login={toggle}/>
        }
        {this.props.auth && this.props.auth.user &&
        <Dashboard user={this.props.auth.user}/>
        }
        <LoginModal show={this.state.loginModal} onHide={toggle}/>
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
