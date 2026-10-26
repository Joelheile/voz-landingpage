import { Agent } from "./components/Agent";
import { Core } from "./components/Core";
import { Download } from "./components/Download";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MakeItYours } from "./components/MakeItYours";
import { Problems } from "./components/Problems";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problems />
        <MakeItYours />
        <Agent />
        <Core />
        <Download />
      </main>
      <Footer />
    </>
  );
}
