import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui';
import { Form, Row, Col, DatePicker, TimePicker, Slider, Input, Button } from 'antd';
import moment from 'moment';
import { VehicleMap, VehicleIcon } from '../icons/VehicleIcon'

const combinedField = {
  display: 'flex',
  flexDirection: 'row',
};

const typePickerStyle = {
  backgroundColor: 'transparent',
};

const typePickerAreaStyle = {
  marginLeft: -24,
  marginRight: -24,
};

class DelayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      user: props.user,
      parent: props.parent,
      scheduled_departure: props.scheduled_departure,
      delay_minutes: props.delay_minutes,
      country: props.country,
      city: props.city,
      vehicle: props.vehicle,
      location: props.location,
      line: props.line,
      direction: props.direction,
      max: 30,
    };

    this.allRequiredFieldsSet = this.allRequiredFieldsSet.bind(this);
  }

  allRequiredFieldsSet() {
    return Boolean(this.state.scheduled_departure)
      && Boolean(this.state.delay_minutes)
      && Boolean(this.state.country)
      && Boolean(this.state.city)
      && Boolean(this.state.location)
      && Boolean(this.state.line)
      && Boolean(this.state.direction);
  }

  render() {
    return (
      <Form layout="vertical">
        <h3>When?</h3>
        <p>
          State your scheduled departure time.
        </p>
        <div style={combinedField}>
          <DatePicker
            defaultValue={moment(this.state.scheduled_departure.toISOString())}
            onChange={this.onChange} />
          <TimePicker
            defaultValue={moment(this.props.scheduled_departure.toISOString())}
            format="HH:mm"
            onChange={this.onChange} />
        </div>
        <br />
        <h3>Where?</h3>
        <Tabs
          className="w3-container"
          value={this.state.vehicle}
          onChange={(vehicle) => {
            this.setState({
              vehicle,
            });
          }}
          style={typePickerAreaStyle}
          tabItemContainerStyle={typePickerStyle}
        >
          <Tab
            icon={<VehicleIcon id={1} size={24} />}
            disabled={this.props.parent ? true : false}
            value={1}
          />
          <Tab
            icon={<VehicleIcon id={2} size={24} />}
            disabled={this.props.parent ? true : false}
            value={2}
          />
          <Tab
            icon={<VehicleIcon id={4} size={24} />}
            disabled={this.props.parent ? true : false}
            value={4}
          />
          <Tab
            icon={<VehicleIcon id={8} size={24} />}
            disabled={this.props.parent ? true : false}
            value={8}
          />
          <Tab
            icon={<VehicleIcon id={16} size={24} />}
            disabled={this.props.parent ? true : false}
            value={16}
          />
          <Tab
            icon={<VehicleIcon id={32} size={24} />}
            disabled={this.props.parent ? true : false}
            value={32}
          />
          <Tab
            icon={<VehicleIcon id={64} size={24} />}
            disabled={this.props.parent ? true : false}
            value={64}
          />
          <Tab
            icon={<VehicleIcon id={128} size={24} />}
            disabled={this.props.parent ? true : false}
            value={128}
          />
        </Tabs>
        <p className="w3-center">
          {
            (this.state.vehicle > 0)
            ? VehicleMap[this.state.vehicle]
            : ''
          }
        </p>
        <Row>
          <Col span="6" >
            <Input
              placeholder="Country"
              defaultValue={this.state.country}
              value={this.state.country}
              disabled={this.props.parent ? true : false}
              onChange={(e) => {
                if (e.target.value.length <= 2) {
                  this.setState({country: e.target.value.toUpperCase()})
                }
              }} />
          </Col>
          <Col span="18">
            <Input
              placeholder="City"
              defaultValue={this.state.city}
              value={this.state.city}
              disabled={this.props.parent ? true : false}
              onChange={(e) => {this.setState({city: e.target.value})}}/>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <Input
              placeholder="Line"
              value={this.state.line}
              disabled={this.props.parent ? true : false}
              onChange={(e) => {this.setState({line: e.target.value})}}
              />
          </Col>
          <Col span="18">
            <Input
              placeholder="Direction"
              value={this.state.direction}
              disabled={this.props.parent ? true : false}
              onChange={(e) => {this.setState({direction: e.target.value})}}
              />
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <Input
              placeholder="Where did you get in?"
              value={this.state.location}
              onChange={(e) => {this.setState({location: e.target.value})}} 
              />
          </Col>
        </Row>
        <br />
        <h3>How long?</h3>
        <Slider
          min={1}
          max={this.state.max}
          step={1}
          value={this.state.delay_minutes}
          onChange={(delay_minutes) => {
            let { max } = this.state;
            if (delay_minutes >= this.state.max - 5) {
              max += 10;
            }
            this.setState({
              delay_minutes,
              max,
            });
          }}
        />
        <div className="w3-center">
          {this.state.delay_minutes}min
        </div>
        <hr />
        <Button
          className={this.allRequiredFieldsSet() ? 'w3-yellow w3-right' : 'w3-right'}
          disabled={!this.allRequiredFieldsSet()}
          onClick={() => {
            const delay = { ...this.state };
            delete delay.max;
            delay.scheduled_departure = new Date(delay.scheduled_departure);
            Object.keys(delay).map((key) => {
              if (delay[key] === null) {
                delay[key] = '';
              }
            });
            this.props.onSaveDelay(delay);
          }}
        >
          {this.state.id ? 'Save changes' : 'Report delay'}
        </Button>
        <Button onClick={this.props.onCancelDelay}>Cancel</Button>
      </Form>
    );
  }
}

DelayForm.defaultProps = {
  id: '',
  parent: '',
  scheduled_departure: new Date(),
  delay_minutes: 5,
  country: '',
  city: '',
  vehicle: 0,
  line: '',
  location: '',
  direction: '',
};

DelayForm.propTypes = {
  id: PropTypes.string,
  user: PropTypes.string,
  parent: PropTypes.string,
  scheduled_departure: PropTypes.instanceOf(Date),
  delay_minutes: PropTypes.number,
  country: PropTypes.string,
  city: PropTypes.string,
  vehicle: PropTypes.number,
  line: PropTypes.string,
  location: PropTypes.string,
  direction: PropTypes.string,
  onSaveDelay: PropTypes.func.isRequired,
  onCancelDelay: PropTypes.func.isRequired,
};

export default DelayForm;
