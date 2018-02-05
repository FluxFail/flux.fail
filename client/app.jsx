import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FluxFail from './elements/FluxFail';

const App = () => (
    <MuiThemeProvider>
      <FluxFail />
    </MuiThemeProvider>
);

ReactDOM.render(<App/>, document.getElementById('app'));
