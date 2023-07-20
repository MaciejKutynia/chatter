import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Nav from "components/Nav/Nav";
import Views from "views/Views";

function App() {
  return (
    <Router>
      <Nav />
      <Views />
    </Router>
  );
}

export default App;
