const jsend = require("jsend");
const Err = require("../helpers/app_error");
const stripe = require("../config/stripe");
const Coupon = require("../models/coupon_model");

exports.createCheckoutSession = async (req, res, next) => {
  //products -> [{title description price previewImg _id quantity}]
  const { products, couponCode } = req.body;

  const lineItems = products.map((p) => {
    return {
      price_data: {
        currency: "usd",
        product_data: { name: p.title, images: [p.previewImg] },
        unit_amount: Math.round(p.price * 100), // Convert to cents
      },
      quantity: p.quantity || 1,
    };
  });

  const coupon = couponCode ? req.coupon : null;

  const session = await stripe.checkout.sessions.create({
    currency: "usd",
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    metadata: {
      userId: req.user.id,
      couponCode: couponCode || "",
      products: JSON.stringify(
        products.map((p) => {
          return { id: p._id, price: p.price, quantity: p.quantity };
        }),
      ),
    },
    discounts: coupon
      ? [{ coupon: await createCoupon(coupon.discountPercentage) }]
      : [],
    success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  const {
    id,
    url,
    amount_total,
    payment_method_types,
    payment_status,
    mode,
    currency,
  } = session;

  res.status(200).jsend.success({
    id,
    url,
    amount_total: amount_total / 100,
    payment_method_types,
    payment_status,
    mode,
    currency,
  });
};

exports.checkoutSuccess = async (req, res) => {};

async function createCoupon(amount) {
  const c = await stripe.coupons.create({
    percent_off: amount,
    duration: "once",
  });
  return c.id;
}
