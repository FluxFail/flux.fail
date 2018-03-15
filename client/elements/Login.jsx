import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import isEmail from 'validator/lib/isEmail';
import CircularProgress from 'material-ui/CircularProgress';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  render() {
    let messageView = null;
    if (this.props.status === 'error') {
      messageView = (
        <p>{this.props.message}</p>
      );
    }

    let currentView = (
      <div>
        <p>Enter your email address below and we will send you a link that will sign you in</p>
        <Paper>
          {messageView}
          <TextField
            floatingLabelText="Your email address"
            type="email"
            onChange={event => this.setState({
              email: event.target.value,
            })}
          />
          <RaisedButton
            label="Get magic link"
            primary={isEmail(this.state.email)}
            disabled={!isEmail(this.state.email)}
            onClick={() => this.props.onLogin(this.state.email)}
          />
        </Paper>
      </div>
    );

    if (this.props.status === 'loading') {
      currentView = (
        <CircularProgress
          size={80}
          thickness={3}
        />
      );
    }

    if (this.props.status === 'registered') {
      currentView = (
        <p>
          Check your email! There should be a link that will sign you in.
        </p>
      );
    }

    return (
      <div>
        <h1>Welcome to Flux.Fail</h1>
        {currentView}
      </div>
    );
  }
}

Login.defaultProps = {
  status: 'ok',
  message: '',
};

Login.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string,
  onLogin: PropTypes.func.isRequired,
};

export default Login;
