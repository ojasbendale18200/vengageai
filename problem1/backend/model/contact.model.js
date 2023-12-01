const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
});

const ContactModel = mongoose.model("Contact", contactSchema);

module.exports = { ContactModel };
