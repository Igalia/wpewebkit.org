---
layout: post
title: "Blog"
tags: [blog]
data: { dateless: "true" }
permalink: /blog/
---

Don't miss any news related to WPE -- our blog aims to share information regarding WPE: explainers, how-to articles and general information regarding WPE, WebKit
and the Web platform. Also check out [the official WebKit blog](https://webkit.org/blog/) regarding news on the engine itself.

<br>
<h4>List of articles:</h4>

<div class="card">
  <ol role="list" class="w-list-unstyled" style="margin: 1rem 0 1rem 0">
    {%- for blogPost in collections.recentBlogPosts -%}
      <li class="listitem"><strong>{{ blogPost.date | postDate }}</strong>: <a href="{{ blogPost.url | url }}">{{ blogPost.data.title }}</a></li>
    {%- endfor -%}
  </ol>
</div>
<br>
<a href="{{ '/blog.xml' | url }}"><i class="icon-feed"></i>&nbsp;&nbsp;Feed</a>
