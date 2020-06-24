const MarkdownIt = require("markdown-it");
const MarkdownItAnchor = require("markdown-it-anchor");
const MarkdownItTOC = require("markdown-it-toc-done-right");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('css')
  eleventyConfig.addPassthroughCopy('vendor')
  eleventyConfig.addPassthroughCopy('assets')
  
  eleventyConfig.addFilter("dateString", (value) => {
    return new Date(value).toDateString();
  });

  eleventyConfig.addCollection("recentReleaseNotes", (collectionApi) => {
    let i =0;
    return collectionApi.getFilteredByTag("release").filter((item) => {
      return i++ < 5;
    });
  })

  eleventyConfig.addCollection("recentWSA", (collectionApi) => {
    let i =0;
    return collectionApi.getFilteredByTag("WSA").filter((item) => {
      return i++ < 5;
    });
  })

  eleventyConfig.setLibrary("md", MarkdownIt({
	  linkify: true,
	  breaks: true,
	  html: true,
	}).use(MarkdownItAnchor, {
	  level: 2,
	}).use(MarkdownItTOC, {
	  level: [2, 3],
	})
  );

  return {
    passthroughFileCopy: true,
    pathPrefix: "/wpewebkit.org/"
  }
}