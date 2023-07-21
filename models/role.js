const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const roleSchema = new Schema ({
  role: {
    type: String,
    required:true
  },
  description: {
    type: String
  },

})

module.exports = mongoose.model("Role", roleSchema);
