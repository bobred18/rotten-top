// CSS
import './index.css';

// Redux
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux'
import rootReducer from './redux/reducers';

// React
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import App from './App';

const store = createStore(
  rootReducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);