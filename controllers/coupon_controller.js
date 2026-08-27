const jsend = require("jsend");
const AppFeatures = require("../helpers/features");
const errHandler = require('../helpers/err_handler')
const Coupon = require("../models/coupon_model");

exports.createCoupon = errHandler(async function (req, res) {
  const coupon = await Coupon.create(req.body);
  res.status(201).jsend.success(coupon);
})

exports.getCoupon = async function (req, res) {};

exports.getListOfCoupons = async function (req, res) {
  const coupons = await new AppFeatures(Coupon, req.query)
    .filter()
    .sort()
    .paginate().mongoQuery;
  res.status(200).jsend.success(coupons);
};

exports.deleteCoupon = async function (req, res) {};
