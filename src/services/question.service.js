import {Api} from '@/commons';
import axios from 'axios';

export const getAllQuestionsRequest = () => {
  return axios
    .get(`${Api.apiUrl}questions`)
    .then(res => res.data)
    .catch(err => new Error(err));
};
