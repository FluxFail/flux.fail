import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import isEmail from 'validator/lib/isEmail';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  render() {
    return (
      <div>
        <h1>Welcome to Flux.Fail</h1>
        <p>Enter your email address below and we will send you a link that will sign you in</p>
        <Paper>
          <TextField
            floatingLabelText="Your email address"
            type="email"
            onChange={(event) => this.setState({
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
  }
}

export default Login;
