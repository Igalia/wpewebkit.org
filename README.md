# wpewebkit.org 
wepwebkit.org is a statically generated site for WPE.  The website aims to be simple to maintain and with little complexity and dependencies.  It is built with [11ty](https://www.11ty.dev/) and Liquid templates - and that's pretty much it.

The actual site is hosted by [Igalia](https://igalia.com) who are the primary maintainers of the project.

## Development
In order to setup, you just just have to check it out, switch to the checked out directory and then `npm install`.


## Building wpewebkit.org site locally 

In order to test it all you need to do is 

```sh
npm install && npm run serve
```

This will build the project, start a server, and your terminal will provide you useful links to actually get to it.

### Structure
* `_site` is the output folder, where the generated and served content lives.  It is committed and github pages used to provide a sharable dev URL in case you want to discuss proposed changes easily or test for something without exposing things behind your own firewall.

* `_includes` contains templates and partials. Currently our templates are based on a variant of [Stylish Portfolio](https://startbootstrap.com/template-overviews/stylish-portfolio/) simply because that is what we had to start with.


* `_posts` contains much of the actual content: release notes, security advisories, posts, etc as `.md` files with front matter.  These generate individual .html files in `_site`.

* `assets` contain images and things, they are copied directly into their relevant directory in `_site`.

* `css`  This is where _our_ CSS goes.  Currently, our CSS is overrides and customizations for the [Stylish Portfolio](https://startbootstrap.com/template-overviews/stylish-portfolio/) CSS.  _There is no preprocessing_ at the moment.

* `release` contains the markdown and directory structure for the release schedule page.

* `vendor` this contains thirdparty stuff that we will use directly in the site - it is copied wholesale into its relevant spot in the output directory (`_site`).  _There is currently too much in there_ - our page uses stylish portfolio, which uses bootstrap, which uses jQuery and font-awesome and simple-line-icons. These in turn contain things for bundling, pre-processing with several different preprocessors, etc.  We will probably simplify this further, that's a lot of downloads, code and round-trips for such a simple site.

* `about` contains page posts that are about various aspects of wpe 

In the root directory you will also find some top level files - `index.html`which is the template for the main page, `release.md` which is the template for creating the release pages, a `package.json` which is, well, what you'd expect and `.eleventy.js` which does some very understandable work in creating a date filter for outputting dates (because of how some of the old content exists), and creates some 'recent' collections for simple templating of things like release notes and security advisories.

## Updating wpewebkit.org site

* The website is automatically updated from this repository. So simply commit to master or send a pull-request.

## Updating content

In order to write a new release or security advisory piece in the website
you just have to create a new file inside `_posts` folder using
[Markdown](http://daringfireball.net/projects/markdown/) syntax.


Should you need anything else, you will find [11ty's documentation](https://www.11ty.dev/docs/) pretty helpful.

