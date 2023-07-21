const Role = require("../models/role");

module.exports = {
  index,
  create,
};

async function index(req, res) {
  try {
    const roles = await Role.find({});

    res.render("roles/index", {
      roles,
      errorMsg: "",
    });
  } catch (err) {
    console.log(err);
  }
}

async function create(req, res) {
  try {
    await Role.create(req.body);
    res.redirect("/roles");
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render("roles", {
      errorMsg: err.message,
    });
  }
}
