---
layout: post
title: "Blog"
tags: [blog]
data: { dateless: "true" }
permalink: /blog/
---

Don't miss any news related to WPE -- our blog aims to share information regarding WPE: explainers, how-to articles and general information regarding WPE, WebKit
and the Web platform. Also check out [the official WebKit blog](https://webkit.org/blog/) regarding news on the engine itself. 

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
	mask: linear-gradient(0deg, #FFF0, #FFF8 0.5em, #FFFF 1.5em);
}
.card ol h4 {
	
}
.card ol p, .card ol time {
	font-size: 90%;
}
</style>

<div class="card">
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

<a href="{{ '/blog.xml' | url }}"><i class="icon-feed"></i>&nbsp;&nbsp;Feed</a>
