import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import BoardReducer from "./BoardReducer";

export default combineReducers({
    auth: AuthReducer,
    boardState: BoardReducer,
});