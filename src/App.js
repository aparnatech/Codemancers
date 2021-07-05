import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Route path="/" component={SearchBar} exact></Route>
      </main>
    </Router>
  );
}

export default App;
