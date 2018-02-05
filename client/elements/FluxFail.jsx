import React from 'react';
import Navigation from './Navigation';
import DelayList from './DelayList';
import Statistics from './Statistics';
import About from './About';
import Login from './Login';
import DelayForm from './DelayForm';
import { connect } from 'react-redux'
import * as actions from '../actions';

const FluxFail = (props) => {
  let currentView = null;
  let allowAddDelay = true;
  if (props.currentDelay.date) {
    currentView = <DelayForm
      onSaveDelay={props.onSaveDelay}
      onCancelDelay={props.onCancelDelay}
      {...props.currentDelay}
    />;
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
          allowAddDelay = false;
        } else {
          currentView = <DelayList
            delays={props.delays}
            onEditDelay={props.onEditDelay}
            onDeleteDelay={props.onDeleteDelay}
          />;
        }
    }
  }
  return (
    <div>
      <Navigation
        user={props.user}
        view={props.view}
        onNavigate={props.onNavigate}
        allowAddDelay={allowAddDelay}
        onAddDelay={props.onAddDelay}
      />
      <main>
        {currentView}
      </main>
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    onNavigate: (target) => {
      dispatch(actions.navigate(target));
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FluxFail);
