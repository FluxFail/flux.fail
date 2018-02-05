import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FluxFail from './elements/FluxFail';
import { yellow600 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const fluxfailTheme = getMuiTheme({
  palette: {
    primary1Color: yellow600,
  },
});

const App = () => (
    <MuiThemeProvider muiTheme={fluxfailTheme}>
      <FluxFail />
    </MuiThemeProvider>
);

ReactDOM.render(<App/>, document.getElementById('app'));
