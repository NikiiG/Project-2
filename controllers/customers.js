const Customer = require("../models/customer");
const Address = require("../models/address");
const Role = require("../models/role");

module.exports = {
  index,
  new: newUser,
  create,
  delete: deleteCustomer,
  edit,
  update,
};

//retrieve and return all customers/retrieve and return a single customer
async function index(req, res) {
  console.log("index");
  try {
    const usersData = await Customer.find({})
      .populate("address")
      .populate("role")
      .sort("name");
    res.render("customers/index", { users: usersData });
  } catch (error) {
    console.log(error.message || "error occured");
  }
}

async function newUser(req, res) {
  console.log("new");
  const roles = await Role.find({});
  res.render("customers/add", { roles });
}

//create a new user and save
async function create(req, res) {
  console.log("create");
  try {
    const user = new Customer({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      status: req.body.status,
      role: req.body.role,
      contact: req.body.contact,
    });
    const address = new Address({
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
    });
    addressObj = await Address.create(address);
    user.address = addressObj;

    await user.save();
    res.redirect("/customers");
  } catch (error) {
    console.log(error.message);
  }
}

//delete a user with specified user id in the request
async function deleteCustomer(req, res) {
  const customer = await Customer.findOne({ _id: req.params.id });
  await Customer.deleteOne(customer);
  res.redirect(`/customers`);
}

async function edit(req, res) {
  const customer = await Customer.findOne({ _id: req.params.id })
    .populate("address")
    .populate("role");
  const roles = await Role.find({});
  res.render("customers/edit", { customer: customer, roles });
}

//update a new identified user by user id
async function update(req, res) {
  try {
    
    const updateUser = await Customer.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.redirect(`/customers`);
  } catch (error) {
    console.log(error.message);
  }
}
