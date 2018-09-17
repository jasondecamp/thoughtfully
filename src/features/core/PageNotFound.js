import React, { PureComponent } from 'react';

export default class PageNotFound extends PureComponent {
  render() {
    return (
      <div className="core-page-not-found">
        Page not found.<br/>
        <a href="/">Back</a>
      </div>
    );
  }
}
