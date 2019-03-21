import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom'
import { LocaleProvider } from 'antd';
import App from './App';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
const store = configureStore();
ReactDOM.render(
<LocaleProvider locale={zh_CN}>
    <Provider store={store}> 
        <Router>
            <App />
        </Router>
    </Provider>
</LocaleProvider>,
 document.getElementById('root'));
serviceWorker.unregister();
