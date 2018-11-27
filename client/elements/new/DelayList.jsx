import React from 'react';
import PropTypes from 'prop-types';
import { red500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import { Spin } from 'antd';
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
        {this.props.delays.map(delay => (
          <Delay
            {...delay}
            key={delay.id}
            isMyDelay={this.props.user.id === delay.user}
            isOpen={this.state.openDelay === delay.id}
            onOpenDelay={this.openDelay}
            onEditDelay={this.props.onEditDelay}
            onDeleteDelay={this.props.onDeleteDelay}/>
        ))}
      </div>
    )
  }
}

DelayList.defaultProps = {
  delays: [],
  status: 'ok',
};

DelayList.propTypes = {
  status: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  delays: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    user: PropTypes.string,
    parent: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    scheduled_departure: PropTypes.instanceOf(Date),
    location: PropTypes.string,
    direction: PropTypes.string,
    delay_minutes: PropTypes.number,
    line: PropTypes.string,
    vehicle: PropTypes.number,
    points: PropTypes.number,
  })),
  onEditDelay: PropTypes.func.isRequired,
  onDeleteDelay: PropTypes.func.isRequired,
}

export default DelayList;