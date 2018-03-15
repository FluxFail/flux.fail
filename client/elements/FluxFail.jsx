import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import DelayList from './DelayList';
import Statistics from './Statistics';
import About from './About';
import Login from './Login';
import DelayForm from './DelayForm';
import * as actions from '../actions';

const FluxFail = (props) => {
  let currentView = null;
  let allowAddDelay = true;
  if (!props.user.id) {
    allowAddDelay = false;
  }
  if (props.delays.current.date) {
    currentView = (
      <DelayForm
        onSaveDelay={props.onSaveDelay}
        onCancelDelay={props.onCancelDelay}
        {...props.delays.current}
      />
    );
    allowAddDelay = false;
  } else {
    switch (props.view) {
      case 'stats':
        currentView = <Statistics />;
        break;
      case 'about':
        currentView = <About />;
        break;
      default:
        if (!props.user.id) {
          currentView = <Login />;
        } else {
          currentView = (
            <DelayList
              delays={props.delays.reported}
              status={props.delays.status}
              onEditDelay={props.onEditDelay}
              onDeleteDelay={props.onDeleteDelay}
            />
          );
        }
    }
  }
  return (
    <div>
      <Navigation
        user={props.user}
        view={props.view}
        onNavigate={props.onNavigate}
        onLogout={props.onLogout}
        allowAddDelay={allowAddDelay}
        onAddDelay={props.onAddDelay}
      />
      <main>
        {currentView}
      </main>
    </div>
  );
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  onNavigate: (target) => {
    dispatch(actions.navigate(target));
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
});

FluxFail.defaultProps = {
  allowAddDelay: false,
  delays: {
    status: 'ok',
    current: null,
    reported: [],
  },
  user: {},
  view: 'home',
};

FluxFail.propTypes = {
  allowAddDelay: PropTypes.bool,
  delays: PropTypes.shape({
    status: PropTypes.string,
    current: PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.instanceOf(Date),
    }),
    reported: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.instanceOf(Date),
    })),
  }),
  onAddDelay: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onEditDelay: PropTypes.func.isRequired,
  onDeleteDelay: PropTypes.func.isRequired,
  onSaveDelay: PropTypes.func.isRequired,
  onCancelDelay: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
  }),
  view: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(FluxFail);
