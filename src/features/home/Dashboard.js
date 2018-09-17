import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import TextareaAutosize from 'react-autosize-textarea';
import Greeting from './Greeting'
import LogoutButton from '../auth/LogoutButton';
import Alerts from "../core/Alerts";
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const successMessages = [
  'I didn\'t know I was a slave until I found out I couldn\'t do the things I wanted.',
  'I had as well be killed running as die standing.',
  'The soul that is within me no man can degrade.',
  'Forget the pain but never forget what it taught you.',
  'Life moves on and so should we.',
  'Courage is the power to let go of the familiar.',
  'Without struggle there can be no progress.',
  'What to the Slave is the 4th of July.',
  'Let us render the tyrant no aid.',
  'I would unite with anybody to do right and with nobody to do wrong.',
  'You are not judged by the height you have risen, but from the depth you have climbed.',
  'Once you learn to read, you will be forever free.',
  'A man is never lost while he still earnestly thinks himself worth saving.',
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
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getClasses = this.getClasses.bind(this);
    this.suggestThought = AwesomeDebouncePromise(this.props.actions.suggestThought, 500);
  }

  componentDidMount() {
    this.textarea.focus();
  }

  handleKeyDown(event) {
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
          message: successMessages[Math.floor(Math.random() * successMessages.length)],
          delay: 8000
        });
      }, error => {
        this.setState({error:true});
        setTimeout(() => this.setState({error:false},300));
        this.props.alert.show({
          message: 'Uh oh! Technical Difficulties.'
        });
      });;
    }
    else if (event.key === 'Tab') {
      event.preventDefault();
      if(this.state.suggested) this.setState({
        thought:this.state.suggested.body,
        suggested:null
      });
    }
  }

  handleChange(event) {
    let update = {[event.target.name]: event.target.value}
    if(!event.target.value || (this.state.suggested && this.state.suggested.body.indexOf(event.target.value) !== 0)) 
      update.suggested = '';
    this.setState(update);
    if(event.target.value) this.suggestThought({params:{find:event.target.value}}).then(result => {
      this.setState({suggested:result});
    },() => {});
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
            'Saving' : `Press enter to save${this.state.suggested ? ', or tab to select suggestion.' : '.'}`}
        </div>
        <div id="thought" className={this.getClasses()}>
          { (Array.from(Array(40).keys())).map((i) => {
            return (<div className="text" key={i}><div className="text_inner1"><div className="text_inner2">{this.state.thought}</div></div></div>)
          })}
          <div className="suggest">{this.state.suggested ? this.state.suggested.body : ''}</div>
          <div className="form-row">
            <TextareaAutosize 
              className="thought-input" 
              name="thought"
              style={{ resize: 'none' }}
              disabled={this.props.home.saveThoughtPending}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
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
