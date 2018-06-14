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
        <h1>Welcome to flux.fail <small>BETA</small></h1>

        <blockquote>
          <strong>
            flux:&nbsp;
          </strong>
          The act of flowing; a continuous moving on or passing by, as of a
          flowing stream.
        </blockquote>

        <h2>
          Flux: Cause
        </h2>
        <p>
          flux.fail aims on offering a platform where users can anonymously
          report and keep track of their commutes and any delays they may be
          suffering. All reported delays are bundled into a collective
          delay-stream, which the users can keep an eye on while underway, in
          order to catch any irregularities beforehand. The app also aims
          on providing interfaces to all public transportation provider APIs
          and being able to give the users useful and context-related
          suggestions for alternative routes in response to traffic
          irregularities.
        </p>

        <h2>Flux: Privacy</h2>
        <p>
          No information whatsoever is required to register for the services
          provided by this site. Only a valid e-mail address has to be stated
          in order to receive a login link which is valid only once within 24h.
          When clicking the link, the site deletes the e-mail address from its
          database and instead stores the SHA256 hash of the e-mail address in
          the browser{"'"}s cookies. This hash is henceforth used to identify
          the user and to map all reported delays to the users{"'"}
          browser-sessions.
        </p>
        <p>Please read our data privacy statment for more information.</p>

        <h2>Flux: Compensation</h2>
        <p>
          All reports are rewarded with points which can be collected and
          traded for coupons of the various public transportation providers.
          Great savings for all users and at least a little compensation for
          all those inconveniences and frustration. Everyone{"'"}s own little
          flux-compensation.
        </p>

        <hr />
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
