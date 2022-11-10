import { SET_QUESTIONS } from '../actions';

const error = 0;

const INITIAL_STATE = {
  questions: [],
  count: 0,
  valid: true,
};

function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_QUESTIONS:
    return { ...state,
      questions: action.payload.results,
      valid: (action.payload.response_code === error),
    };
  default:
    return state;
  }
}

export default game;
