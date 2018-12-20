import React from 'react';
import PropTypes from 'prop-types';
import { red500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import { Button, Spin, Switch } from 'antd';
import Delay from './Delay';

const ErrorCard = props => (
  <Card>
    <CardHeader
      avatar={<ErrorIcon color={red500} />}
      title="Something went wrong"
      subtitle="Unable to communicate with the server"
    />
    <CardActions>
      <FlatButton
        label="Try again"
      />
    </CardActions>
  </Card>
);

class DelayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDelay: '',
    };

    this.openDelay = this.openDelay.bind(this);
    this.listDelays = this.listDelays.bind(this);
  }

  openDelay(e, id) {
    if (id === this.state.openDelay) {
      this.setState({
        openDelay: '',
      });
    } else {
      this.setState({
        openDelay: id,
      });
    }
  }

  listDelays(showAll) {
    this.props.onListDelays(showAll);
  }

  render() {
    if (this.props.status === "loading") {
      return (
        <div className="w3-center">
          <br />
          <br />
          <Spin size="large" />
        </div>
      )
    }

    if (this.props.status === "error") {
      return (
        <ErrorCard />
      )
    }

    return (
      <div>
        <div className="w3-right">
          Show my delays only &nbsp;
          <Switch checked={this.props.listConfig.myDelays} onChange={this.listDelays} />
        </div>
        <br />
        <Button
          className="w3-top w3-margin-top"
          onClick={this.props.onAddDelay}>
          Add delay
        </Button>
        {this.props.delays.map(delay => (
          <Delay
            {...delay}
            sessionUser={this.props.user.id}
            key={delay.id}
            isOpen={this.state.openDelay === delay.id}
            onOpenDelay={this.openDelay}
            onEditDelay={this.props.onEditDelay}
            onDeleteDelay={this.props.onDeleteDelay}
            onListDelays={this.props.onListDelays}
            onOnePlusDelay={this.props.onOnePlusDelay}/>
        ))}
      </div>
    )
  }
}

DelayList.defaultProps = {
  delays: [],
  listConfig: {
    myDelays: false,
  },
  status: 'ok',
};

DelayList.propTypes = {
  status: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  listConfig: PropTypes.shape({
    myDelays: PropTypes.bool,
  }),
  delays: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    parent: PropTypes.string,
    user: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    scheduled_departure: PropTypes.instanceOf(Date),
    location: PropTypes.string,
    direction: PropTypes.string,
    delay_minutes: PropTypes.number,
    line: PropTypes.string,
    vehicle: PropTypes.number,
    plusOnes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      user: PropTypes.string,
    })),
  })),
  onEditDelay: PropTypes.func.isRequired,
  onDeleteDelay: PropTypes.func.isRequired,
  onListDelays: PropTypes.func.isRequired,
  onOnePlusDelay: PropTypes.func.isRequired,
}

export default DelayList;
