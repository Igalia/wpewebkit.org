---
title: Releases
layout: page
sitemapChangeFrequency: yearly
sitemapPriority: 0.7
---
<header class="page">

# Releases

</header>

<section class="content-section bg-light small-section">
	<div class="container text-center">
		<div class="row">
			<div class="col-lg-10 mx-auto lead text-left">
			{%- for pkg in collections.pkgCatalog -%}
				<article>
					<h2>{{ pkg[0] }}</h2>
					{%- assign package = pkg[1] -%}
					<header>
						<p>
						<strong>Stable</strong>
						<a href="{{ package.latestStable.url }}">{{ package.latestStable.version }}</a>
						</p>
						<p>
						<strong>Development</strong>
						<a href="{{ package.latestDev.url }}">{{ package.latestDev.version }}</a>
						</p>
					</header>
					<h3>Recent releases</h3>
					<ol>
					{%- for entry in package.recent -%}
						<li class="{{ entry.type }}"><a href="{{ entry.url }}">{{ entry.version }}</a> <time datetime="{{ entry.date }}">{{ entry.date | dateString }}</time></li>
					{%- endfor -%}
					</ol>
					<details>
					<summary>Older releases ({{ package.list.length }})</summary>
					<ol>
					{%- for entry in package.list -%}
						<li class="{{ entry.type }}"><a href="{{ entry.url }}">{{ entry.version }}</a> <time datetime="{{ entry.date }}">{{ entry.date | dateString }}</time></li>
					{%- endfor -%}
					</ol>
					</details>
				</article>
			{%- endfor -%}
			</div>
		</div>
	</div> 
</section>

<style type="text/css">
.row {
	--stableBg: hsla(100deg,80%,90%,0.25);
	--unstableBg: rgba(0,0,0,0.05);
}

.row > div {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.row article {
	margin-bottom: 2em;
	padding: 0.5em;
	width: 95%;
}
@media (min-width: 50em) {
	.row article {
		width: 45%;
	}
}

.row :focus {
	outline: 5px solid gray;
}
.row article h2 {
	padding: 0.25em;
	margin: 0;
	border: 1px solid #000;
	color: white;
	background: #1593ED;
}
.row article header {
	display: flex;
	margin-bottom: 0.5em;
	border: 1px solid;
	border-top: none;
}
.row article header p {
	width: 50%;
	margin: 0;
	background-color: var(--unstableBg);
}
.row article header p:first-child {
	background-color: var(--stableBg);
	border-right: 1px solid #000;
}
.row article header p > * {
	display: block;
	text-align: center;
	font-weight: 700;
}
.row article h3 {
	padding-left: 0.42em;
	font-size: 1.1em;
	font-weight: normal;
	font-style: italic;
}
.row article ol {
	margin: 0;
	padding: 0;
	margin-left: 0.25em;
	list-style: none;
}
.row article ol li {
	display: grid;
	grid-template-columns: minmax(6.5ch,max-content) auto;
	gap: 0.25em;
	margin: 0.25em 0;
}
.row article ol li a[href] {
	border: 1px solid rgba(0,0,0,0);
	font-weight: normal;
	padding: 0 0.25em;
	color: #155d74;
}
.row article ol li a[href]:hover,
.row article ol li a[href]:focus {
	color: #053d44;
}
.row article ol li.stable a[href] {
	border-color: rgba(0,0,0,0.25);
	border-radius: 0.25em;
	background-color: var(--stableBg);
}
.row article ol li time {
	opacity: 0.75;
	font-weight: 400;
	font-size: 85%;
	margin-top: 0.25em;
}
.row article details {
	margin-top: 0.5em;
	margin-left: 0.67em;
}
.row article details summary {
	font-style: italic;
	font-weight: 400;
}
</style>