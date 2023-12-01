const express = require("express");
const { ContactModel } = require("../model/contact.model");
const ContactRouter = express.Router();

ContactRouter.post("/addcontact", async (req, res) => {
  try {
    const contact = new ContactModel(req.body);
    await contact.save();
    res.status(201).json({ message: "Contact created successfully", contact });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { ContactRouter };
