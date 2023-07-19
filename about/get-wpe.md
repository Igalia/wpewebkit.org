---
layout: page
title: "Get WPE WebKit"
tags: [about]
data: { dateless: "true" }
permalink: /about/get-wpe.html
sitemapChangeFrequency: yearly
resources: [
	{
		"title": "Package Releases",
		"url": "/release/",
		"text": "The most recent stable and development releases of WPE codebases."
	},
	{
		"title": "Release Schedule",
		"url": "/release/schedule/",
		"text": "How often does WEPWebKit release, and when?"
	},
	{
		"title": "Security Advisories",
		"url": "/security/",
		"text": "A complete archive of our security adviories, often with download links."
	},
	{
		"title": "Performance Tips",
		"url": "https://github.com/Igalia/meta-webkit/wiki/PerformanceTips",
		"text": "A few pointers on how to get better performance out of WPEwebkit. (Github Wiki)"
	}
]
---

<header class="page">

# Get WPE

</header>

WPE is an open source/free software project. That means that you can
get the source code directly and modify it to serve your needs. While
this can sometimes be an involved process, there are different ways to
get your hands on WPE, depending on what you need.

* [__Install it from your Linux distribution__](#install-it-from-your-linux-distribution): This is the easiest, and it allows you to quickly test WPE on the desktop.
* [__Build an image for supported reference hardware__](#build-an-image-for-supported-reference-hardware): This is a bit more involved, but it's an easy way to try out WPE directly on embedded hardware.
* [__Download the official tarball releases__](#download-the-official-tarball-releases): This is the best way to get periodical updates with new features and security fixes.
* [__Get the source code directly from git__](#get-the-source-code-directly-from-git): This is only necessary if you want to get involved in the development of WPE.

### Before starting

Before getting the code, it's a good idea to be familiar with what you
will need. The different components that are needed to run WPE are:

* [WebKit](https://webkit.org): as WPE is an official WebKit port, you will need the source code for the WebKit project.
* [libwpe](https://github.com/WebPlatformForEmbedded/libwpe): A general-purpose library for WPE, that enables integration between WebKit and different platforms, through backends.
* [WPEBackend-fdo](https://github.com/Igalia/WPEBackend-fdo): A reference FreeDesktop.org backend for WPE, that relies on different FreeDesktop.org projects and can serve as a starting point to either customize or create a completely new backend for specific configurations.
* [Cog](https://github.com/Igalia/cog): A simple and minimalistic browser using WPE, with no user interface, suitable to be used as a Web application container or as a starting point to develop more complex browser applications based on WPE.

## __Install it from your Linux distribution__

These packages are not just a quick and simple way to test WPE but
they also come with all the development files and documentation
necessary to build and test software that uses this web engine. Some
of the distributions that already have built packages for WPE are:

  * [Debian](https://packages.debian.org/search?searchon=sourcenames&keywords=wpewebkit)
  * [Ubuntu](https://packages.ubuntu.com/search?keywords=wpewebkit&searchon=sourcenames&suite=all&section=all)
  * [Raspbian](https://archive.raspbian.org/raspbian/pool/main/w/wpewebkit/)
  * [Arch Linux](https://archlinux.org/packages/extra/x86_64/wpewebkit/)
  * [Fedora](https://copr.fedorainfracloud.org/coprs/philn/wpewebkit/)

This list is not exhaustive, so if you use a different distributions,
there might be packages for it already. Refer to the official
documentation of your distribution for information on how to install packages.

## __Build an image for supported reference hardware__

A simple way to cross-compile WPE and its dependencies for a target
architecture is to use an existing build framework. We provide recipes
for a [OpenEmbedded/Yocto layer for WPE](https://github.com/Igalia/meta-webkit/).
There are specific [instructions](https://github.com/Igalia/meta-webkit/wiki/WPE) in the
project wiki.

## __Download the official tarball releases__

We periodically package WPE and its associated libraries, following a
predictable [release schedule](/release/schedule/), to make sure that
both stable and development versions are available to users,
deployers, and developers. Following the release schedule is the best
way to follow the progress of WPE, get a sense of what's coming, and
properly prepare for updates in your production deployments.

_Unstable_ releases are development versions, that give a preview of
what's coming in the next _stable_ release. These are useful for
beta-testing, and to prepare to upgrade your deployment to an upcoming
stable release when this is out. Unstable releases should never be
used in production.

Below is a summary of the latest stable and unstable releases for WPE
and its components:

<h3 class="sr-only">Releases</h3>

<div class="container" style="border-block: medium solid hsl(205,86%,70%);padding-block:1em;padding-inline:0.5em;">
  <div class="card-deck" style="display:flex;">
    <div class="card">
      <h4 class="card-header text-center" style="margin-top: 0;">Stable</h4>
      <div class="list-group list-group-flush">
        {%- for item in collections.latestReleases -%}
        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          {{ item[0] }}<span class="sr-only">:</span>
          <span>
          <a class="badge badge-primary"
             title="Download {{ item[0] }} {{ item[1].stable.version }}"
             href="{{ site.release_dir | append:'/' | append: item[0] | append: '-' | append: item[1].stable.version | append: '.tar.xz' }}"><span class="sr-only">Download v</span>{{ item[1].stable.version }}<i style="margin-left:0.3em" class="icon-arrow-down-circle align-text-bottom"></i></a>
          <span class="sr-only">-</span>
          <a class="badge badge-secondary"
             title="Release notes for {{ item[0] }} {{ item[1].stable.version }}"
             href="{{ item[1].stable.url }}"><span class="sr-only">Release notes for v{{ item[1].stable.version }}</span><i class="icon-info align-text-bottom"></i></a>
          </span>
        </div>
        {%- endfor -%}
      </div>
    </div>

   <div class="card">
      <h4 class="card-header text-center" style="margin-top: 0;">Unstable</h4>
      <div class="list-group list-group-flush">
        {%- for item in collections.latestReleases -%}
        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          {{ item[0] }}<span class="sr-only">:</span>
          <span>
          <a class="badge badge-primary"
             title="Download {{ item[0] }} {{ item[1].unstable.version }}"
             href="{{ site.release_dir | append:'/' | append: item[0] | append: '-' | append: item[1].unstable.version | append: '.tar.xz' }}"><span class="sr-only">Download v</span>{{ item[1].unstable.version }}<i style="margin-left:0.3em" class="icon-arrow-down-circle align-text-bottom"></i></a>
          <span class="sr-only">-</span>
          <a class="badge badge-secondary"
             title="Release notes for {{ item[0] }} {{ item[1].unstable.version }}"
             href="{{ item[1].unstable.url }}"><span class="sr-only">Release notes for v{{ item[1].unstable.version }}</span><i class="icon-info align-text-bottom"></i></a>
          </span>
        </div>
        {%- endfor -%}
      </div>
    </div>
    <p class="m-3 mt-4 text-center">
      <a class="btn btn-light btn-sm" style="font-weight: normal" href="https://wpewebkit.org/release/">
        <i class="icon-cloud-download align-text-bottom" style="margin-right: 0.3em"></i>See all released tarballs…</a>
    </p>
  </div>
</div>

## __Get the source code directly from git__

This is the most involved way to get the source code, and it's only
recommended for developers who are interested in getting involved in
the development of the project, or who need to implement any feature
that is not yet available in WPE. Additionally, this can be also be
a good way to track down any bug you might find and to fix it.

* [WebKit](https://github.com/webKit/WebKit/)
* [libwpe](https://github.com/WebPlatformForEmbedded/libwpe).
* [WPEBackend-fdo](https://github.com/Igalia/WPEBackend-fdo).
* [Cog](https://github.com/Igalia/cog).

Instead of downloading each of these components on their own, a good way to start is to fetch the WebKit repository
and use its build system to fetch all the dependencies. Check the [instructions for building WebKit](https://trac.webkit.org/wiki/WPE#BuildingWPEWebKitfromgit).

If you find any problem or want to know more about optimizing WPE for your hardware or use cases, please [contact us](mailto:info@wpewebkit.org).

{% include resources.html %}
