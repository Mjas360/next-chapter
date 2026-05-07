/**
 * ------------------------------------------------------------
 * 🏗️ i18n Namespaced Builder
 * ------------------------------------------------------------
 * Description:
 *   Automated i18next namespace and locale file generator for React projects.
 *
 * Key Features:
 *   ✅ Scans your entire codebase (e.g. `src/pages/**`, `src/hooks/**`) for `t()` translation calls
 *   ✅ Automatically injects proper i18next namespaces (`ns`) into each translation call
 *   ✅ Builds structured, nested locale JSON files (one per page/folder hierarchy)
 *   ✅ Safely merges updates — preserves all existing translations without overwriting them
 *   ✅ Supports multiple languages/locales (e.g. `en`, `fr`)
 *   ✅ Auto-generates clean, consistent namespace names from folder paths
 *   ✅ Cleans invalid characters from file and namespace names
 *   ✅ Prettifies all output code and JSON files using your Prettier config
 *   ✅ Idempotent: can be re-run any number of times with no data loss
 *
 * How It Works:
 *   1. Parses project source files using Babel to detect `t("...")` calls.
 *   2. Injects an `ns` option automatically if missing, based on the file’s folder structure.
 *   3. Builds hierarchical translation keys (`folderName.fileName.text_key`).
 *   4. Generates or updates locale JSON files in `src/i18n/locales/<lang>/`.
 *   5. Writes all detected English source strings as default values.
 *   6. Keeps all manually translated entries untouched — only adds new keys.
 *
 * Usage:
 *   - Run once or repeatedly: `node scripts/i18n-builder.js`
 *   - Optionally integrate as an npm script, e.g. `"i18n:build": "node scripts/i18n-builder.js"`
 *
 * Result:
 *   🎯 Consistent, auto-maintained i18n structure across your project
 *   💾 Zero translation loss, cleaner namespaces, and effortless synchronization
 * ------------------------------------------------------------
 */

