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

<div class="container">
  <div class="card-deck">
    <div class="card">
      <h4 class="card-header text-center" style="margin-top: 0;">Stable</h4>
      <div class="list-group list-group-flush">
        {%- for item in collections.latestReleases -%}
        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          {{ item[0] }}:
          <a class="badge badge-secondary"
             href="{{ item[1].stable.url | url }}">{{ item[1].stable.version }}</a>
        </div>
        {%- endfor -%}
      </div>
    </div>

   <div class="card">
      <h4 class="card-header text-center" style="margin-top: 0;">Unstable</h4>
      <div class="list-group list-group-flush">
        {%- for item in collections.latestReleases -%}
        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          {{ item[0] }}:
          <span>
          <a class="badge badge-secondary"
             title="Release notes for {{ item[0] }} {{ item[1].unstable.version }}"
             href="{{ item[1].unstable.url | url }}">{{ item[1].unstable.version }}</a>
          </span>
        </div>
        {%- endfor -%}
      </div>
    </div>
    <p class="m-3 mt-4 text-center">
      <a class="btn btn-light btn-sm"
       href="https://wpewebkit.org/release/">All Release Notes…</a>
    </p>
  </div>
</div>
