const User = require("../model/User");
const { success, failure } = require("../utils/response");

const registration = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;

    if (!email || !username || !password) {
      return res.status(401).json(failure("Please enter all credentials!"));
    }

    let checkUserByEmail = await User.findOne({ email: email });
    let checkUserByUsername = await User.findOne({ username: username });

    if (checkUserByEmail || checkUserByUsername) {
      return res.status(401).json(failure("Username or Email already exist"));
    }

    let user = await User.create({
      email,
      username,
      password,
      role,
    });

    return res.status(200).json(
      success({
        status: "Registration Succesfull!",
        data: user,
      })
    );
  } catch (e) {
    console.log(e);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json(failure("Please enter your credentials"));
    }

    let user = await User.findOne({ username: username });
    if (!user) {
      res.status(400).json(failure("Please enter a valid username"));
    }

    if (user) {
      let isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(400).json(failure("Username or Password Invalid"));
      } else if (isMatch) {
        req.user = user;
        let token = await user.createJWT();
        res
          .status(200)
          .json(success({ message: "Login Successful!", token: token }));
        next();
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  registration,
  signIn,
};
