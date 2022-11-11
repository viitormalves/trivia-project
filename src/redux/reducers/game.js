import { NEXT_QUESTION, SET_QUESTIONS } from '../actions';

const error = 0;

const INITIAL_STATE = {
  questions: [],
  count: 0,
  valid: true,
};

function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case NEXT_QUESTION:
    return { ...state, count: state.count + 1 };
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
