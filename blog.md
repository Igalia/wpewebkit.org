---
layout: page
title: "Blog"
tags: [blog]
data: { dateless: "true" }
permalink: /blog/
---
<style>
.card ol {
	padding: 1.5em;
}
@media (min-width: 60em) {
	.card ol {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 3em 5em;
	}
}
.card ol img {
	width: 100%;
	height: 9em;
	margin-block: 0 1em;
	object-fit: cover;
	object-position: top center;
	mask: linear-gradient(0deg, #FFF0, 0.5em, #FFFF 1.5em);
}
.card ol p, .card ol time {
	font-size: 90%;
}
</style>

<header class="page">

# {{ title }}

Don't miss any news related to WPE -- our blog aims to share information regarding WPE: explainers, how-to articles and general information regarding WPE, WebKit
and the Web platform. Also check out [the official WebKit blog](https://webkit.org/blog/) regarding news on the engine itself. 

</header>

## Recent Articles

<div class="card">
	<ol reversed role="list" class="w-list-unstyled" style="margin: 1rem 0 1rem 0; list-style: none;">
	{%- for blogPost in collections.recentBlogPosts -%}
		<li class="listitem">
			<img src="{{ blogPost.data.thumbnail | url }}" alt="">
			<time>{{ blogPost.date | postDate }}</time>
			<h3><a href="{{ blogPost.url | url }}">{{ blogPost.data.title }}</a></h3>
			<p>{{ blogPost.data.preview | strip_html }}</p>
		</li>
	{%- endfor -%}
	</ol>
	<a class="btn" href="{{ '/blog.xml' | url }}"><i class="icon-feed"></i>&nbsp;&nbsp;Feed</a>
</div>


## Recent Release Notes

<div class="container">
  <div class="card-deck">
    <div class="card">
      <h4 class="card-header text-center">Stable</h4>
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
      <h4 class="card-header text-center">Unstable</h4>
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
      <a class="btn btn-light btn-sm" href="{{ '/release/' | url }}">All Release Notes…</a>
    </p>
  </div>
</div>
