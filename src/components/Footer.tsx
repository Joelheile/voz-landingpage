import { AnalyticsConsent } from "./AnalyticsConsent";
import { TextWave } from "./TextWave";
import { links } from "../links";

export function Footer() {
  return (
    <>
      <TextWave />
      <footer className="footer">
        <a href={links.license}>MIT License</a>
        <nav>
          <a href={links.repo}>GitHub</a>
          <a href={links.extensions}>Extensions</a>
          <a href={links.imprint}>Imprint</a>
        </nav>
        <AnalyticsConsent />
      </footer>
    </>
  );
}
