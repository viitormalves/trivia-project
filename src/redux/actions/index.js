export const USER_LOGIN = 'USER_LOGIN';
export const createUser = (name, gravatarEmail) => ({
  type: USER_LOGIN,
  name,
  gravatarEmail,
});
