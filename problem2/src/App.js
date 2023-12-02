// src/App.js
import React, { useState } from "react";

import BookSlots from "./component/BookSlots";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <BookSlots />
    </div>
  );
};

export default App;
