const createHttpError = require("http-errors");
const Validators = require("../utils/validators");

module.exports = function (validator) {
  // if (!Validators.in(validator)) {
  //   throw new Error(`'${validator}' validator doesn't exist.`);
  // }

  return async function (req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      console.log(err);
      if (err.isJoi) {
        return next(createHttpError(422, { message: err.message }));
      } else {
        next(createHttpError(500));
      }
    }
  };
};
