const { Schema, model } = require("mongoose");

const emailRegexp = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       match: emailRegexp,
//       unique: true,
//       required: true,
//     },
//     password: {
//       type: String,
//       minlength: 6,
//       required: true,
//     },
//   },
//   { versionKey: false, timestamps: true }
// );

const User = model("User", userSchema);

module.exports = { User };
