---
layout: page
title: "Blog"
tags: [blog]
data: { dateless: "true" }
htmlSitemapOrder: -4
sitemapChangeFrequency: weekly
sitemapPriority: 0.9
pagination:
  data: collections.blogpost
  reverse: true
  size: 7
permalink: /blog/{% if pagination.pageNumber > 0 %}{{ (pagination.pageNumber + 1) }}/{% endif %}
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

<div class="card">
	<ol reversed role="list" class="w-list-unstyled" style="margin: 1rem 0 1rem 0; list-style: none;">
	{%- for blogPost in pagination.items -%}
		<li class="listitem">
			<img src="{{ blogPost.data.thumbnail }}" alt="">
			<time>{{ blogPost.date | postDate }}</time>
			<h3><a href="{{ blogPost.url }}">{{ blogPost.data.title }}</a></h3>
			<p>{{ blogPost.data.preview | strip_html }}</p>
		</li>
	{%- endfor -%}
	</ol>

  <nav class="pagination">
    <ol>
      <li>{% if pagination.href.previous %}<a href="{{ pagination.href.previous }}" title="Previous">«</a>{% else %}<span>«</span>{% endif %}</li>
      {%- for pageEntry in pagination.pages %}
      <li><a href="{{ pagination.hrefs[ forloop.index0 ] }}"{% if page.url == pagination.hrefs[ forloop.index0 ] %} aria-current="page"{% endif %}>{{ forloop.index }}</a></li>
      {%- endfor %}
      <li>{% if pagination.href.next %}<a href="{{ pagination.href.next }}" title="Next">»</a>{% else %}<span>»</span>{% endif %}</li>
    </ol>
  </nav>
</div>
