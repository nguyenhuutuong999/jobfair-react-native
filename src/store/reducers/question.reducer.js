import * as ActionTypes from '../actions/ActionTypes';

export const defaultState = {
  loading: false,
  success: false,
  questions: [],
};

export default function questionReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.GET_ALL_QUESTIONS:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case ActionTypes.GET_ALL_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        questions: action.questions,
      };
    case ActionTypes.GET_ALL_QUESTIONS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
}
