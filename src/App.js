import Contatcs from "./pages/Contacts/Contacts";
import { Route, Routes } from "react-router-dom";
import ContactDetails from "./pages/Contacts/ContactDetails";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*">
          <Route index element={<Contatcs />} />
          <Route path="contacts/:id" element={<ContactDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
