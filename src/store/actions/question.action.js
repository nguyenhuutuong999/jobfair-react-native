import * as ActionTypes from './ActionTypes';
import {getAllQuestionsRequest} from '@/services';

export const getAllQuestions = () => dispatch => {
  dispatch({type: ActionTypes.GET_ALL_QUESTIONS});
  return getAllQuestionsRequest()
    .then(res =>
      dispatch({
        type: ActionTypes.GET_ALL_QUESTIONS_SUCCESS,
        questions: res,
      }),
    )
    .catch(err =>
      dispatch({
        type: ActionTypes.GET_ALL_QUESTIONS_FAILED,
      }),
    );
};
