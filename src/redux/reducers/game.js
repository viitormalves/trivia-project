import { SET_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
  count: 0,
};

function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_QUESTIONS:
    return { ...state, questions: action.payload };
  default:
    return state;
  }
}

export default game;
