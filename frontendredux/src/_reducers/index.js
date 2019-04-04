import { combineReducers } from 'redux';

import { testReducer } from './test.reducers';

const rootReducer = combineReducers({
    testReducer
});

export  default rootReducer