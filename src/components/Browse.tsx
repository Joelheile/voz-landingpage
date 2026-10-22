import { useEffect, useState } from "react";
import { links } from "../links";
import { Footer } from "./Footer";
import { Header } from "./Header";

type Extension = {
  name: string;
  description?: string;
  publisher?: string;
  keywords: string[];
  monthly: number;
  repository?: string;
};

type SearchObject = {
  downloads?: { monthly: number };
  package: {
    name: string;
    description?: string;
    keywords?: string[];
    publisher?: { username: string };
    links?: { repository?: string };
  };
};

type Result =
  | { state: "loading" }
  | { state: "failed" }
  | { state: "loaded"; extensions: Extension[] };

const search =
  "https://registry.npmjs.org/-/v1/search?text=keywords:voz-package&size=250";

function repositoryURL(raw?: string) {
  const url = raw?.replace(/^git\+/, "").replace(/\.git$/, "");
  return url?.startsWith("https://") ? url : undefined;
}

function toExtension(object: SearchObject): Extension {
  return {
    name: object.package.name,
    description: object.package.description,
    publisher: object.package.publisher?.username,
    keywords: object.package.keywords ?? [],
    monthly: object.downloads?.monthly ?? 0,
    repository: repositoryURL(object.package.links?.repository),
  };
}

function matches(extension: Extension, query: string) {
  const text = [
    extension.name,
    extension.description,
    extension.publisher,
    ...extension.keywords,
  ]
    .join(" ")
    .toLowerCase();
  return text.includes(query.trim().toLowerCase());
}

export function Browse() {
  const [result, setResult] = useState<Result>({ state: "loading" });
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(search)
      .then((response) => {
        if (!response.ok) throw new Error(`npm answered ${response.status}`);
        return response.json();
      })
      .then((body: { objects: SearchObject[] }) =>
        setResult({
          state: "loaded",
          extensions: body.objects.map(toExtension),
        }),
      )
      .catch(() => setResult({ state: "failed" }));
  }, []);

  const shown =
    result.state === "loaded"
      ? result.extensions
          .filter((extension) => matches(extension, query))
          .sort((a, b) => b.monthly - a.monthly)
      : [];

  return (
    <>
      <Header />
      <main className="browse">
        <h1 className="headline">Extensions</h1>
        <p>
          Open one in Voz to install it. Extensions can read your transcripts,
          so check the source.
        </p>
        {result.state === "failed" && (
          <p className="note">npm did not answer. Try again in a moment.</p>
        )}
        {result.state === "loaded" && result.extensions.length === 0 && (
          <p className="note">
            Nothing published yet.{" "}
            <a href={links.buildExtension}>Build the first one</a>
          </p>
        )}
        {(result.state === "loading" ||
          (result.state === "loaded" && result.extensions.length > 0)) && (
          <>
            <div className="toolbar">
              <input
                type="search"
                placeholder="Search extensions"
                aria-label="Search extensions"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <ul className="cards" aria-busy={result.state === "loading"}>
              {result.state === "loading"
                ? [0, 1, 2, 3].map((index) => (
                    <li key={index} className="card placeholder" />
                  ))
                : shown.map((extension, index) => (
                    <ExtensionCard
                      key={extension.name}
                      extension={extension}
                      index={index}
                    />
                  ))}
            </ul>
            {result.state === "loaded" && shown.length === 0 && (
              <p className="note">
                No extension matches "{query}".{" "}
                <a href={links.buildExtension}>Build it with voz new</a>
              </p>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

function ExtensionCard({
  extension,
  index,
}: {
  extension: Extension;
  index: number;
}) {
  const [missing, setMissing] = useState(false);
  const source =
    extension.repository ?? `https://www.npmjs.com/package/${extension.name}`;

  function watchForVoz() {
    setMissing(false);
    const timer = setTimeout(() => setMissing(true), 1500);
    window.addEventListener("blur", () => clearTimeout(timer), { once: true });
  }

  return (
    <li className="card" style={{ "--index": Math.min(index, 12) }}>
      <h2>{extension.name}</h2>
      {extension.description && <p>{extension.description}</p>}
      <span className="muted">
        {extension.publisher && `by ${extension.publisher}, `}
        <a href={source}>source</a>
      </span>
      <div className="card-actions">
        <a
          className="button small"
          href={`voz://extensions/${extension.name}`}
          onClick={watchForVoz}
        >
          Install
        </a>
        <CopyIcon text={`voz install ${extension.name}`} />
      </div>
      {missing && (
        <span className="muted">
          Voz did not open. <a href={links.install}>Get Voz</a>
        </span>
      )}
    </li>
  );
}

function CopyIcon({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      className="copy-icon"
      onClick={copy}
      aria-label={copied ? "Copied" : `Copy ${text}`}
      title={text}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true">
        {copied ? (
          <path d="M3.5 8.5l3 3 6-7" />
        ) : (
          <>
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
            <path d="M10.5 5.5v-2a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 3.5V9A1.5 1.5 0 0 0 4 10.5h1.5" />
          </>
        )}
      </svg>
    </button>
  );
}
