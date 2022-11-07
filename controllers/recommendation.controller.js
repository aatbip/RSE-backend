const Recommendation = require("../model/Recommendation");
const Hotels = require("../model/Hotels");
const { success, failure } = require("../utils/response");

function findRecommended(array) {
  if (array.length == 0) return null;
  var modeMap = {};
  var maxEl = array[0],
    maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}

const addRecommendation = async (req, res) => {
  const { location, price } = req.body;

  const id = req.user.id;
  const isRecommendation = await Recommendation.find({ user: id });

  if (isRecommendation.length <= 0) {
    let _recommendation = new Recommendation({
      location,
      price,
      user: id,
    });

    await _recommendation.save();

    return res.status(200).json(success(_recommendation));
  } else if (isRecommendation) {
    await Recommendation.updateMany(
      { user: id },
      { $push: { location: location, price: price } }
    );

    return res.status(200).json(success("Updated"));
  }
};

const getRecommendedByLocation = async (req, res) => {
  const id = req.user.id;
  let query = {};

  const recommendation = await Recommendation.findOne({ user: id });

  let { location } = recommendation;

  location = findRecommended(location);

  if (location) {
    query.$or = [{ location: { $regex: location, $options: "i" } }];
  }

  let hotels = await Hotels.find(query);

  return res.status(200).json(success(hotels));
};

const getRecommendedByPrice = async (req, res) => {
  const id = req.user.id;

  const recommendation = await Recommendation.findOne({ user: id });

  if (recommendation === null)
    return res.status(401).json(failure("No hotels found!"));
  let { price } = recommendation;
  let maxPrice = findRecommended(price);
  maxPrice = parseInt(maxPrice) + 500;
  let minPrice = Math.min(...price);

  let hotels = await Hotels.find({
    price: { $gte: minPrice, $lte: maxPrice },
  });

  return res.status(200).json(success(hotels));
};

module.exports = {
  addRecommendation,
  getRecommendedByLocation,
  getRecommendedByPrice,
};
