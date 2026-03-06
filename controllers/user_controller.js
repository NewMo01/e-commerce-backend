const bcrypt = require("bcryptjs");
const AppError = require("../helpers/app_error");
const errorCatcher = require("../helpers/error_catcher");
const tokenGenerator = require("../helpers/token_generator");
const {pagination} = require('../helpers/find_queries')
const User = require("../models/user_model");

const registerUser = errorCatcher(async function (req, res, next) {
  const { username, email, password } = req.body;
  let oldUser
  if (req.query.type === "email") {
    // register with email
    oldUser = await User.findOne().or([{ email },{username}]);
  }else{
    oldUser = await User.findOne({ username })
  }
    if (oldUser) {
      return next(
        AppError.create("fail", 400, { message: "user already exists" }),
      );
    }
  
  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = await User.insertOne({ ...req.body, password: hashedPass });
  const token = tokenGenerator({ id: newUser._id ,role:newUser.role});
  res.status(201).jsend.success({ user: newUser, token });
});

const loginUser = errorCatcher(async function (req, res, next) {
  const { username, email, password } = req.body;

  let currentUser;

  if (req.query.type === "email") {
    //login with email
     currentUser = await User.findOne({ email });
  } else {
    //login with username
     currentUser = await User.findOne({ username });
  }

  if (!currentUser) {
    return next(AppError.create("fail", 400, { message: "user not found" }));
  }

  const isMatchPass = await bcrypt.compare(password, currentUser.password);
  if (!isMatchPass) {
    return next(AppError.create("fail", 400, { message: "invalid password" }));
  }

  const token = tokenGenerator({ id: currentUser._id ,role:currentUser.role});
  res.jsend.success({ user: currentUser, token });
});

const getUsers = async function(req,res,next){
  const paginating = pagination(req)
  const users = await User.find().skip(paginating.skip).limit(paginating.limit)
  res.jsend.success({users})
}

const updateUser = async function (req,res){
      await User.updateOne({_id:req.params.id},req.body)
      res.jsend.success({res:'Done!'})
}

const removeUser = async function (req,res){
    await User.deleteOne({_id:req.params.id})
    res.jsend.success({res:'Done!'})
    
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  removeUser
};
