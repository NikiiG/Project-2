const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    id: {
      type: Number,
      min: 1,
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: 'Email address is required',
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
    ,
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    contact: {
      type: String,
      match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
    status: String,

  },{
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
