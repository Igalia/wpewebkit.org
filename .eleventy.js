const MarkdownIt = require("markdown-it");
const MarkdownItAnchor = require("markdown-it-anchor");
const MarkdownItTOC = require("markdown-it-toc-done-right");

class DefaultDict {
	constructor(defaultValue) {
		return new Proxy({}, {
			get: (target, name) => name in target ? target[name] : defaultValue
		});
	}
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('css')
  eleventyConfig.addPassthroughCopy('vendor')
  eleventyConfig.addPassthroughCopy('assets')
  
  eleventyConfig.addFilter("dateString", (value) => {
    return new Date(value).toDateString();
  });
  eleventyConfig.addFilter("isodate", (value) => {
    return new Date(value).toISOString();
  });

  eleventyConfig.addCollection("recentReleaseNotes", (collectionApi) => {
    let i =0;
    return collectionApi.getFilteredByTag("release").reverse().filter((item) => {
      return i++ < 5;
    });
  })

  eleventyConfig.addCollection("recentStableReleaseNotes", (collectionApi) => {
    return collectionApi.getFilteredByTags("release", "stable").reverse();
  })

  eleventyConfig.addCollection("recentUnstableReleaseNotes", (collectionApi) => {
    return collectionApi.getFilteredByTags("release", "unstable").reverse();
  })

	eleventyConfig.addCollection("latestReleases", (collectionApi) => {
		const makeFilter = function () {
			let seenPackages = new DefaultDict(false);
			return (item) => {
				const package = item.data.package;

				if (seenPackages[package])
					return false;

				seenPackages[package] = true;
				return true;
			};
		};

		const gatherLatest = function (result, kind) {
			for (let item of collectionApi.getFilteredByTags("release", kind).reverse().filter(makeFilter())) {
				const package = item.data.package;
				if (package === undefined)
					continue;
				if (result[package] === undefined)
					result[package] = {};
				result[package][kind] = {
					version: item.data.version,
					date: item.date,
					package: package,
					kind: kind,
					url: item.url,
				};
			}
		};

		let result = {};
		gatherLatest(result, "stable");
		gatherLatest(result, "unstable");
		return result;
	});

  eleventyConfig.addCollection("recentWSA", (collectionApi) => {
    let i =0;
    return collectionApi.getFilteredByTag("WSA").reverse().filter((item) => {
      return i++ < 5;
    });
  })

  eleventyConfig.setLibrary("md", MarkdownIt({
	  typographer: true,
	  linkify: false,
	  breaks: false,
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