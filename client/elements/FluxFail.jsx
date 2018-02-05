import React from 'react';
import Navigation from './Navigation';
import DelayList from './DelayList';
import DelayForm from './DelayForm';
import { connect } from 'react-redux'
import * as actions from '../actions';

const FluxFail = (props) => {
  let delayForm = null;
  let delayList = null;
  let allowAddDelay = true;
  if (props.currentDelay.date) {
    delayForm = <DelayForm
      onSaveDelay={props.onSaveDelay}
      onCancelDelay={props.onCancelDelay}
      {...props.currentDelay}
    />;
    allowAddDelay = false;
  } else {
    delayList = <DelayList
      delays={props.delays}
      onEditDelay={props.onEditDelay}
      onDeleteDelay={props.onDeleteDelay}
    />;
  }
  return (
    <div>
      <Navigation
        allowAddDelay={allowAddDelay}
        onAddDelay={props.onAddDelay}
      />
      <main>
        {delayList}
        {delayForm}
      </main>
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
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
