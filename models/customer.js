const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  contact: {
    type: Number,
    match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
  },
});

const customerSchema = new Schema(
  {
    id: {
      type: Number,
      min: 1,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    contact: {
      type: String,
    },
    status: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
