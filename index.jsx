import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './app/Root'
import configureStore from './store/configureStore'

import 'font-awesome/scss/font-awesome.scss'
import './assets/styles/bootstrap.scss'
import './assets/styles/app.scss'
import './node_modules/react-select/scss/default.scss'


const store = configureStore()

ReactDOM.render(
    <AppContainer>
        <Root store={store} ></Root>
    </AppContainer>,
  document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./app/Root', () => {
        const NextApp = require('./app/Root').default;
        ReactDOM.render(
            <AppContainer>
                <NextApp store={store} />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
