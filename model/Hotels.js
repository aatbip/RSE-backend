const mongoose = require("mongoose");
const { Schema } = mongoose;

const HotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  images: [String],
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Hotels = mongoose.model("Hotels", HotelSchema);

module.exports = Hotels;
