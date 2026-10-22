import { trackFeatureRequest } from "../analytics";
import { AnalyticsConsent } from "./AnalyticsConsent";
import { TextWave } from "./TextWave";
import { links } from "../links";

export function Footer() {
  return (
    <>
      <TextWave />
      <footer className="footer">
        <span>MIT License</span>
        <nav>
          <a href={links.repo}>GitHub</a>
          <a href={links.extensions}>Extensions</a>
          <a href={links.buildExtension}>Build an extension</a>
          <a href={links.imprint}>Impressum</a>
          <a
            href={links.featureRequest}
            onClick={() => trackFeatureRequest("footer")}
          >
            Request a feature
          </a>
        </nav>
        <AnalyticsConsent />
      </footer>
    </>
  );
}
