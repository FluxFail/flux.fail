import React from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TransportIcon from './TransportIcon';
import formatDelay from '../utils/delay';

const DelayCard = ({ id, type, date, minutes, city, line, direction, onEditDelay, onDeleteDelay }) => (
  <Card>
    <CardHeader
      avatar={<TransportIcon type={type} />}
      title={`${line} to ${direction}`}
      subtitle={formatDelay(minutes)}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText expandable={true}>
      {city} at {date.toLocaleDateString()}
    </CardText>
    <CardActions>
      <FlatButton
        label="Edit"
        onClick={() => onEditDelay(id)}
      />
      <FlatButton
        label="Delete"
        onClick={() => onDeleteDelay(id)}
      />
    </CardActions>
  </Card>
);

const DelayList = ({ delays, onEditDelay, onDeleteDelay }) => (
  <div>
    {delays.map((delay) => (
      <DelayCard
        key={delay.id}
        onEditDelay={onEditDelay}
        onDeleteDelay={onDeleteDelay}
        {...delay}
      />
    ))}
  </div>
);

export default DelayList;
