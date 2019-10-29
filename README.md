# wpewebkit.org

WPE WebKit website done in [Jekyll](http://jekyllrb.com/)
using the template [Start Bootstrap - Stylish Portfolio](https://startbootstrap.com/template-overviews/stylish-portfolio/).


## Building wpewebkit.org site

In order to test it you need to install Jeykyll
you can do it with the following commands in a Debian based system:

    sudo apt-get install jekyll

And then you can run the command `jekyll build` that will generate
the site under `_site` folder.
BTW, you can use `jekyll serve` to test it locally.

Since some of the ruby gems may not be packaged on your distro you can
use bundler (similar to python-virtualenv) to install the gems locally.
For that, first install bundler via your distribution package manager:

    sudo apt-get install ruby-bundler

And then install the gem locally with:

    bundler install --path vendor/bundle

After that you can use the following commands to build/serve the site:

    bundler exec jekyll build
    bundler exec jekyll serve

If you wish to exec jekyll directly, you can install the binary stubs
to some directory in your path:

    bundler --binstubs ~/.bin

and then you can simply execute "jekyll build" (if you have ~/.bin in PATH)


## Updating content

In order to write a new release or security advisory piece in the website
you just have to create a new file inside `_posts` folder using
[Markdown](http://daringfireball.net/projects/markdown/) syntax.
