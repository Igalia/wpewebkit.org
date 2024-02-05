---
title: Security Advisories
layout: page
sitemapChangeFrequency: monthly
pagination:
  data: collections.WSA
  size: 50
  alias: posts
  reverse: true
---
<style>
main section ol {
	display: grid;
	grid-template-columns: repeat(2,1fr);
	gap: 1.25em 1.5em;
	padding: 0;
	list-style: none;
}
@media (min-width: 640px) {
	main section ol {
		grid-template-columns: repeat(4,1fr);
	}
}
main section ol a[href] {
	display: block;
	padding: 1em;
	border: 1px solid;
	border-radius: 0.5em;
	text-decoration: none;
	box-shadow: 0.25em 0.25em 0.5em #0004;
}
main section ol time {
	display: block;
	margin-block: 0.25em;
	text-deocration: none;
	color: initial;
}
main section ol h2 {
	font-size: 1.33em;
	margin: 0 0 0.25em;
	text-decoration: underline;
	text-decoration-thickness: 1px;
	text-underline-offset: 0.2em;
}

main section ol > li:first-child {
	grid-column: 1 / -1;
	padding-block: 1.5em;
	font-weight: 700;
	font-size: 1.15em;
}
main section ol > li:first-child a[href] {
	border-width: 2px;
	box-shadow: 0.33em 0.33em 0.5em #0006;
	background: hsl(205deg, 85.7%, 97%);
}
main section ol > li:nth-child(n + 2):nth-child(-n + 7) {
	grid-column: span 2;
}
main section ol > li:nth-child(n + 8):nth-child(-n + 11) {
	padding-top: 2em;
}
main section ol > li:nth-child(n + 8) {
	font-size: smaller;
}
main section ol > li:nth-child(n + 8) a[href] {
	border-color: silver;
	box-shadow: 0.25em 0.25em 0.5em #0002;
}
main section ol > li:nth-child(n + 8) h2 {
	font-weight: 400;
}
main section ol a[href]:is(:hover, :focus) {
	background: hsl(205deg, 85.7%, 92%);
}
main section ol > li:first-child a[href]:is(:hover, :focus) {
	background: hsl(205deg, 85.7%, 85%);
}



</style>

<header class="page">

# Security Advisories

</header>

<section>
<ol reversed>
{%- for post in posts -%}
<li {% if forloop.first %}class="first"{% endif %}>
<a href="{{ post.url }}">
<time>{{ post.date | date: "%Y-%m-%d" }}</time>
<h2>{% if forloop.index < 8 %}
{{ post.data.title }}
{% else %}
{{ post.data.title | remove: "WebKitGTK+ and WPE WebKit " | remove: "WebKitGTK and WPE WebKit " }}
{% endif %}</h2>
{% if forloop.first %}<p>The latest security advisory available.</p>{% endif %}
</a>
</li>
{%- endfor -%}
</ol>
</section>

<nav class="pagination">
  <ol>
    <li>{% if pagination.href.previous %}<a href="{{ pagination.href.previous }}" title="Previous">«</a>{% else %}<span>«</span>{% endif %}</li>
    {%- for pageEntry in pagination.pages %}
    <li><a href="{{ pagination.hrefs[ forloop.index0 ] }}"{% if page.url == pagination.hrefs[ forloop.index0 ] %} aria-current="page"{% endif %}>{{ forloop.index }}</a></li>
    {%- endfor %}
    <li>{% if pagination.href.next %}<a href="{{ pagination.href.next }}" title="Next">»</a>{% else %}<span>»</span>{% endif %}</li>
  </ol>
</nav>
