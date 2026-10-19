import { Marked } from "marked";
import source from "../../content/extensions.md?raw";
import { links } from "../links";
import { Footer } from "./Footer";
import { Header } from "./Header";

const isRelative = (href: string) => !/^([a-z]+:|#|\/)/i.test(href);

const markdown = new Marked({
  async: false,
  walkTokens(token) {
    if (token.type === "link" && isRelative(token.href)) {
      token.href = `${links.repo}/blob/main/${token.href}`;
    }
  },
});

const html = markdown.parse(source) as string;

export function Docs() {
  return (
    <>
      <Header />
      <main>
        <article className="docs" dangerouslySetInnerHTML={{ __html: html }} />
      </main>
      <Footer />
    </>
  );
}
