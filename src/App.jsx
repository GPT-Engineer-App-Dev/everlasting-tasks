import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import Index from "./pages/Index.jsx";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;