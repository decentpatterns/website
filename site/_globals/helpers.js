const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

/**
 * Assemble related patterns by loading the page source from disk
 * and scanning for [[wikilinks]].
 */
const getRelatedPatterns = (data) => {
  // this is the same regex pattern as used by the wikilinks markdownit
  // extension (taken from documentation on npm)
  const regex = /\[\[([\w\s/]+)(\|([\w\s/]+))?\]\]/g;
  const content = fs.readFileSync(data.page.inputPath, {
    encoding: "utf8",
    flag: "r",
  });
  try {
    return [...content.matchAll(regex)].map((m) => m[1]);
  } catch (err) {
    console.error(
      `Error extracting related patterns: malformed wikilink (${err})`
    );
    return [];
  }
};

const categoryName = (data) => {
  const category = data.collections.topic.find(
    (t) => t.data.slug === data.topic
  );
  if (category == null) {
    // console.error(
    //   `Category ${data.topic} for pattern ${data.title} not found.`
    // );
    return `Category ${data.topic} not found`;
  }
  return category.data.title;
};

const getPublishedDate = (data) => {
  try {
    const filePath = data.page.inputPath;

    // Extract pattern name from path (e.g., site/library/visual-hash/index.md -> visual-hash)
    const pathParts = filePath.split("/");
    const patternName = pathParts[pathParts.length - 2];

    // Query git history
    const libraryPatternPath = `patterns/${patternName}/index.md`;
    const workingDir = path.join(process.cwd(), "library");
    const gitCommand = `git log -1 --format="%ci" -- "${libraryPatternPath}"`;

    const result = execSync(gitCommand, {
      cwd: workingDir,
      encoding: "utf-8",
    }).trim();

    if (result) {
      const date = new Date(result);
      return date.toLocaleDateString("en-us");
    }
  } catch (error) {
    console.warn(
      `Could not get git date for pattern ${data.page.inputPath}:`,
      error.message
    );
  }

  // Fallback to file date
  return data.page.date.toLocaleDateString("en-us");
};

module.exports = {
  // environment helper
  environment: process.env.ELEVENTY_ENV,

  // Netlify sets this in their build environment
  is_netlify_production: process.env.CONTEXT === "production",

  relatedPatterns: getRelatedPatterns,

  categoryName,

  publishedDate: getPublishedDate,
};
