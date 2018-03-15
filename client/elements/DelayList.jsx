import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import TransportIcon from './TransportIcon';
import formatDelay from '../utils/delay';

const DelayCard = props => (
  <Card>
    <CardHeader
      avatar={<TransportIcon type={props.type} />}
      title={`${props.line} to ${props.direction}`}
      subtitle={formatDelay(props.minutes)}
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
  minutes: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  onEditDelay: PropTypes.func.isRequired,
  onDeleteDelay: PropTypes.func.isRequired,
};

const loadingStyle = {
  display: 'block',
  marginTop: '20vh',
  marginLeft: 'auto',
  marginRight: 'auto',
};

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
    minutes: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date),
  })),
  status: PropTypes.string,
  onEditDelay: PropTypes.func.isRequired,
  onDeleteDelay: PropTypes.func.isRequired,
};

export default DelayList;
