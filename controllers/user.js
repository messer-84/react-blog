import * as UserService from '../services/UserServices';

export async function getCurrentUser(req, res, next) {
  const {token} = req;

  try {
    var user = await UserService.getUserByToken(token);
  } catch ({message}) {
    return next({
      status: 500,
      message
    });
  }

  return res.json(user);
}
