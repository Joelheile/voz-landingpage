import { Core } from "./components/Core";
import { Download } from "./components/Download";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MakeItYours } from "./components/MakeItYours";
import { Privacy } from "./components/Privacy";
import { Problems } from "./components/Problems";
import { Solutions } from "./components/Solutions";
import { Speed } from "./components/Speed";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problems />
        <Solutions />
        <Speed />
        <Core />
        <Privacy />
        <MakeItYours />
        <Download />
      </main>
      <Footer />
    </>
  );
}
