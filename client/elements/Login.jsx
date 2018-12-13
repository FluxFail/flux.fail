import React from 'react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';
import CircularProgress from 'material-ui/CircularProgress';
import { Button, Card, Form, Icon, Input, Alert } from 'antd';

const FormItem = Form.Item;

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
        <Card title="Login">
          <Form onSubmit={() => this.props.onLogin(this.state.email)} className="login-form">
            <p>
              Enter your email address below and we will send you a link that will sign you in.
            </p>
            <FormItem>
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Your e-mail address"
                onChange={event => this.setState({
                  email: event.target.value,
                })} />
            </FormItem>
            <FormItem>
              <Button
                type="primary w3-block w3-large"
                htmlType="submit"
                className="login-form-button"
                disabled={!isEmail(this.state.email)}
                onClick={() => this.props.onLogin(this.state.email)}>
                Send Login Link
              </Button>
            </FormItem>
            <Alert
              message="Beware of grey-listing!"
              description="The spam-protection of your mail-provider may delay your very first login e-mail for up to 10 minutes."
              type="info"
              showIcon
              closeText="X" />
          </Form>
        </Card>
        <br />
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
