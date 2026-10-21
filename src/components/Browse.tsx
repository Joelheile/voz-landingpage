import { type CSSProperties, useEffect, useState } from "react";
import { links } from "../links";
import { CopyCommand } from "./CopyCommand";
import { Footer } from "./Footer";
import { Header } from "./Header";

type Extension = {
  name: string;
  description?: string;
  publisher?: string;
  monthly: number;
  updated: string;
  repository?: string;
};

type SearchObject = {
  downloads?: { monthly: number };
  updated: string;
  package: {
    name: string;
    description?: string;
    publisher?: { username: string };
    links?: { repository?: string };
  };
};

type Result =
  | { state: "loading" }
  | { state: "failed" }
  | { state: "loaded"; extensions: Extension[] };

type Sort = "popular" | "recent";

const search =
  "https://registry.npmjs.org/-/v1/search?text=keywords:voz-package&size=250";

const compact = new Intl.NumberFormat("en-US", { notation: "compact" });
const relative = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });

const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_536_000_000],
  ["month", 2_592_000_000],
  ["week", 604_800_000],
  ["day", 86_400_000],
  ["hour", 3_600_000],
];

function ago(date: string) {
  const elapsed = new Date(date).getTime() - Date.now();
  const [unit, size] =
    units.find(([, size]) => Math.abs(elapsed) >= size) ?? units[4];
  return relative.format(Math.round(elapsed / size), unit);
}

function repositoryURL(raw?: string) {
  return raw?.replace(/^git\+/, "").replace(/\.git$/, "");
}

function toExtension(object: SearchObject): Extension {
  return {
    name: object.package.name,
    description: object.package.description,
    publisher: object.package.publisher?.username,
    monthly: object.downloads?.monthly ?? 0,
    updated: object.updated,
    repository: repositoryURL(object.package.links?.repository),
  };
}

function matches(extension: Extension, query: string) {
  const text = [extension.name, extension.description, extension.publisher]
    .join(" ")
    .toLowerCase();
  return text.includes(query.trim().toLowerCase());
}

const order: Record<Sort, (a: Extension, b: Extension) => number> = {
  popular: (a, b) => b.monthly - a.monthly,
  recent: (a, b) => b.updated.localeCompare(a.updated),
};

export function Browse() {
  const [result, setResult] = useState<Result>({ state: "loading" });
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("popular");

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
          .sort(order[sort])
      : [];

  return (
    <>
      <Header />
      <main className="browse">
        <h1 className="headline">Extensions</h1>
        <p>
          What people built for Voz. Install one, or share your own so the next
          person doesn't have to build it.
        </p>
        <ol className="steps">
          <li>
            <strong>Get Voz</strong>
            <span>
              Free for Mac. <a href={links.install}>Install it</a> with one
              command.
            </span>
          </li>
          <li>
            <strong>Install an extension</strong>
            <span>
              Click Install in the Voz menu bar panel under Extensions, or paste
              its command into Terminal.
            </span>
          </li>
          <li>
            <strong>Dictate</strong>
            <span>
              It works right away. Extensions can read your transcripts, so read
              the source first.
            </span>
          </li>
        </ol>
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
              <select
                aria-label="Sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as Sort)}
              >
                <option value="popular">Most used</option>
                <option value="recent">Recently updated</option>
              </select>
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
              <p className="note">No extension matches "{query}".</p>
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
  const details = [
    extension.publisher && `by ${extension.publisher}`,
    `${compact.format(extension.monthly)} a month`,
    `updated ${ago(extension.updated)}`,
  ].filter(Boolean);

  return (
    <li
      className="card"
      style={{ "--index": Math.min(index, 12) } as CSSProperties}
    >
      <div className="card-title">
        <h2>{extension.name}</h2>
        <span className="card-links">
          {extension.repository && <a href={extension.repository}>Source</a>}
          <a href={`https://www.npmjs.com/package/${extension.name}`}>npm</a>
        </span>
      </div>
      {extension.description && <p>{extension.description}</p>}
      <span className="muted">{details.join(", ")}</span>
      <CopyCommand command={`voz install npm:${extension.name}`} />
    </li>
  );
}
