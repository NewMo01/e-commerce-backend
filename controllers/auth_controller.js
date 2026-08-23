const jsend = require("jsend");
const cons = require("../helpers/constants");
const errHandler = require("../helpers/err_handler");
const MyError = require("../helpers/app_error");
const jwt = require("jsonwebtoken");
const redis = require("../config/redis");
const User = require("../models/user_model");

function generateTokens(user) {
  const accessToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "15m",
    },
  );
  const refreshToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    },
  );

  return { accessToken, refreshToken };
}

function storeRefreshToken(id, token) {
  redis.set(`refresh_token:${id}`, token, {
    ex: 7 * 24 * 60 * 60,
  });
}

function setCookie(res, accessToken, refreshToken) {
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.APP_MODE === cons.APP_PROD_MODE,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.APP_MODE === cons.APP_PROD_MODE,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

exports.signup = errHandler(async function (req, res, next) {
  const { email } = req.body;
  const olduser = await User.findOne({ email });
  if (olduser) {
    return next(MyError.create("User already exists", 400, true));
  }

  const user = await User.create(req.body);

  const { accessToken, refreshToken } = generateTokens(user);

  storeRefreshToken(user._id, refreshToken);

  setCookie(res, accessToken, refreshToken);

  res.status(201).jsend.success(user);
});

exports.login = errHandler(async function (req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(MyError.create("User not found, please signup", 400, true));
  } else if (!(await user.comparePass(password))) {
    return next(MyError.create("Wrong Password", 400, true));
  }

  const { accessToken, refreshToken } = generateTokens(user);

  storeRefreshToken(user._id, refreshToken);

  setCookie(res, accessToken, refreshToken);

  res.status(200).jsend.success(user);
});

exports.logout = errHandler(async function (req, res, next) {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);
    await redis.del(`refresh_token:${decoded.id}`);
  }

  res.clearCookie("access_token");
  res.clearCookie("refresh_token");

  res.status(200).jsend.success("Logged out Successfully!");
});

// this will refresh the access token
exports.updateAccessToken = errHandler(async function (req, res, next) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return next(MyError.create("No refresh token provided", 404, true));
  }
  const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);
  const dbRefreshToken = await redis.get(`refresh_token:${decoded.id}`);

  if (refreshToken !== dbRefreshToken) {
    return next(MyError.create("Invalid refresh token", 400, true));
  }

  const accessToken = jwt.sign(
    { id: decoded.id, email: decoded.email },
    process.env.SECRET_KEY,
    { expiresIn: "15m" },
  );

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.APP_MODE === cons.APP_PROD_MODE,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.status(200).jsend.success("Token refreshed successfully");
});
