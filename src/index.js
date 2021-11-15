import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/bootstrap.min.css';
import './assets/css/tiny-slider.css';
import './assets/css/main.css';
import './assets/css/LineIcons.3.0.css';
import App from './App';
import { StateProvider } from './Context/StateProvider';
import reducer, { initialState } from './Context/reducer';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

