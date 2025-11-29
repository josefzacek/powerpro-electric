const path = require("path");
const sass = require("sass");
const htmlmin = require("html-minifier");
const { minify } = require("terser");

module.exports = function(eleventyConfig) {
  // Copy assets folder to _site
  eleventyConfig.addPassthroughCopy("assets");

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function(content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
    }
    return content;
  });

  // Compile and Minify SCSS to CSS
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function(inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      if (parsed.name.startsWith("_")) {
        return;
      }
      
      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || "."],
        style: "compressed" // Minify the output
      });
      
      return async () => {
        return result.css;
      };
    }
  });


  // Minify JS
  eleventyConfig.addTemplateFormats("js");
  eleventyConfig.addExtension("js", {
    outputFileExtension: "js",
    compile: async (inputContent, inputPath) => {
      // Only process files in assets folder
      if (inputPath.startsWith("./assets/")) {
        return async () => {
          const result = await minify(inputContent);
          return result.code;
        };
      }
      return async () => inputContent;
    }
  });
  
  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};
