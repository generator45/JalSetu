import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className="bg-gradient-to-b from-emerald-50 to-blue-50 min-h-screen scroll-smooth">
      <Navbar />
      <Outlet />
    </div>
  );
}
