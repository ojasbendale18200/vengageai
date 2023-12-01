const express = require("express");
const { ContactModel } = require("../model/contact.model");
const ContactRouter = express.Router();

// Post Contact
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

// Get all contact
ContactRouter.get("/contact", async (req, res) => {
    try {
   
        const { firstname } = req.query;
        let query = {};
    
        if (firstname) {
          query = { firstname: new RegExp(firstname, 'i') };
        }
    
        const contacts = await ContactModel.find(query);
    
        res.status(200).json(contacts);
      } catch (error) {
        console.error("Error getting contacts:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
});

ContactRouter.get("/contact/:id", async (req, res) => {
    try {
      const contact = await ContactModel.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.status(200).json(contact);
    } catch (error) {
      console.error("Error getting contact:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  ContactRouter.patch("/contact/:id", async (req, res) => {
    try {
      const contact = await ContactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.status(200).json({ message: "Contact updated successfully", contact });
    } catch (error) {
      console.error("Error updating contact:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  ContactRouter.delete("/contact/:id", async (req, res) => {
    try {
      const contact = await ContactModel.findByIdAndDelete(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.status(200).json({ message: "Contact deleted successfully", contact });
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  

module.exports = { ContactRouter };
