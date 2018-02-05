import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
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

class DelayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  id: '',
  date: new Date(),
  minutes: 5,
  city: '',
  line: '',
  direction: '',
};

DelayForm.propTypes = {
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
