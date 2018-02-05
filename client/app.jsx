import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FluxFail from './elements/FluxFail';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const fluxfailTheme = getMuiTheme({
  palette: {
    primary1Color: '#fdd835',
    primary2Color: '#ffff6b',
    primary3Color: '#c6a700',
    pickerHeaderColor: '#fdd835',
    accent1Color: '#78909c',
    accent2Color: '#a7c0cd',
    accent3Color: '#4b636e',
    textColor: '#000000',
    alternateTextColor: '#000000',
  },
});

const App = () => (
    <MuiThemeProvider muiTheme={fluxfailTheme}>
      <FluxFail />
    </MuiThemeProvider>
);

ReactDOM.render(<App/>, document.getElementById('app'));
