import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import PropTypes from 'prop-types';
import TransportIcon from './TransportIcon';
import formatDelay from '../utils/delay';

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
  marginTop: -24,
  paddingTop: 0,
};

const datePickerStyle = {
  width: '40vw',
};
const timePickerStyle = {
  width: '20vw',
};
const typePickerAreaStyle = {
  marginLeft: -24,
  marginRight: -24,
};
const typePickerStyle = {
  backgroundColor: 'transparent',
};

class DelayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      id: props.id,
      date: props.date,
      delay: props.delay,
      city: props.city,
      line: props.line,
      direction: props.direction,
      max: 30,
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
          style={typePickerAreaStyle}
          tabItemContainerStyle={typePickerStyle}
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
          min={0}
          max={this.state.max}
          step={1}
          value={this.state.delay}
          onChange={(event, delay) => {
            let { max } = this.state;
            if (delay >= this.state.max - 5) {
              max += 10;
            }
            this.setState({
              delay,
              max,
            });
          }}
        />
        <p style={minutesStyle}>
          {formatDelay(this.state.delay)}
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
            label={this.state.id ? 'Save changes' : 'Report delay'}
            primary
            onClick={() => {
              const delay = JSON.parse(JSON.stringify(this.state));
              delay.date = new Date(delay.date);
              delete delay.max;
              this.props.onSaveDelay(delay);
            }}
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
  delay: 0,
  city: '',
  line: '',
  direction: '',
  onSaveDelay: () => {},
  onCancelDelay: () => {},
};
DelayForm.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  delay: PropTypes.number,
  city: PropTypes.string,
  line: PropTypes.string,
  direction: PropTypes.string,
  onSaveDelay: PropTypes.func,
  onCancelDelay: PropTypes.func,
};

export default DelayForm;
