import User from '../models/user';

export const signup = async (req, res, next) => {
  const credentioals = req.body;
  let user;

  try {
    user = await User.create(credentioals);
  } catch ({message}) {
    return next({
      status: 400,
      message
    });
  }

  res.json(user);


};

export const signin = async (req, res, next) => {
  const {login, password} = req.body;

  const user = await User.findOne({login});

  if (!user) {
    return next({
      status: 400,
      message: 'User not found'
    });
  }

  try {
    const result = await user.comparePasswords(password);

  } catch (e) {
    return next({
      status: 400,
      message: "Bad Credentials"
    });
  }

  req.session.userId = user._id;

  res.json(user);

};