import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import DelayList from './new/DelayList';
import Statistics from './Statistics';
import About from './About';
import Login from './Login';
import DelayForm from './new/DelayForm';
import * as actions from '../actions';

class FluxFail extends React.Component {
  componentDidMount() {
    this.props.onInitialize();
  }

  render() {
    let currentView = null;
    let allowAddDelay = true;
    if (!this.props.user.token) {
      allowAddDelay = false;
    }
    if (this.props.delays.status !== 'ok') {
      allowAddDelay = false;
    }
    if (this.props.delays.current && this.props.delays.current.scheduled_departure) {
      currentView = (
        <DelayForm
          user={this.props.user.id}
          onSaveDelay={this.props.onSaveDelay}
          onCancelDelay={this.props.onCancelDelay}
          {...this.props.delays.current}
        />
      );
      allowAddDelay = false;
    } else {
      switch (this.props.view) {
        case 'stats':
          currentView = <Statistics />;
          break;
        case 'about':
          currentView = <About />;
          break;
        default:
          if (!this.props.user.token) {
            currentView = (
              <Login
                status={this.props.user.status}
                message={this.props.user.message}
                onLogin={this.props.onLogin}
                user={this.props.user}
              />
            );
          } else {
            currentView = (
              <DelayList
                status={this.props.delays.status}
                listConfig={this.props.delays.listConfig}
                user={this.props.user}
                delays={this.props.delays.reported}
                onEditDelay={this.props.onEditDelay}
                onDeleteDelay={this.props.onDeleteDelay}
                onAddDelay={this.props.onAddDelay}
                onListDelays={this.props.onListDelays}
                onOnePlusDelay={this.props.onOnePlusDelay}
              />
            );
          }
      }
    }
    return (
      <div>
        <Navigation
          user={this.props.user}
          view={this.props.view}
          onNavigate={this.props.onNavigate}
          onLogout={this.props.onLogout}
        />
        <main>
          {currentView}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  onNavigate: (target) => {
    dispatch(actions.navigate(target));
  },
  onLogin: (email) => {
    dispatch(actions.userRegister(email));
  },
  onLogout: () => {
    dispatch(actions.userLogout());
  },
  onAddDelay: () => {
    dispatch(actions.addDelay());
  },
  onSaveDelay: (props) => {
    dispatch(actions.saveDelay(props));
  },
  onCancelDelay: () => {
    dispatch(actions.cancelDelay());
  },
  onEditDelay: (id) => {
    dispatch(actions.editDelay(id));
  },
  onDeleteDelay: (id) => {
    dispatch(actions.deleteDelay(id));
  },
  onInitialize: () => {
    dispatch(actions.initialize());
  },
  onListDelays: (all) => {
    dispatch(actions.listDelays(all));
  },
  onOnePlusDelay: (id) => {
    dispatch(actions.onePlusDelay(id));
  },
});

FluxFail.defaultProps = {
  delays: {
    status: 'ok',
    listConfig: {
      all: false,
    },
    current: null,
    reported: [],
  },
  user: {},
  view: 'home',
};

FluxFail.propTypes = {
  delays: PropTypes.shape({
    status: PropTypes.string,
    listConfig: PropTypes.shape({
      all: PropTypes.bool,
    }),
    current: PropTypes.shape({
      id: PropTypes.string,
      scheduled_departure: PropTypes.instanceOf(Date),
    }),
    reported: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      scheduled_departure: PropTypes.instanceOf(Date),
    })),
  }),
  onAddDelay: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onEditDelay: PropTypes.func.isRequired,
  onDeleteDelay: PropTypes.func.isRequired,
  onSaveDelay: PropTypes.func.isRequired,
  onCancelDelay: PropTypes.func.isRequired,
  onInitialize: PropTypes.func.isRequired,
  onOnePlusDelay: PropTypes.func.isRequired,
  user: PropTypes.shape({
    status: PropTypes.string,
    message: PropTypes.string,
    token: PropTypes.string,
    id: PropTypes.string,
  }),
  view: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(FluxFail);
