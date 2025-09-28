import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Report from "./pages/Report";
import Layout from "./pages/Layout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/report" element={<Report />} />
        </Route>
      </Routes>
    </Router>
  );
}