(async () => {
  const fs = require("fs");
  const path = require("path");
  const glob = require("glob");
  const prettier = require("prettier");
  const parser = require("@babel/parser");
  const traverse = require("@babel/traverse").default;
  const generator = require("@babel/generator").default;
  const t = require("@babel/types");

  const SRC_GLOBS = [
    "src/**/*.{js,jsx,ts,tsx}",
    // "src/screens/**/*.{js,jsx,ts,tsx}",
    // "src/hooks/**/*.{js,jsx,ts,tsx}",
    // 'src/components/**/*.{js,jsx,ts,tsx}',
  ];

  // Define all locale directories to process
  const LOCALE_DIRS = {
    en: "src/i18n/locales/en",
    fr: "src/i18n/locales/fr",
  };
  const MAX_KEY_SLUG = 30;

  // ---------- Helpers ----------

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "")
      .slice(0, MAX_KEY_SLUG);

  // Convert folder array to safe PascalCase, then lowercase first char
  const folderArrayToLocaleName = (folders) => {
    if (!folders || !folders.length) return "locale";

    const name = folders
      .map((f) => {
        // Remove invalid characters and capitalize first letter
        const clean = f.replace(/[^a-zA-Z0-9]/g, "");
        return clean.charAt(0).toUpperCase() + clean.slice(1);
      })
      .join("");

    return name.charAt(0).toLowerCase() + name.slice(1);
  };

  // Folder-based JSON file name (last 4 folders, deepest first)
  const computeLocaleFileNameFromFolders = (filePath, folderDepth = 4) => {
    const parts = filePath.split(path.sep);
    const pagesIndex = parts.indexOf("screens");
    if (pagesIndex < 0) return "common";

    const folders = parts.slice(pagesIndex, -1); // skip file
    if (!folders.length)
      return path
        .basename(filePath, path.extname(filePath))
        .replace(/[^a-zA-Z0-9]/g, "");

    const lastFolders = folders.slice(-folderDepth).reverse(); // last 4 folders, deepest first

    // console.log("computeLocaleFileNameFromFolders: ", filePath, folders, folderArrayToLocaleName(lastFolders));
    return folderArrayToLocaleName(lastFolders);
  };

  async function getPrettierOptions(file) {
    try {
      const resolved = (await prettier.resolveConfig(file)) || {};
      return {
        ...resolved,
        filepath: file,
        parser: "typescript",
        singleQuote: true,
        trailingComma: "all",
      };
    } catch {
      return {
        filepath: file,
        parser: "typescript",
        singleQuote: true,
        trailingComma: "all",
      };
    }
  }

  function buildNamespaceParts(filePath, depth = 3) {
    const parts = filePath.split(path.sep);
    const pagesIndex = parts.indexOf("screens");
    if (pagesIndex < 0)
      return { namespaceParts: ["common"], jsonPath: ["common"] };

    const segments = parts.slice(pagesIndex + 1);
    const fileName = path.basename(filePath, path.extname(filePath));
    const folders = segments.filter((seg) => !seg.match(/\.(jsx?|tsx?)$/));

    const cleanParts = folders.slice(0, depth);
    const jsonPath = [...cleanParts, fileName || "index"];
    return { namespaceParts: cleanParts, jsonPath };
  }

  // Ensure locale directories exist
  for (const dir of Object.values(LOCALE_DIRS)) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  // ---------- Main ----------
  const files = SRC_GLOBS.flatMap((pattern) =>
    glob.sync(pattern, { nodir: true })
  );
  console.log(`📄 Scanning ${files.length} files...\n`);

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8");
    const { jsonPath } = buildNamespaceParts(file, 3);

    const namespace = computeLocaleFileNameFromFolders(file);

    let ast;
    try {
      ast = parser.parse(raw, {
        sourceType: "module",
        plugins: [
          "jsx",
          "typescript",
          "classProperties",
          "decorators-legacy",
          "optionalChaining",
          "objectRestSpread",
        ],
      });
    } catch (err) {
      console.warn(`⚠️ Skipping ${file}: parse error - ${err.message}`);
      continue;
    }

    const collected = {};

    traverse(ast, {
      CallExpression(pathNode) {
        const callee = pathNode.node.callee;
        if (!t.isIdentifier(callee, { name: "t" })) return;

        const args = pathNode.node.arguments;
        if (!args?.length) return;
        const first = args[0];
        if (!t.isStringLiteral(first)) return;

        const text = first.value.trim();
        if (!text) return;

        // Ignore already processed keys like "public.children..."
        if (text.startsWith("public.children")) return;

        // Skip if ns already exists
        if (args.length >= 2 && t.isObjectExpression(args[1])) {
          const hasNs = args[1].properties.some(
            (p) =>
              t.isObjectProperty(p) && t.isIdentifier(p.key, { name: "ns" })
          );
          if (hasNs) return;
        }

        const key = slugify(text) || "text";
        const fullKey = [...jsonPath, key].join(".");

        pathNode.node.arguments[0] = t.stringLiteral(fullKey);

        const nsProp = t.objectProperty(
          t.identifier("ns"),
          t.stringLiteral(namespace)
        );
        if (args.length >= 2 && t.isObjectExpression(args[1])) {
          args[1].properties.push(nsProp);
        } else {
          pathNode.node.arguments.push(t.objectExpression([nsProp]));
        }

        collected[fullKey] = text;
      },
    });

    if (!Object.keys(collected).length) continue;

    // Write updated file
    const out = generator(ast, {
      retainLines: true,
      jsescOption: { minimal: true },
    }).code;
    const prettierOpts = await getPrettierOptions(file);
    const formatted = await prettier.format(out, prettierOpts);
    fs.writeFileSync(file, formatted, "utf8");

    // Write to locales safely
    const fileBase = namespace;

    for (const [lang, dir] of Object.entries(LOCALE_DIRS)) {
      const localeFile = path.join(dir, `${fileBase}.json`);

      let existing = {};
      if (fs.existsSync(localeFile)) {
        try {
          existing = JSON.parse(fs.readFileSync(localeFile, "utf8"));
        } catch {
          existing = {};
        }
      }

      const merged = { ...existing };
      for (const [fullKey, text] of Object.entries(collected)) {
        const keys = fullKey.split(".");
        let ref = merged;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!ref[keys[i]]) ref[keys[i]] = {};
          ref = ref[keys[i]];
        }
        const lastKey = keys[keys.length - 1];
        if (!ref[lastKey]) ref[lastKey] = text; // preserve existing
      }

      const formattedJson = await prettier.format(
        JSON.stringify(merged, null, 2),
        { parser: "json" }
      );
      fs.writeFileSync(localeFile, formattedJson, "utf8");
      console.log(`✅ ${lang.toUpperCase()}: ${localeFile}`);
    }
  }

  console.log("\n✨ Nested i18n normalization complete.");
})();
