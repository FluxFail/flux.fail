import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Timeline, Icon, Button } from 'antd';
import { VehicleIcon } from '../VehicleIcon';

const ButtonGroup = Button.Group;

class Delay extends React.Component {
  constructor(props) {
    super(props);

    this.render_chevron = this.render_chevron.bind(this);
    this.render_details = this.render_details.bind(this);
  }

  render_chevron() {
    if (this.props.isOpen) {
      return (
        <i className="fas fa-chevron-down w3-large"
          onClick={(e) => {this.props.onOpenDelay(e, this.props.id)}} />
      )
    } else {
      return (
        <i className="fas fa-chevron-up w3-large" 
          onClick={(e) => {this.props.onOpenDelay(e, this.props.id)}} />
      )
    }
  }

  render_details(id, isMyDelay, country, city, timestamp) {
    if (this.props.isOpen === true) {
      let row = "";
      if (isMyDelay === false) {
        row = (
          <Row>
            <Col span="24" className="w3-center">
              <ButtonGroup className="w3-bar" style={{width: "100%"}}>
                <Button
                  onClick={() => {this.props.onOnePlusDelay(id)}}
                  className="w3-yellow w3-button"
                  size="large"
                  style={{width: "100%"}}
                  icon="user-add" />
              </ButtonGroup>
            </Col>
          </Row>
        )
      } else {
        row = (
          <Row>
            <Col span="24" className="w3-center">
              <ButtonGroup className="w3-bar" style={{width: "100%"}}>
                <Button
                  className="w3-button w3-red"
                  size="large"
                  style={{width: "20%"}}
                  icon="delete"
                  onClick={() => {this.props.onDeleteDelay(id)}} />
                <Button
                  className="w3-button"
                  size="large"
                  style={{width: "80%"}}
                  icon="edit"
                  onClick={() => {this.props.onEditDelay(id)}}>Edit</Button>
              </ButtonGroup>
            </Col>
          </Row>
        )
      };

      return (
        <div>
          <Row className="w3-padding">
            <Col span="12" className="w3-left-align">
              {country}{(! country === "") ? " / " : ""}<br />
              {city}
            </Col>
            <Col span="12" className="w3-right-align">
              {timestamp.toLocaleDateString()}<br />
              {timestamp.toLocaleTimeString()}
            </Col>
          </Row>
          {row}
        </div>
      )
    }
    return (<div></div>);
  }

  render() {
    const {
      id,
      isMyDelay,
      scheduled_departure,
      country,
      city,
      location,
      direction,
      delay_minutes,
      line,
      vehicle,
      points
    } = this.props;

    return (
      <div>
        <Row>
          <Col span="4" className="w3-center">
            <br />
            <VehicleIcon id={vehicle} size={48} /><br />
          </Col>
          <Col span="17">
            <br />
            <span className="w3-badge w3-yellow w3-right">
              {points}
            </span>
            <span>
              <strong>{line}</strong>&nbsp;
              <Icon type="arrow-right"/>&nbsp;
              {direction}
            </span>
            <br />
            <span className="w3-text-red">
              <Icon type="clock-circle" size="small" />&nbsp;
              {delay_minutes}min
            </span>
            <div>
              <small><i>
                {(location === null || location === "") ? "" : "(ab "+location+")"}
              </i></small>
            </div>
          </Col>
          <Col span="3" className="w3-center">
            <br /><br />
            {this.render_chevron(country, city, scheduled_departure)}
          </Col>
        </Row>
        {this.render_details(id, isMyDelay, country, city, scheduled_departure)}
      </div>
    )
  }
}

Delay.defaultProps = {
  isMyDelay: false,
  isOpen: false,
  id: '',
  country: '',
  city: '',
  scheduled_departure: new Date(),
  location: '',
}

Delay.propTypes = {
  isMyDelay: PropTypes.bool,
  isOpen: PropTypes.bool,
  id: PropTypes.string,
  country: PropTypes.string,
  city: PropTypes.string,
  scheduled_departure: PropTypes.instanceOf(Date),
  location: PropTypes.string,
  destination: PropTypes.string,
  delay_minutes: PropTypes.number,
  line: PropTypes.string,
  vehicle: PropTypes.number,
  points: PropTypes.number,
  onOpenDelay: PropTypes.func,
  onEditDelay: PropTypes.func,
  onDeleteDelay: PropTypes.func,
  onOnePulsDelay: PropTypes.func,
}

export default Delay;