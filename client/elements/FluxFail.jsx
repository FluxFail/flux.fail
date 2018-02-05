import React from 'react';
import Navigation from './Navigation';
import DelayForm from './DelayForm';
import { connect } from 'react-redux'
import { addDelay, saveDelay, cancelDelay } from '../actions';

const FluxFail = (props) => {
  let delayForm = null;
  let allowAddDelay = true;
  if (props.currentDelay.date) {
    delayForm = <DelayForm
      onSaveDelay={props.onSaveDelay}
      onCancelDelay={props.onCancelDelay}
      {...props.currentDelay}
    />;
    allowAddDelay = false;
  }
  return (
    <div>
      <Navigation
        allowAddDelay={allowAddDelay}
        onAddDelay={props.onAddDelay}
      />
      <main>
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
      dispatch(addDelay());
    },
    onSaveDelay: (props) => {
      dispatch(saveDelay(props));
    },
    onCancelDelay: () => {
      dispatch(cancelDelay());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FluxFail);
