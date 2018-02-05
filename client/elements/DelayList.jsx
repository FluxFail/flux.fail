import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const DelayCard = ({ id, date, minutes, city, line, direction, onEditDelay, onDeleteDelay }) => (
  <Card>
    <CardHeader
      title={`${line} to ${direction}`}
      subtitle={`${minutes} minutes`}
    />
    <CardText>
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
