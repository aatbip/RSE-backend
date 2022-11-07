const Ratings = require("../model/Rating");
const { success } = require("../utils/response");

const addRating = async (req, res) => {
  const { hotel, rating, review } = req.body;

  let _rating = new Ratings({
    username: req.user.username,
    hotel,
    rating,
    review,
  });

  await _rating.save();

  return res.status(200).json(success(_rating));
};

const getRatingsByProduct = async (req, res) => {
  const { id } = req.params;

  const ratings = await Ratings.find({ hotel: id });

  return res.status(200).json(success(ratings));
};

module.exports = {
  addRating,
  getRatingsByProduct
};
