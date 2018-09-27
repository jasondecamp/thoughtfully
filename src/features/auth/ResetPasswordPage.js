import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as actions from './redux/actions';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Alerts from "../core/Alerts";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      status: 'loading'
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount = () => {
    if(!this.props.match.params.token) return;
    this.props.actions.validateToken({token:this.props.match.params.token}).then((user) => {
      this.setState({ user: user, status: 'ready' });
    },(err) => {
      this.setState({ status: 'invalid' });
      // this.props.alert.show({message:'Looks like an invalid link. Please try again.'});
    });
  };

  handleSubmit = () => {
    this.props.actions.resetPassword({
      password: this.state.password,
      token: this.props.match.params.token
    }).then(res => {
      this.props.alert.show({message:'Updated! See you again the next time you forget ;)'});
      this.setState({ status: 'success' });
    }, error => {
      this.props.alert.show({message:'Uh oh. Technical Difficulties.'});
    });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="reset-password-page">
        { this.state.status === 'loading' && 
        <span>
          verifying link
          <span className="dots">
            <span>.</span><span>.</span><span>.</span>
          </span>
        </span>
        }
        { this.state.status === 'invalid' &&
        <span>Oops, looks like an invalid link. Please try again or request a new one if this issue persists.</span>
        }
        { this.state.status === 'ready' &&
        <ValidatorForm className="reset-form" id="resetForm" noValidate
          onSubmit={this.handleSubmit} onError={this.handleError}>
          <h2>Hello {this.state.user.username}</h2>
          <p>Please enter your shiny new password below:</p>
          <TextValidator fullWidth className="form-row" label="Password" name="password" 
            validators={['required', 'minStringLength:5']} errorMessages={['required', 'too short! (min 5)']}
            type="password" value={this.state.password} onChange={this.handleChange} />
          <div className="form-row">
            <Button type="submit" form="resetForm" 
              className={classNames('purple-gradient',{
                'error': this.state.error, 
                'loading': this.props.auth.resetPasswordPending
              })}>Update</Button>
          </div>
        </ValidatorForm>
        }
        { this.state.status === 'success' &&
        <div>
          <h2>Success!</h2>
          <p>You're password has been updated.</p>
          <p>Back to your <Link to="/">thoughts</Link>.</p>
        </div>
        }
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    auth: state.auth,
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
)(Alerts(ResetPasswordPage));
