import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class Intro extends Component {
  render() {
    return (
      <div className="app-content">
        <header className="app-header">
          Thoughtfully.
        </header>
        <div className="app-intro">
          Catalog your random thoughts, get a weekly email to help you organize what's on your mind.
        </div>
        <div className="app-cta">
          <Button className="purple-gradient" onClick={this.props.login}>Sign In</Button>
        </div>
      </div>
    );
  }
}
