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
<a class="btn" href="{{ '/blog.xml' | url }}"><i class="icon-feed"></i>&nbsp;&nbsp;Feed</a>

<div class="card">
<ol reversed role="list" class="w-list-unstyled" style="margin: 1rem 0 1rem 0; list-style: none;"><li class="listitem">
<img src="/assets/build-webkit-org-screenshot.png" alt="">
<time>Jul 28, 2022</time>
<h3><a href="/blog/04-wpe-qa-tooling.html">WPE QA and tooling</a></h3>
<p>In the previous posts, my colleagues Claudio and Miguel wrote respectively about the major components of the project and, specifically, the graphics architecture of WPE. Today, you'll see our efforts to improve the quality of both WPE and the experience of working and using it.</p>
</li><li class="listitem">
<img src="/assets/graphics-attachment.png" alt="">
<time>Jul 15, 2022</time>
<h3><a href="/blog/03-wpe-graphics-architecture.html">WPE Graphics architecture</a></h3>
<p>Following the previous post in the series about WPE where we talked about the WPE components, this post will explain briefly the WPE graphics architecture, and how the engine is able to render HTML content into the display.</p>
</li><li class="listitem">
<img src="/assets/wpe-architecture-diagram.png" alt="">
<time>Jul 1, 2022</time>
<h3><a href="/blog/02-overview-of-wpe.html">An overview of the WPE WebKit project</a></h3>
<p>In the previous post in this series, we explained that WPE is a WebKit port optimized for embedded devices. In this post, we'll dive into a more technical overview of the different components of WPE, WebKit, and how they all fit together.</p>
</li><li class="listitem">
<img src="/assets/svg/wpe-birthday-cake-5-years.svg" alt="">
<time>Apr 21, 2022</time>
<h3><a href="/blog/01-happy-birthday-wpe.html">Happy birthday WPE!</a></h3>
<p>Welcome to the new Blog section on wpewebkit.org! Let's take some time to celebrate and recap how WPE evolved from the early prototyping days to the product empowering hundreds of millions of devices worldwide today.</p>
</li></ol>
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
      <a class="btn btn-light btn-sm"
       href="https://wpewebkit.org/release/">All Release Notes…</a>
    </p>
  </div>
</div>

{% include resources.html %}