const mongoose = require("mongoose");
const { Schema } = mongoose;

const RatingSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotels",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const Ratings = mongoose.model("Ratings", RatingSchema);

module.exports = Ratings;
