---
layout: post
title: "Code"
tags: [about]
data: { dateless: "true" }
permalink: /code/
---

WPE is open source, free software.  Your help and scrutiny are valuable.
You can learn a great deal about how you can contribute upstream to WebKit through [the official WebKit Contribution Guide](https://webkit.org/contributing-code/).

## Issues?

* Found an issue with WPE? [Report a WebKit issue](http://bugs.webkit.org).
* Having issues with Cog? [Report a Cog issue](https://github.com/Igalia/cog).

## Contact

For questions and hanging out you can find us here:

* [#wpe:matrix.org](https://matrix.to/#/#wpe:matrix.org) room on
  [Matrix](https://matrix.org).
* [#wpe](https://webchat.freenode.net/?channels=wpe) channel on
  [Freenode](https://freenode.net).
* [webkit-wpe](https://lists.webkit.org/mailman/listinfo/webkit-wpe) mailing
  list.
* [@WPEWebKit](https://twitter.com/WPEWebKit) on Twitter.

## Source

In addition to the [WPE WebKit source](https://webkit.org/getting-the-code/) itself, there are several supporting repositories as well:

* [Cog](https://github.com/Igalia/cog): A small single “window” launcher for the WebKit WPE port, with no user interface, suitable to be used as a Web application container.
* [WPEBackend-fdo](https://github.com/Igalia/WPEBackend-fdo): A FreeDesktop&period;org backend for WPE.
* [libwpe](https://github.com/WebPlatformForEmbedded/libwpe): General-purpose library for WPE.

With each new release of WPE, we make source tarballs available.

<h3 class="sr-only">Releases</h3>

<div class="container">
  <div class="card-deck">
    <div class="card">
      <h4 class="card-header text-center" style="font-weight: 300">Stable</h4>
      <div class="list-group list-group-flush">
        {%- for item in collections.latestReleases -%}
        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          {{ item[0] }}<span class="sr-only">:</span>
          <span>
          <a class="badge badge-primary"
             title="Download {{ item[0] }} {{ item[1].stable.version }}"
             href="{{ site.release_dir | append:'/' | append: item[0] | append: '-' | append: item[1].stable.version | append: '.tar.xz' | url }}"><span class="sr-only">Download v</span>{{ item[1].stable.version }}<i style="margin-left:0.3em" class="icon-arrow-down-circle align-text-bottom"></i></a>
          <span class="sr-only">-</span>
          <a class="badge badge-secondary"
             title="Release notes for {{ item[0] }} {{ item[1].stable.version }}"
             href="{{ item[1].stable.url | url }}"><span class="sr-only">Release notes for v{{ item[1].stable.version }}</span><i class="icon-info align-text-bottom"></i></a>
          </span>
        </div>
        {%- endfor -%}
      </div>
    </div>

   <div class="card">
      <h4 class="card-header text-center" style="font-weight: 300">Unstable</h4>
      <div class="list-group list-group-flush">
        {%- for item in collections.latestReleases -%}
        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          {{ item[0] }}<span class="sr-only">:</span>
          <span>
          <a class="badge badge-primary"
             title="Download {{ item[0] }} {{ item[1].unstable.version }}"
             href="{{ site.release_dir | append:'/' | append: item[0] | append: '-' | append: item[1].unstable.version | append: '.tar.xz' | url }}"><span class="sr-only">Download v</span>{{ item[1].unstable.version }}<i style="margin-left:0.3em" class="icon-arrow-down-circle align-text-bottom"></i></a>
          <span class="sr-only">-</span>
          <a class="badge badge-secondary"
             title="Release notes for {{ item[0] }} {{ item[1].unstable.version }}"
             href="{{ item[1].unstable.url | url }}"><span class="sr-only">Release notes for v{{ item[1].unstable.version }}</span><i class="icon-info align-text-bottom"></i></a>
          </span>
        </div>
        {%- endfor -%}
      </div>
    </div>
  </div>

  <p class="m-3 mt-4 text-center">
    <a class="btn btn-light btn-sm" style="font-weight: normal" href="https://wpewebkit.org/releases/">
      <i class="icon-cloud-download align-text-bottom" style="margin-right: 0.3em"></i>All Downloads…</a>
  </p>
</div>
