import reportWebVitals from './reportWebVitals';
import React from "react";
import ReactDOM from 'react-dom';
import App from './App';
import store from "./Redux/ReduxStore"
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';

    ReactDOM.render(
           <BrowserRouter>
              <Provider store={store}>
                <App />
              </Provider>
            </BrowserRouter>,
        document.getElementById('root')
      );

reportWebVitals();
