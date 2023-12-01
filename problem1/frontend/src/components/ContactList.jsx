import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../slices/contactSlice";

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.data);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Contacts</h2>
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-white p-4 rounded-md shadow-md mb-4"
        >
          <div className="flex items-center mb-2">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold text-lg">
                {contact.firstname[0]}
              </span>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {contact.firstname} {contact.lastname}
              </p>
              <p className="text-gray-500">{contact.mobile}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactList;
