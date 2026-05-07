/**
 * ------------------------------------------------------------
 * Locale Index Generator (CommonJS + Prettier 3 Compatible)
 * ------------------------------------------------------------
 * Auto-generates `index.ts` inside each language folder under:
 *    src/i18n/locales/<lang>/
 *
 * Example:
 *    src/i18n/locales/en/index.ts
 *    src/i18n/locales/fr/index.ts
 *
 * To add a new language:
 * 1. Create a folder under `src/i18n/locales/` (e.g. `src/i18n/locales/es`).
 * 2. Add your JSON translation files inside that folder.
 * 3. Add its path below in the `LOCALE_DIRS` array.
 * 4. Run: `npm run generate:locale-index`
 * ------------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

// Define all locale directories to process
const LOCALE_DIRS = [
  "src/i18n/locales/en",
  "src/i18n/locales/fr",
  // Add others here, e.g. "src/i18n/locales/es"
];

// Async-safe index generator
async function generateIndex(dirPath) {
  const files = fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith(".json"))
    .sort();

  if (files.length === 0) {
    console.warn(`⚠️  No JSON files found in ${dirPath}, skipping...`);
    return;
  }

  const imports = files
    .map((file) => {
      const name = path.basename(file, ".json");
      return `import ${name} from "./${file}";`;
    })
    .join("\n");

  const exports = files
    .map((file) => `  ${path.basename(file, ".json")},`)
    .join("\n");

  const rawContent = `${imports}\n\nexport default {\n${exports}\n};\n`;

  const prettierOpts = await prettier.resolveConfig(process.cwd());
  const formatted = await prettier.format(rawContent, {
    ...prettierOpts,
    parser: "typescript",
  });

  fs.writeFileSync(path.join(dirPath, "index.ts"), formatted, "utf8");
  console.log(`✅ Generated index.ts in ${dirPath}`);
}

// Main execution
(async () => {
  for (const folder of LOCALE_DIRS) {
    const dir = path.resolve(folder);
    if (fs.existsSync(dir)) {
      await generateIndex(dir);
    } else {
      console.warn(`⚠️  Skipped missing locale folder: ${folder}`);
    }
  }

  console.log("✨ Locale index generation complete.\n");
})();
