import * as ActionTypes from '../actions/ActionTypes';
export const defaultState = {
  login: {
    status: '',
    result: null,
    error: null,
    requesting: false,
  },
};

export default function userReducers(state = defaultState, action) {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST': {
      return {
        ...state,
        login: {
          ...state.login,
          requesting: true,
          error: null,
          result: null,
          status: '',
        },
      };
    }
    case 'USER_LOGIN_SUCCESS': {
      return {
        ...state,
        login: {
          ...state.login,
          result: action.data,
          requesting: false,
          status: 'success',
        },
      };
    }
    case 'USER_LOGIN_FAIL': {
      return {
        ...state,
        login: {
          ...state.login,
          error: action.message,
          requesting: false,
          status: 'error',
        },
      };
    }
    case 'USER_LOGOUT_REQUEST': {
      return {
        ...state,
        login: {
          ...state.login,
          requesting: true,
          error: null,
          status: '',
        },
      };
    }
    case 'USER_LOGOUT_SUCCESS': {
      return {
        ...state,
        login: {
          ...state.login,
          result: null,
          requesting: false,
          status: 'success',
        },
      };
    }
    case 'USER_LOGOUT_FAIL': {
      return {
        ...state,
        login: {
          ...state.login,
          error: action.message,
          requesting: false,
          status: 'error',
        },
      };
    }

    default:
      return state;
  }
}
