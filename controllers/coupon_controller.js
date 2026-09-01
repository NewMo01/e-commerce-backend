const jsend = require("jsend");
const AppFeatures = require("../helpers/features");
const Err = require("../helpers/app_error");
const Coupon = require("../models/coupon_model");

exports.createCoupon = async function (req, res) {
  const coupon = await Coupon.create(req.body);
  res.status(201).jsend.success(coupon);
};

exports.getCoupon = async function (req, res, next) {
  const { code } = req.params;

  const coupon = await Coupon.findOne({ code });
  //validate coupon-----------------------
  switch (true) {
    case !coupon:
      return next(Err.create("coupon not found", 404, true));

    case !coupon.isActive:
      return next(Err.create("coupon is not active", 400, true));

    case req.user.id !== coupon.userId.toString():
      return next(Err.create("coupon not available for that user", 400, true));

    case coupon.expireDate <= new Date():
      coupon.isActive = false;
      await coupon.save();
      return next(Err.create("coupon is expired", 400, true));
  }

  res.status(200).jsend.success(coupon);
};

exports.getListOfCoupons = async function (req, res) {
  const coupons = await new AppFeatures(Coupon, req.query)
    .filter()
    .sort()
    .paginate().mongoQuery;
  res.status(200).jsend.success(coupons);
};

exports.deleteCoupon = async function (req, res, next) {
  const { code } = req.params;
  const coupon = await Coupon.findOneAndDelete({ code });
  if (!coupon) {
    return next(Err.create("coupon not found", 404, true));
  }
  res.status(200).jsend.success("Coupon is deleted");
};
