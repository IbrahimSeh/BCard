const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  middleName: {
    type: String,
    minlength: 2,
    maxlength: 256,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  phone: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 12,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 256,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  imageUrl: {
    type: String,
    minlength: 6,
    maxlength: 1024,
  },
  imageAlt: {
    type: String,
    minlength: 6,
    maxlength: 256,
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
  biz: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
