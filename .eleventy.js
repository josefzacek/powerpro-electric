module.exports = function(eleventyConfig) {
  // Copy assets folder to _site
  eleventyConfig.addPassthroughCopy("assets");
  
  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};
