const MarkdownIt = require("markdown-it");
const MarkdownItAnchor = require("markdown-it-anchor");
const MarkdownItTOC = require("markdown-it-toc-done-right");
const { DateTime } = require("luxon");

class DefaultDict {
  constructor(defaultValue) {
    return new Proxy({}, {
      get: (target, name) => name in target ? target[name] : defaultValue
    });
  }
}

const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('css')
  eleventyConfig.addPassthroughCopy('vendor')
  eleventyConfig.addPassthroughCopy('assets')
  eleventyConfig.addPlugin(pluginRss);
  
  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
    strictFilters: false, // renamed from `strict_filters` in Eleventy 1.0
  });

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });
  eleventyConfig.addFilter("dateString", (value) => {
    return new Date(value).toDateString();
  });
  eleventyConfig.addFilter("isodate", (value) => {
    return new Date(value).toISOString();
  });
  eleventyConfig.addFilter("arrayLength", (value) => {
    return value.length;
  });

  eleventyConfig.addShortcode("currentYear", () => `${new Date().getFullYear()}`);

  eleventyConfig.addCollection("recentPosts", (collectionApi) => {
    let i =0;
    return collectionApi.getFilteredByGlob("_posts/*.md").reverse().filter((item) => {
      return i++ < 10;
    });
  })

  eleventyConfig.addCollection("recentBlogPosts", (collectionApi) => {
    let i =0;
    return collectionApi.getFilteredByTag("blogpost").reverse().filter((item) => {
      return i++ < 5;
    });
  })

  eleventyConfig.addCollection("recentReleaseNotes", (collectionApi) => {
    let i =0;
    return collectionApi.getFilteredByTag("release").reverse().filter((item) => {
      return i++ < 5;
    });
  })

  eleventyConfig.addCollection("pkgCatalog", collection => {
    let pkgCatalog = new Object;
    collection.getAll().forEach(item => {
      let thisPkg = item.data.package;
      if (!thisPkg) return;
      if (!pkgCatalog[thisPkg]) pkgCatalog[thisPkg] = {
        latestStable: new Object,
        latestDev: new Object,
        recent: new Array,
        list: new Array,  // rename "list"?
      };
      let itemType = (item.data.tags).filter(value => /stable$/.test(value)).toString();
      let thisData = {
        version: item.data.version,
        date: item.date,
        url: item.url,
        type: itemType,
      };
      pkgCatalog[thisPkg].list.push(thisData);
    });
    for (const pkg in pkgCatalog) {
      let thisPkg = pkgCatalog[pkg];
    //https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
      thisPkg.list.sort((a,b) => {
        return b.date - a.date;
      });

      let stableVer = thisPkg.list.findIndex(x => x.type === "stable");
      let developVer = thisPkg.list.findIndex(x => x.type === "unstable");
      thisPkg.latestStable = {...thisPkg.list[stableVer]};
      thisPkg.latestDev = {...thisPkg.list[developVer]};
    //https://stackoverflow.com/a/35398031 (finding by object in array)
      thisPkg.recent = thisPkg.list.splice(0,5);
    };
    return pkgCatalog;
  });

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
