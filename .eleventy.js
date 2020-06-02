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


  return {
    passthroughFileCopy: true
  }
}