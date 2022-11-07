const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecommendationSchema = mongoose.Schema({
  location: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: [String],
});

const Recommendation = mongoose.model("Recommendation", RecommendationSchema);

module.exports = Recommendation;
