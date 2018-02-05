import React from 'react';
import Navigation from './Navigation';
import DelayForm from './DelayForm';
import { connect } from 'react-redux'
import { addDelay } from '../actions';

const FluxFail = ({ currentDelay, onAddDelay }) => {
  let delayForm = null;
  let allowAddDelay = true;
  if (currentDelay.date) {
    delayForm = <DelayForm {...currentDelay} />;
    allowAddDelay = false;
  }
  return (
    <div>
      <Navigation
        allowAddDelay={allowAddDelay}
        onAddDelay={onAddDelay}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FluxFail);
