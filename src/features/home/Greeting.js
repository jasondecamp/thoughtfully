import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Greeting extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      greeting: this.getGreeting()
    };
    this.getGreeting = this.getGreeting.bind(this);
  }

  componentDidMount() {
    this.watcher = setInterval(() => {
      let greeting = this.getGreeting();
      if(greeting !== this.state.greeting) this.setState({greeting:greeting});
    },60*1000);
  }

  componentWillUnmount() {
    clearInterval(this.watcher);
  }

  getGreeting() {
    let time = (new Date()).getHours();
    if(!this.props.auth.user) return 'Hello.';
    switch(true) {
      case(time < 2 || time >= 22):
        return `Up late, ${this.props.auth.user.username}?`;
      case(time < 6):
        return `Early morning, ${this.props.auth.user.username}?`;
      case(time < 10):
        return `Good morning, ${this.props.auth.user.username}!`;
      case(time < 14):
        return `Hello ${this.props.auth.user.username}!`;
      case(time < 18):
        return `Good afternoon, ${this.props.auth.user.username}!`;
      case(time < 22):
        return `Good evening, ${this.props.auth.user.username}!`;
      default:
        return `Hello ${this.props.auth.user.username}!`;
    }
  }

  render() {
    return (
      <div className="greeting">{this.state.greeting}</div>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeting);
