---
layout: post
title: "Blog"
tags: [blog]
data: { dateless: "true" }
permalink: /blog/
---

Don't miss any news related to WPE -- our blog aims to share information regarding WPE: explainers, how-to articles and general information regarding WPE, WebKit
and the Web platform. Also check out [the official WebKit blog](https://webkit.org/blog/) regarding news on the engine itself. 

### Recent Articles

<div class="card" style="margin-bottom: 1rem">
  <ol reversed role="list" class="w-list-unstyled" style="margin: 1rem 0 1rem 0; list-style: none;">
    {%- for blogPost in collections.recentBlogPosts -%}
      <li class="listitem">
      	<img src="{{ blogPost.data.thumbnail }}" alt="">
				<time>{{ blogPost.date | postDate }}</time>
				<h3><a href="{{ blogPost.url | url }}">{{ blogPost.data.title }}</a></h3>
				<p>{{ blogPost.data.preview | strip_html }}</p>
			</li>
    {%- endfor -%}
  </ol>
</div>

<a href="{{ '/blog.xml' | url }}">Feed</a>



### Recent Release Notes

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
      <h4 class="card-header text-center" style="margin-top: 0;">Unstable</h4>
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
    <p class="m-3 mt-4 text-center">
      <a class="btn btn-light btn-sm" style="font-weight: normal" href="https://wpewebkit.org/releases/">
        <i class="icon-cloud-download align-text-bottom" style="margin-right: 0.3em"></i>All Downloads…</a>
    </p>
  </div>
</div>
