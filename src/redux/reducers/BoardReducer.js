import {
    SIGNUP_SUCCESS,
    DISC_MOVED
} from '../actions/types';

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
    console.log('board reducer',action);

    switch (action.type) {
        case DISC_MOVED:
            return state;
        default:
            return state;
    }
};