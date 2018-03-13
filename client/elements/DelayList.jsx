import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
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

const DelayList = ({ delays, onEditDelay, onDeleteDelay }) => (
  <div>
    {delays.map(delay => (
      <DelayCard
        key={delay.id}
        onEditDelay={onEditDelay}
        onDeleteDelay={onDeleteDelay}
        {...delay}
      />
    ))}
  </div>
);

DelayList.defaultProps = {
  delays: [],
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
  onEditDelay: PropTypes.func.isRequired,
  onDeleteDelay: PropTypes.func.isRequired,
};

export default DelayList;
