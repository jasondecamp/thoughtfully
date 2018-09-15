import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import TextareaAutosize from 'react-autosize-textarea';
import Greeting from './Greeting'
import LogoutButton from '../auth/LogoutButton';
import Alerts from "../core/Alerts";

const successMessages = [
  'Sent to the void.',
  'Thought archived.',
  'Let it float away.',
  'Forget the pain but never forget what it taught you.',
  'Life moves on and so should we.',
  'Courage is the power to let go of the familiar.',
  'If there is no struggle, there is no progress.',
  'What to the Slave is the 4th of July.',
  'Let us render the tyrant no aid.',
  'I would unite with anybody to do right; and with nobody to do wrong.',
  'You are not judged by the height you have risen, but from the depth you have climbed.',
  'Once you learn to read, you will be forever free.',
  'I prefer to be true to myself, even at the hazard of incurring the ridicule of others, rather than to be false, and to incur my own abhorrence.',
];

class Dashboard extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      thought: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getClasses = this.getClasses.bind(this);
  }

  componentDidMount() {
    this.textarea.focus();
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      // validate
      if(this.state.thought === '') return false;
      // save thought
      this.props.actions.saveThought({
        body:this.state.thought
      }).then(res => {
        this.setState({clear:true});
        setTimeout(() => {
          this.setState({thought:'', clear:false});
          this.textarea.focus();
        }, 700);
        this.props.alert.show({
          message: successMessages[Math.floor(Math.random() * successMessages.length)]
        });
      }, error => {
        this.props.alert.show({
          message: 'Uh oh! Technical Difficulties.'
        });
      });;
    }
    // TODO: tab, right arrow, enter accepts auto-suggest.
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    // TODO auto-suggest lookup
    // TODO auto-suggest styling
  }

  getClasses() {
    let classes = [];
    if(this.props.home.saveThoughtPending) classes.push('loading');
    if(this.state.clear) classes.push('clear');
    return classes.join(' ');
  }

  render() {
    return (
      <div className="app-content" onClick={() => this.textarea.focus()}>
        <LogoutButton/>
        <Greeting/>
        <div className={`helper ${this.state.thought === '' ? '' : 'hidden'}`}>
          Type your random thoughts below.
        </div>
        <div className={`hint ${this.state.thought === '' ? '' : 'active'}`}>
          {this.props.home.saveThoughtPending || this.state.clear ? 
            'Saving' : 'Press enter to save.'}
        </div>
        <div id="thought" className={this.getClasses()}>
          { (Array.from(Array(80).keys())).map((i) => {
            return (<div className="text" key={i}><div className="text_inner1"><div className="text_inner2">{this.state.thought}</div></div></div>)
          })}
          <div className="form-row">
            <TextareaAutosize 
              className="thought-input" 
              name="thought"
              style={{ resize: 'none' }}
              disabled={this.props.home.saveThoughtPending}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              value={this.state.thought} 
              innerRef={ref => this.textarea = ref}/>
            <span>click here</span>
          </div>
        </div> 
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
)(Alerts(Dashboard));
