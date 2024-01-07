import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Header"
import Hangman from "./Hangman/Hangman";
import {ToDoApp} from "./ToDo/ToDoApp"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Hangman />} />
        <Route path="/todo" element={<ToDoApp />} />
      </Routes>
    </Router>
  );
}

export default App;
