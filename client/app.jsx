import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FluxFail from './elements/FluxFail';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import fluxFailStore from './reducers/index';
import loggerMiddleware from './middleware/logger';

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

const initialState = {
  delays: [
    {
      city: 'Berlin',
      direction: 'Wittenau',
      line: 'U8',
      minutes: 3,
      date: new Date(),
    },
  ],
};

const store = createStore(fluxFailStore, initialState, applyMiddleware(loggerMiddleware));

const App = () => (
    <MuiThemeProvider muiTheme={fluxfailTheme}>
      <Provider store={store}>
        <FluxFail />
      </Provider>
    </MuiThemeProvider>
);

ReactDOM.render(<App/>, document.getElementById('app'));
