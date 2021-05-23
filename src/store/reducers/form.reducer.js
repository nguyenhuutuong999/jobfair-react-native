import * as ActionTypes from '../actions/ActionTypes';
export const defaultState = {
    data: null,
};

export default function formReducers(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.SUBMIT_FORM:
      return {
        ...state,
       data: action.payload
      };
    default:
      return state;
  }
}
