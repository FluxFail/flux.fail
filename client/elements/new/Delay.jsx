import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Timeline, Icon, Button, Modal } from 'antd';
import { VehicleIcon } from '../VehicleIcon';

const ButtonGroup = Button.Group;

function editDelayId(props) {
  const {sessionUser, user, plusOnes} = props;

  if (user === sessionUser) {
    return props.id;
  }
  const res = plusOnes.map((plusOne) => {
    if (plusOne.user === sessionUser) {
      return plusOne.id;
    }
  });
  if (res.length > 0) {
    return res[0];
  } else {
    // there is no editID, delay belongs to another user
    return '';
  };
};

class Delay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModalIsOpen: false,
      idDelete: 0,
    };

    this.render_chevron = this.render_chevron.bind(this);
    this.render_details = this.render_details.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this)
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this)
    this.handleCancelDelete = this.handleCancelDelete.bind(this)
  }

  showDeleteModal(id) {
    this.setState({
      deleteModalIsOpen: true,
      idDelete: id,
    })
  }

  handleConfirmDelete(e) {
    this.props.onDeleteDelay(this.state.idDelete);
    this.setState({
      deleteModalIsOpen: false,
      idDelete: 0,
    });
  }

  handleCancelDelete(e) {
    this.setState({
      deleteModalIsOpen: false,
      idDelete: 0,
    });
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

  render_details(id, editId, country, city, timestamp) {
    if (this.props.isOpen === true) {
      let row = "";
      if (editId === '') {
        row = (
          <Row>
            <Col span="24" className="w3-center">
              <ButtonGroup className="w3-bar" style={{width: "100%"}}>
                <Button
                  onClick={() => {this.props.onOnePlusDelay(id)}}
                  className="w3-yellow w3-button"
                  size="large"
                  style={{width: "100%"}}
                  icon="user-add">Yes, I am also affected</Button>
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
                  onClick={() => {this.showDeleteModal(editId)}} />
                <Button
                  className="w3-button"
                  size="large"
                  style={{width: "80%"}}
                  icon="edit"
                  onClick={() => {this.props.onEditDelay(editId)}}>Edit</Button>
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
      scheduled_departure,
      country,
      city,
      location,
      direction,
      delay_minutes,
      line,
      vehicle,
      plusOnes,
    } = this.props;

    const editId = editDelayId(this.props);

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
              {plusOnes.length + 1}
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
        <Modal
          title="Are you sure you want to delete this delay?"
          visible={this.state.deleteModalIsOpen}
          onOk={this.handleConfirmDelete}
          onCancel={this.handleCancelDelete}
          okText="Delete"
        >
        </Modal>
        {this.render_details(id, editId, country, city, scheduled_departure)}
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
  plusOnes: [],
}

Delay.propTypes = {
  isOpen: PropTypes.bool,
  sessionUser: PropTypes.string,
  id: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  country: PropTypes.string,
  city: PropTypes.string,
  scheduled_departure: PropTypes.instanceOf(Date),
  location: PropTypes.string,
  destination: PropTypes.string,
  delay_minutes: PropTypes.number,
  line: PropTypes.string,
  vehicle: PropTypes.number,
  plusOnes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  })),
  onOpenDelay: PropTypes.func,
  onEditDelay: PropTypes.func,
  onDeleteDelay: PropTypes.func,
  onOnePulsDelay: PropTypes.func,
}

export default Delay;
