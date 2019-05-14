import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import rootReducer from './redux/reducers'
import { createStore} from 'redux'
const store = createStore(
    rootReducer
)
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <LocaleProvider locale={zh_CN}>
        <Provider store={store}> 
            <Router>
                <App />
            </Router>
        </Provider>
    </LocaleProvider>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
