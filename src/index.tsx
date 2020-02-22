import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import { App } from './app/app';
import { configureStore } from './store/store';
import './styles/index.css';

const store = configureStore();
const rootElement = document.getElementById('root');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
