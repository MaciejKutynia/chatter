import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Nav from "components/Nav/Nav";
import Views from "views/Views";
import { authenticate } from "store/slices/Auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);
  return (
    <Router>
      <Nav />
      <Views />
    </Router>
  );
}

export default App;
