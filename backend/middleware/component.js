/* eslint-disable linebreak-style */
// validationMiddleware.js

const responseUtil=require("../utils/component");

exports.validateComponent = (req, res, next) => {
  const {content} = req.body;

  if (!content || typeof content !== "string") {
    return responseUtil.error(res, 400,
        "Content is required and must be a string");
  }

  next();
};
