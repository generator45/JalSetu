import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Awareness from "../components/Awareness";

export default function Home() {
  return (
    <div className="bg-blue-50/60 min-h-screen">
      <Navbar />
      <Hero />
      <Awareness />
    </div>
  );
}