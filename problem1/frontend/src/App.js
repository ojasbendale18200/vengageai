import logo from "./logo.svg";
import "./App.css";
import ContactList from "./components/ContactList";
import SearchContact from "./components/SearchContact";
import ModifyContact from "./components/ModifyContact";

function App() {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
      <h1 className="text-3xl font-bold my-4">Contacts</h1>
      <div className="w-96 bg-white rounded-md shadow-md p-4 mb-4">
        <SearchContact />
      </div>
      <div className="w-96 bg-white rounded-md shadow-md p-4">
        <ContactList />
      </div>
    </div>
  );
}

export default App;
