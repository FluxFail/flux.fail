import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FluxFail from './elements/FluxFail';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import fluxFailStore from './reducers/index';
import loggerMiddleware from './middleware/logger';
import delaysMiddleware from './middleware/delays';

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
  view: 'home',
  delays: [
    {
      type: 'subway',
      id: 'd52d4760-6fc3-4aec-b924-cb53242c55d4',
      city: 'Berlin',
      direction: 'Wittenau',
      line: 'U8',
      minutes: 3,
      date: new Date(),
    },
  ],
  user: {
    id: '820c6f09-8600-4406-a3a6-f822dc996fe4',
    email: 'user@domain.com',
  },
};

const store = createStore(fluxFailStore, initialState, applyMiddleware(loggerMiddleware, delaysMiddleware));

const App = () => (
    <MuiThemeProvider muiTheme={fluxfailTheme}>
      <Provider store={store}>
        <FluxFail />
      </Provider>
    </MuiThemeProvider>
);

ReactDOM.render(<App/>, document.getElementById('app'));
