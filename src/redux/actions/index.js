export const USER_LOGIN = 'USER_LOGIN';
export const SET_QUESTIONS = 'SET_QUESTIONS';
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

export function fetchQuestions(token, qtd = qtdDefault) {
  return (dispatch) => fetch(`https://opentdb.com/api.php?amount=${qtd}&token=${token}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return dispatch(setQuestions(json));
    });
}

// export function fetch() {
//   try {
//     return (dispatch) => fetch(`https://opentdb.com/api.php?amount=${qtd}&token=${token}`)
//       .then((response) => response.json())
//       .then((json) => {
//         if (json.response_code === 3) throw new Error();
//         return dispatch(setQuestions(json.results));
//       });
//   } catch (error) {
//     return
//   }
// }
