import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Awareness from "./components/Awareness";

export default function App() {
  return (
    <div className="bg-blue-50/60 min-h-screen">
      <Navbar />
      <Hero />
      <Awareness />
    </div>
  );
}
