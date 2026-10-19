const repo = "https://github.com/Joelheile/voz";

export const links = {
  repo,
  download: `${repo}/releases/latest`,
  extensions: "/extensions/",
  security: `${repo}/blob/main/SECURITY.md`,
  issues: `${repo}/issues`,
  npm: "https://www.npmjs.com/search?q=keywords:voz-package",
};

export const installCommand =
  "curl -fsSL https://raw.githubusercontent.com/Joelheile/voz/main/install.sh | bash";
