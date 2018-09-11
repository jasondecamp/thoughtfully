import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Auth from '../auth/authService';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AlertsProvider } from "./Alerts";

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontWeight: 400,
        borderRadius: 3,
        textTransform: 'none',
        height: '48px',
        padding: '0 30px',
      },
    },
  },
});

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Auth.init();
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  }

  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  render() {
    this.closeAlert = () => {
      this.setState({alert: { open: false }});
    };
    return (
      <MuiThemeProvider theme={theme}>
        <AlertsProvider>
          <div className="app">
            <div className="page-container">{this.props.children}</div>
          </div>
        </AlertsProvider>
      </MuiThemeProvider>
    );
  }
}
