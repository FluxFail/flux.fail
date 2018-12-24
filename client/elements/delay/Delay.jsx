import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Timeline, Icon, Button, Modal } from 'antd';
import { VehicleIcon } from '../icons/VehicleIcon';

const ButtonGroup = Button.Group;

function editDelayId(id, sessionUser, user, plusOnes) {
  if (user === sessionUser) {
    return id;
  }
  const res = plusOnes.filter(plusOne => plusOne.user === sessionUser);
  if (res.length > 0) {
    return res[0].id;
  }
  // there is no editID, delay belongs to another user
  return null;
}

class Delay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModalIsOpen: false,
      idDelete: '',
    };

    this.renderChevron = this.renderChevron.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
  }

  showDeleteModal(id) {
    this.setState({
      deleteModalIsOpen: true,
      idDelete: id,
    });
  }

  handleConfirmDelete() {
    this.props.onDeleteDelay(this.state.idDelete);
    this.setState({
      deleteModalIsOpen: false,
      idDelete: '',
    });
  }

  handleCancelDelete() {
    this.setState({
      deleteModalIsOpen: false,
      idDelete: '',
    });
  }

  renderChevron() {
    if (!this.props.isOpen) {
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

  renderDetails(id, editId, country, city, timestamp) {
    if (this.props.isOpen === true) {
      let row = '';
      if (!editId) {
        row = (
          <Row>
            <Col span="24" className="w3-center">
              <ButtonGroup className="w3-bar" style={{ width: '100%' }}>
                <Button
                  onClick={() => { this.props.onOnePlusDelay(id); }}
                  className="w3-yellow w3-button"
                  size="large"
                  style={{ width: '100%' }}
                  icon="user-add"
                  type="primary"
                >
                    Yes, me too!
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        );
      } else {
        row = (
          <Row>
            <Col span="24" className="w3-center">
              <ButtonGroup className="w3-bar" style={{ width: '100%' }}>
                <Button
                  className="w3-button w3-red"
                  size="large"
                  style={{ width: '20%' }}
                  icon="delete"
                  onClick={() => { this.showDeleteModal(editId); }}
                />
                <Button
                  className="w3-button"
                  size="large"
                  style={{ width: '80%' }}
                  icon="edit"
                  onClick={() => { this.props.onEditDelay(editId); }}
                >
                  Edit
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        );
      }

      return (
        <div>
          <Row className="w3-padding">
            <Col span="12" className="w3-left-align">
              {country}{(!country === '') ? ' / ' : ''}<br />
              {city}<br />
              <small>
                <i>
                  {(this.props.location === null || this.props.location === '') ? '' : '(ab '.concat(this.props.location).concat(')')}
                </i>
              </small>
            </Col>
            <Col span="12" className="w3-right-align">
              {timestamp.toLocaleDateString()}<br />
              {timestamp.toLocaleTimeString()}
            </Col>
          </Row>
          {row}
        </div>
      );
    }
    return (<div />);
  }

  render() {
    const {
      sessionUser,
      id,
      user,
      scheduled_departure,
      country,
      city,
      vehicle,
      location,
      line,
      direction,
      delay_minutes,
      plusOnes,
    } = this.props;

    const editId = editDelayId(id, sessionUser, user, plusOnes);

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
              <Icon type="arrow-right" />&nbsp;
              {direction}
            </span>
            <br />
            <span className={(delay_minutes === 0) ? 'w3-text-green' : 'w3-text-red'}>
              <Icon type="clock-circle" size="small" />&nbsp;
              {delay_minutes}min
            </span>
            <div>
            </div>
          </Col>
          <Col span="3" className="w3-center">
            <br /><br />
            {this.renderChevron(country, city, scheduled_departure)}
          </Col>
        </Row>
        <Modal
          title="Are you sure you want to delete this delay?"
          visible={this.state.deleteModalIsOpen}
          onOk={this.handleConfirmDelete}
          onCancel={this.handleCancelDelete}
          okText="Delete"
        />
        {this.renderDetails(id, editId, country, city, scheduled_departure)}
      </div>
    );
  }
}

Delay.defaultProps = {
  sessionUser: '',
  isOpen: false,
  scheduled_departure: new Date(),
  country: '',
  city: '',
  vehicle: 0,
  line: '',
  direction: '',
  delay_minutes: 3,
  location: '',
  plusOnes: [],
};

Delay.propTypes = {
  isOpen: PropTypes.bool,
  sessionUser: PropTypes.string,
  id: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  scheduled_departure: PropTypes.instanceOf(Date),
  country: PropTypes.string,
  city: PropTypes.string,
  vehicle: PropTypes.number,
  location: PropTypes.string,
  line: PropTypes.string,
  direction: PropTypes.string,
  delay_minutes: PropTypes.number,
  plusOnes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  })),
  onOpenDelay: PropTypes.func.isRequired,
  onEditDelay: PropTypes.func.isRequired,
  onDeleteDelay: PropTypes.func.isRequired,
  onOnePlusDelay: PropTypes.func.isRequired,
};

export default Delay;
