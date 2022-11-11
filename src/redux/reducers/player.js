import { USER_LOGIN, ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: (state.score + action.score),
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
}

export default player;
