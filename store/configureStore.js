import { createStore, applyMiddleware, compose} from "redux"
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from "../app/redux/reducers/rootReducer"
import { getState, saveState } from '../app/common/services/storage'
import throttle from 'lodash/throttle'

export default () => {
    /*eslint-disable no-process-env */
    const composedEnhancers = process.env.NODE_ENV === 'production' ? compose : (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
    const routingMiddleware = routerMiddleware(browserHistory);

    /*eslint-disable no-process-env*/
    const middleware = [
        thunk,
        routingMiddleware
    ];
    const persistedState = getState()

    const store = createStore(rootReducer, persistedState, composedEnhancers(
        applyMiddleware(...middleware)
    ));

    const filterSaveState = () => {
        const previousState = store.getState()
        const newState = Object.keys(previousState).reduce((result, eachState) => {
            if(eachState !== 'reports') {
                result[eachState] = previousState[eachState]
            }
            return result
        }, {})
        return newState
    }

    store.subscribe(throttle(() => {
      saveState(filterSaveState())
    }, 1000));

    return store;
}
