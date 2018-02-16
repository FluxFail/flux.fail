import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FluxFail from './elements/FluxFail';
import fluxFailStore from './reducers/index';
import loggerMiddleware from './middleware/logger';
import delaysMiddleware from './middleware/delays';

const fluxfailTheme = getMuiTheme({
  palette: {
    primary1Color: '#1e88e5',
    primary2Color: '#6ab7ff',
    primary3Color: '#005cb2',
    pickerHeaderColor: '#1e88e5',
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

const middleware = applyMiddleware(loggerMiddleware, delaysMiddleware);
const store = createStore(fluxFailStore, initialState, middleware);

const App = () => (
  <MuiThemeProvider muiTheme={fluxfailTheme}>
    <Provider store={store}>
      <FluxFail />
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));
