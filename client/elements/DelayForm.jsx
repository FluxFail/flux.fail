import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import TransportIcon from './TransportIcon';
import PropTypes from 'prop-types';

const toolbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '24px',
  marginBottom: '24px',
};

const combinedField = {
  display: 'flex',
  flexDirection: 'row',
};

const minutesStyle = {
  textAlign: 'center',
  marginTop: 0,
  paddingTop: 0,
};

const datePickerStyle = {
  width: '40vw',
}
const timePickerStyle = {
  width: '20vw',
}
const typePickerStyle = {
  paddingTop: '20px',
};

class DelayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      id: props.id,
      date: props.date,
      minutes: props.minutes,
      city: props.city,
      line: props.line,
      direction: props.direction,
    };
  }

  render() {
    return (
      <div>
        <Tabs
          value={this.state.type}
          onChange={(type) => {
            this.setState({
              type,
            });
          }}
        >
          <Tab
            icon={<TransportIcon type="bus" padding={0} />}
            value="bus"
          />
          <Tab
            icon={<TransportIcon type="ferry" padding={0} />}
            value="ferry"
          />
          <Tab
            icon={<TransportIcon type="flight" padding={0} />}
            value="flight"
          />
          <Tab
            icon={<TransportIcon type="subway" padding={0} />}
            value="subway"
          />
          <Tab
            icon={<TransportIcon type="train" padding={0} />}
            value="train"
          />
          <Tab
            icon={<TransportIcon type="tram" padding={0} />}
            value="tram"
          />
          <Tab
            icon={<TransportIcon type="other" padding={0} />}
            value="other"
          />
        </Tabs>
        <h2>When did the delay happen?</h2>
        <div style={combinedField}>
          <DatePicker
            hintText={this.state.date.toLocaleDateString()}
            value={this.state.date}
            onChange={(event, date) => this.setState({
              date,
            })}
            textFieldStyle={datePickerStyle}
          />
          <TimePicker
            hintText={this.state.date.toLocaleTimeString()}
            format="24hr"
            value={this.state.date}
            onChange={(event, date) => this.setState({
              date,
            })}
            textFieldStyle={timePickerStyle}
          />
        </div>
        <h2>How long were you delayed?</h2>
        <Slider
          min={1}
          max={90}
          step={1}
          value={this.state.minutes}
          onChange={(event, minutes) => this.setState({
            minutes,
          })}
        />
        <p style={minutesStyle}>
          {this.state.minutes} minutes
        </p>
        <h2>Where was this?</h2>
        <div style={combinedField}>
        <TextField
          floatingLabelText="City"
          value={this.state.city}
          onChange={(event, city) => this.setState({
            city,
          })}
        />
        <TextField
          floatingLabelText="Line"
          value={this.state.line}
          onChange={(event, line) => this.setState({
            line,
          })}
        />
        </div>
        <TextField
          floatingLabelText="Direction"
          value={this.state.direction}
          onChange={(event, direction) => this.setState({
            direction,
          })}
        />
        <div style={toolbarStyle}>
          <RaisedButton
            label={this.state.id ? "Save changes" : "Report delay"}
            primary
            onClick={() => this.props.onSaveDelay(this.state)}
          />
          <FlatButton
            label="Cancel"
            onClick={() => this.props.onCancelDelay()}
          />
        </div>
      </div>
    );
  }
}

DelayForm.defaultProps = {
  type: 'unknown',
  id: '',
  date: new Date(),
  minutes: 5,
  city: '',
  line: '',
  direction: '',
};

DelayForm.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  minutes: PropTypes.number,
  city: PropTypes.string,
  line: PropTypes.string,
  direction: PropTypes.string,
  onSaveDelay: PropTypes.func,
  onCancelDelay: PropTypes.func,
};

export default DelayForm;
