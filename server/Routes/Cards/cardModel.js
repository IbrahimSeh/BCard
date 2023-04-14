const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  subTitle: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  state: {
    type: String,
    minlength: 2,
    maxlength: 255,
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  street: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  houseNumber: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 256,
  },
  zipCode: {
    type: Number,
    minlength: 1,
    maxlength: 256,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 14,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  web: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  image: {
    url: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 1024,
    },
    alt: { type: String, required: true, minlength: 2, maxlength: 256 },
  },
  bizNumber: {
    type: String,
    minlength: 7,
    maxlength: 7,
    required: true,
  },
  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Card = mongoose.model("card", cardSchema);

exports.Card = Card;
