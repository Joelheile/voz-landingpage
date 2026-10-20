import { useEffect, useState } from "react";
import { links } from "../links";
import { CopyCommand } from "./CopyCommand";
import { Footer } from "./Footer";
import { Header } from "./Header";

type Extension = { name: string; description?: string; version: string };

type Result =
  | { state: "loading" }
  | { state: "failed" }
  | { state: "loaded"; extensions: Extension[] };

const search =
  "https://registry.npmjs.org/-/v1/search?text=keywords:voz-package&size=250";

export function Browse() {
  const [result, setResult] = useState<Result>({ state: "loading" });

  useEffect(() => {
    fetch(search)
      .then((response) => response.json())
      .then((body: { objects: { package: Extension }[] }) =>
        setResult({
          state: "loaded",
          extensions: body.objects.map((object) => object.package),
        }),
      )
      .catch(() => setResult({ state: "failed" }));
  }, []);

  return (
    <>
      <Header />
      <main className="browse">
        <h1 className="headline">Extensions</h1>
        <p>
          Packages on npm with the <code>voz-package</code> keyword. Copy the
          command to install one.
        </p>
        {result.state === "loading" && <p className="note">Loading</p>}
        {result.state === "failed" && (
          <p className="note">npm did not answer. Try again in a moment.</p>
        )}
        {result.state === "loaded" && result.extensions.length === 0 && (
          <p className="note">
            Nothing published yet.{" "}
            <a href={links.buildExtension}>Build the first one</a>
          </p>
        )}
        {result.state === "loaded" && result.extensions.length > 0 && (
          <>
          <ul className="packages">
            {result.extensions.map((extension) => (
              <li key={extension.name}>
                <a href={`https://www.npmjs.com/package/${extension.name}`}>
                  {extension.name}
                </a>
                <span className="muted">{extension.version}</span>
                {extension.description && <p>{extension.description}</p>}
                <CopyCommand command={`voz install npm:${extension.name}`} />
              </li>
            ))}
          </ul>
          <p className="note">
            Missing something? <a href={links.buildExtension}>Build it</a>
          </p>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
