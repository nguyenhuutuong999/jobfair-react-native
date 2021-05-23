import * as userActions from './user.action';
import * as formActions from './form.action';
import * as questionActions from './question.action';

export const Actions = {
  ...formActions,
  ...userActions,
  ...questionActions,
};
