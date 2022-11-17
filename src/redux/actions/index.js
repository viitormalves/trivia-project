export const USER_LOGIN = 'USER_LOGIN';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const CLEAR_QUESTIONS = 'CLEAR_QUESTIONS';
export const ADD_SCORE = 'ADD_SCORE';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const CLEAR_SCORE = 'CLEAR_SCORE';
const qtdDefault = 5;

export const createUser = (name, gravatarEmail) => ({
  type: USER_LOGIN,
  name,
  gravatarEmail,
});

const setQuestions = (list) => ({
  type: SET_QUESTIONS,
  payload: list,
});

export const clearQuestions = () => ({
  type: CLEAR_QUESTIONS,
});

export const clearScore = () => ({
  type: CLEAR_SCORE,
});

export function fetchQuestions(token, qtd = qtdDefault) {
  return (dispatch) => fetch(`https://opentdb.com/api.php?amount=${qtd}&token=${token}`)
    .then((response) => response.json())
    .then((json) => dispatch(setQuestions(json)));
}

export const setScore = (score) => ({
  type: ADD_SCORE,
  score,
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});
