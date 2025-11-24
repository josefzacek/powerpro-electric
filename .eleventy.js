const path = require("path");
const sass = require("sass");

module.exports = function(eleventyConfig) {
  // Copy assets folder to _site
  eleventyConfig.addPassthroughCopy("assets");

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
  
  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};
