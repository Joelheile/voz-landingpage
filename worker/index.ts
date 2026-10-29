type Env = { ASSETS: { fetch(request: Request): Promise<Response> } };

type SearchObject = {
  downloads?: { monthly: number };
  package: { name: string; description?: string };
};

const search =
  "https://registry.npmjs.org/-/v1/search?text=keywords:voz-package&size=250";
const width = 720;
const rowHeight = 56;
const descriptionLength = 80;

function escapeXML(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function shorten(text: string) {
  return text.length > descriptionLength
    ? `${text.slice(0, descriptionLength - 1).trimEnd()}…`
    : text;
}

function row(object: SearchObject, index: number) {
  const y = index * rowHeight;
  const downloads = `${(object.downloads?.monthly ?? 0).toLocaleString("en-US")}/month`;
  return `<g transform="translate(0 ${y})">
  ${index > 0 ? `<line x1="0" x2="${width}" y1="0" y2="0" class="line"/>` : ""}
  <text x="0" y="23" class="name">${escapeXML(object.package.name)}</text>
  <text x="${width}" y="23" class="meta" text-anchor="end">${downloads}</text>
  <text x="0" y="44" class="meta">${escapeXML(shorten(object.package.description ?? ""))}</text>
</g>`;
}

function render(objects: SearchObject[]) {
  const sorted = objects.toSorted(
    (a, b) => (b.downloads?.monthly ?? 0) - (a.downloads?.monthly ?? 0),
  );
  const height = sorted.length * rowHeight;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<title>Voz extensions on npm</title>
<style>
  text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  .name { font-size: 15px; font-weight: 600; fill: #141414; }
  .meta { font-size: 13px; fill: #5f5c55; }
  .line { stroke: rgb(20 20 20 / 0.08); }
  @media (prefers-color-scheme: dark) {
    .name { fill: #f2f0eb; }
    .meta { fill: #a5a29a; }
    .line { stroke: rgb(255 255 255 / 0.09); }
  }
</style>
${sorted.map(row).join("\n")}
</svg>`;
}

async function extensionsSVG() {
  const response = await fetch(search, { cf: { cacheTtl: 3600 } });
  if (!response.ok) {
    return new Response(`npm answered ${response.status}`, { status: 502 });
  }
  const body: { objects: SearchObject[] } = await response.json();
  return new Response(render(body.objects), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export default {
  fetch(request: Request, env: Env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/extensions.svg") return extensionsSVG();
    return env.ASSETS.fetch(request);
  },
};
