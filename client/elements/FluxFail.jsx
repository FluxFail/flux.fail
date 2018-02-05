import React from 'react';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DelayForm from './DelayForm';

const appBarStyle = {
  position: 'fixed',
  top: '0px',
};

const fabStyle = {
  position: 'fixed',
  right: '42px',
  bottom: '42px',
};

const FluxFail = () => (
  <div>
    <AppBar
      title="Flux.Fail"
      style={appBarStyle}
    />
    <main>
      <DelayForm />
    </main>
    <FloatingActionButton style={fabStyle}>
      <ContentAdd />
    </FloatingActionButton>
  </div>
);

export default FluxFail;
