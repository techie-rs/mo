import { combineReducers } from 'redux';
import abcCollegeReducer from '../client/abcCollege/reducer';

const rootReducer = combineReducers({
    abcCollege: abcCollegeReducer
});

export default rootReducer;
