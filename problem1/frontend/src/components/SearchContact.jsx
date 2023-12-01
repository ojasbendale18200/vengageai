import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact, fetchContacts } from "../slices/contactSlice";
import AddContactModel from "./AddContactModel";

function SearchContact() {
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState("");
  const [isAddContactModalOpen, setAddContactModalOpen] = useState(false);
  const handleSearch = (e) => {
    setFirstname(e.target.value);
    dispatch(fetchContacts(firstname));
  };

  const handleAddContact = (newContactData) => {
    // dispatch(addContact(newContactData));
    console.log(newContactData);
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Search Contact</h2>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Enter firstname"
          value={firstname}
          onChange={handleSearch}
          className="border p-2 w-full"
        />

        <button
          className="  bg-blue-500 text-white p-2 rounded-full"
          onClick={() => setAddContactModalOpen(true)}
        >
          +
        </button>

        {isAddContactModalOpen && (
          <AddContactModel
            isOpen={isAddContactModalOpen}
            onClose={() => setAddContactModalOpen(false)}
            onAddContact={handleAddContact}
          />
        )}
      </div>
    </div>
  );
}

export default SearchContact;
