import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import { red500 } from 'material-ui/styles/colors';
import TransportIcon from './TransportIcon';
import formatDelay from '../utils/delay';

const DelayCard = props => (
  <Card>
    <CardHeader
      avatar={<TransportIcon type={props.type} />}
      title={`${props.line} to ${props.direction}`}
      subtitle={formatDelay(props.delay)}
      actAsExpander
      showExpandableButton
    />
    <CardText expandable>
      {props.city} at {props.date.toLocaleDateString()}
    </CardText>
    <CardActions>
      <FlatButton
        label="Edit"
        onClick={() => props.onEditDelay(props.id)}
      />
      <FlatButton
        label="Delete"
        onClick={() => props.onDeleteDelay(props.id)}
      />
    </CardActions>
  </Card>
);

DelayCard.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  line: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  onEditDelay: PropTypes.func.isRequired,
  onDeleteDelay: PropTypes.func.isRequired,
};

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

const loadingStyle = {
  display: 'block',
  marginTop: '20vh',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const noDelaysReported = props => (
  <div>
    <h1>Welcome to flux.fail</h1>
    <h2>Great to have you on board!</h2>
    <h3>
      Every new reporter increases our overall coverage. Your reports matter!
    </h3>
    <p>
      Getting started is easy:
    </p>
    <ol>
      <li>
        Report trips and delays by clicking the plus sign in the bottom right
        corner
      </li>
      <li>
        Report bugs and request features on&nbsp;
        <a
          href="https://github.com/FluxFail/flux.fail/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </li>
      <li>
        Stay tuned as this site is still beta-software, under heavy development
        and frankly subject to frequent changes
      </li>
    </ol>
  </div>
);

const DelayList = (props) => {
  if (props.status === 'loading') {
    return (
      <CircularProgress
        size={80}
        thickness={3}
        style={loadingStyle}
      />
    );
  }
  if (props.status === 'error') {
    return (
      <ErrorCard />
    );
  }
  if (props.delays.length === 0) {
    return noDelaysReported();
  }
  return (
    <div>
      {props.delays.map(delay => (
        <DelayCard
          {...delay}
          key={delay.id}
          onEditDelay={props.onEditDelay}
          onDeleteDelay={props.onDeleteDelay}
        />
      ))}
    </div>
  );
};

DelayList.defaultProps = {
  delays: [],
  status: 'ok',
};

DelayList.propTypes = {
  delays: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string.isRequired,
    line: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    delay: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date),
  })),
  status: PropTypes.string,
  onEditDelay: PropTypes.func.isRequired,
  onDeleteDelay: PropTypes.func.isRequired,
};

export default DelayList;
