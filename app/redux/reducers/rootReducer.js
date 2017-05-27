import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import Reducers
import user from './User'

const appReducer = combineReducers({
    user,
    routing: routerReducer
});

const rootReducer = (state, action) => {
    switch(action.type) {
        default:
            return appReducer(state, action)
    }
}

export default rootReducer;
