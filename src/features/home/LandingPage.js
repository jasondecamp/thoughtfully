import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Button } from 'mdbreact';
import LoginModal from '../auth/LoginModal';

export class LandingPage extends Component {
  static propTypes = {
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
    let toggle = () => {
      return this.setState({ loginModal: !this.state.loginModal}); 
    };
    return (
      <div className="home-landing-page">
        <header className="app-header">
          Thoughtfully.
        </header>
        <div className="app-intro">
          Catalog your random thoughts, get a weekly email to help you organize what's on your mind.
        </div>
        <div className="app-cta">
          <Button gradient="purple" onClick={toggle}>Sign In</Button>
        </div>
        <LoginModal show={this.state.loginModal} onHide={toggle}/>
      </div>
    );
  }

}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
