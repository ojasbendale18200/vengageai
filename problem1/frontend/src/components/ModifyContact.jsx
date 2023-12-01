// ModifyContact.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact, modifyContact } from "../slices/contactSlice";

const ModifyContact = ({ contact, mode }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstname: contact ? contact.firstname : "",
    lastname: contact ? contact.lastname : "",
    mobile: contact ? contact.mobile : "",
  });

  const handleSave = () => {
    if (mode === "add") {
      dispatch(addContact(formData));
    } else if (mode === "modify" && contact) {
      dispatch(modifyContact({ id: contact._id, contactData: formData }));
    }
    // Additional handling for other modes or actions
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {mode === "add" ? "Add Contact" : "Modify Contact"}
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">First Name:</label>
        <input
          type="text"
          value={formData.firstname}
          onChange={(e) =>
            setFormData({ ...formData, firstname: e.target.value })
          }
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Last Name:</label>
        <input
          type="text"
          value={formData.lastname}
          onChange={(e) =>
            setFormData({ ...formData, lastname: e.target.value })
          }
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Mobile:</label>
        <input
          type="text"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          className="border p-2 w-full"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {mode === "add" ? "Add" : "Save"}
      </button>
    </div>
  );
};

export default ModifyContact;
