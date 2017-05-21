import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import Reducers
import rankings from './Rankings'

const appReducer = combineReducers({
    rankings,
    routing: routerReducer
});

const rootReducer = (state, action) => {
    switch(action.type) {
        default:
            return appReducer(state, action)
    }
}

export default rootReducer;
