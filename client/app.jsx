import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import 'antd/dist/antd.css';
import 'whatwg-fetch';
import FluxFail from './elements/FluxFail';
import fluxFailStore from './reducers/index';
import loggerMiddleware from './middleware/logger';
import userMiddleware from './middleware/user';
import delaysMiddleware from './middleware/delays';

const fluxfailTheme = getMuiTheme({
  palette: {
    primary: {
      main: '#4dd7fa',
    },
    secondary: {
      main: '#444444',
    },
    text: {
      default: '#444444',
    },
    /*primary1Color: '#1e88e5',
    primary2Color: '#6ab7ff',
    primary3Color: '#005cb2',
    pickerHeaderColor: '#1e88e5',
    accent1Color: '#78909c',
    accent2Color: '#a7c0cd',
    accent3Color: '#4b636e',
    textColor: '#000000',
    alternateTextColor: '#000000',*/
  },
});

const initialState = {};

const middleware = applyMiddleware(loggerMiddleware, userMiddleware, delaysMiddleware);
const store = createStore(
  fluxFailStore,
  initialState,
  middleware,
);

const App = () => (
  <MuiThemeProvider muiTheme={fluxfailTheme}>
    <Provider store={store}>
      <FluxFail />
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));
