// contactSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios_create from "../utils/axios_instace";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (firstname) => {
    let url = "/contact";

    if (firstname) {
      url += `?firstname=${firstname}`;
    }
    const response = await axios_create.get(url);
    return response.data;
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contactData) => {
    const response = await axios_create.post("/addcontact", contactData);
    return response.data.contact;
  }
);

export const modifyContact = createAsyncThunk(
  "contacts/modifyContact",
  async ({ id, contactData }) => {
    console.log(id, contactData);
    // const response = await axios_create.patch(`/contact/${id}`, contactData);
    // console.log(response);
  }
);

const contactSlice = createSlice({
  name: "contacts",
  initialState: { data: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.data = action.payload;
      })

      .addCase(addContact.fulfilled, (state, action) => {
        state.data = [...state.data, action.payload];
      })
      .addCase(modifyContact.fulfilled, (state, action) => {
        state.data = state.data.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        );
      });
  },
});

export default contactSlice.reducer;
