import { Agent } from "./components/Agent";
import { Core } from "./components/Core";
import { Download } from "./components/Download";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Privacy } from "./components/Privacy";
import { Problems } from "./components/Problems";
import { Speed } from "./components/Speed";
import { WhyExtensions } from "./components/WhyExtensions";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problems />
        <Speed />
        <Core />
        <WhyExtensions />
        <Agent />
        <Privacy />
        <Download />
      </main>
      <Footer />
    </>
  );
}
