import jwt from 'jsonwebtoken';

import config from '../config';

export default async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return next({
      status: 403,
      message: 'Forbiden. No Token!'
    });
  }

  try {
    var tokenObj = jwt.verify(token, config.secret);
  } catch ({message}) {
    return next({
      status: 400,
      message
    });
  }

  req.token = tokenObj;
  next();
}