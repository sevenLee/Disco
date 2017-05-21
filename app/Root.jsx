import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import Routes from './Routes'

class Root extends Component {
    render() {
        const { store } = this.props
        const history = syncHistoryWithStore(browserHistory, store)

        // Fixes `react-router` bug by forcing
        // `<Route/>` `component` remount on any URL change.
        // https://github.com/ReactTraining/react-router/issues/1982

        return (
            <Provider store={store}>
                <Router
                    history={history}
                    routes={Routes}
                    createElement = { (component, props) => {
                        const { location } = props
                        const key = `${location.pathname}${location.search}`
                        props = { ...props, key }
                        return React.createElement(component, props)
                    }}
                />
            </Provider>
        )
    }
}

export default Root