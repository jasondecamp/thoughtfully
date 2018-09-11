import React, { Component } from 'react';
import { withContext } from "with-context";
import Snackbar from '@material-ui/core/Snackbar';

const AlertsContext = React.createContext();
const Alerts = withContext(AlertsContext, "alert");
export default Alerts;

class AlertsProvider extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      active: {},
    };
//    this.show = this.show.bind(this);
//    this.close = this.close.bind(this);
  }

  queue = [];
  defaults = { delay: 6000 };

  close = () => {
    this.setState({open: false, message: ''});
  };

  show = (opts) => {
    this.queue.push({...this.defaults,...opts,...{key: new Date().getTime()}});
    if(this.state.open) this.setState({ open: false });
    else this.processQueue();
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        open: true,
        active: this.queue.shift()
      });
    }
  };

  handleExited = () => {
    this.processQueue();
  };

  render() {
    return (
      <AlertsContext.Provider value={{
          close: this.close,
          show: this.show,
        }}>
        {this.props.children}
        <Snackbar open={this.state.open}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          autoHideDuration={this.state.active.delay}
          onClose={this.close}
          onExited={this.handleExited}
          key={this.state.active.key}
          message={this.state.active.message}/>
      </AlertsContext.Provider>
    );
  }
}
export { AlertsProvider };
