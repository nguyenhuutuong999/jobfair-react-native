import * as ActionTypes from './ActionTypes';
import {submitRequest} from '@/services';
import Alert from '@/utils/alert';
import {Constants} from '@/commons';

export const submit = infor => dispatch => {
  dispatch({type: ActionTypes.SUBMIT_FORM, payload: infor});
};

export const logout = () => dispatch => {
  dispatch({type: ActionTypes.LOGOUT});
};
