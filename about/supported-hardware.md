---
layout: page
title: "Supported Hardware"
tags: [about] 
data: { dateless: "true" }
permalink: /about/supported-hardware.html 
htmlSitemapOrder: -1
sitemapChangeFrequency: monthly
sitemapPriority: 0.7
resources: [
	{
		"title": "Why Choose WPE?",
		"url": "/about/a-good-choice.html",
		"text": "WPE WebKit is widely adopted in many industries, including digital signage, home appliances, set-top boxes, and automative and in-flight infotainment systems."
	},
	{
		"title": "Get WPE",
		"url": "/about/get-wpe.html",
		"text": "Explore the different methods to get the source code and/or binaries for WPE"
	},
	{
		"title": "Igalia",
		"url": "https://igalia.com",
		"text": "The maintainer and sponsor of WPEwebkit, Igalia is an open-source and web standards consultancy spanning the globe."
	}
]
--- 
<style type="text/css">
.tables {
	padding-bottom: 8em;
}

.tables h2 {
	font-size: 1.5em;
	margin-block: 2em 0.125em;
}
.tables code {
	color: #C00;
}
@media (max-width: 450px) {
	.tables code {
		word-break: break-all;
	}
}

table, table thead, table th, table tbody tr:nth-child(n) {
	background: transparent;
	border: none;
}
table {
	width: 100%;
	table-layout: fixed;
	border-collapse: separate;
	border-spacing: 0;
	font-size: 90%;
	border-bottom: 2px solid black;
	margin: 0;
}
@media (min-width: 45rem) {
	table thead tr :nth-child(1) {
		width: 18ch;
	}
	table thead tr :nth-child(2) {
		width: 21ch;
	}
	table thead tr :nth-child(4) {
		width: 35ch;
	}
	table thead tr :nth-child(5) {
		width: 13ch;
	}
}
table :is(thead, tbody) tr > * {
	padding-left: 0;
	vertical-align: top;
}
table thead tr > * {
	padding-block: 0.25em 1px;
	border-top: 1px solid silver;
	border-bottom: 2px solid black;
	font-size: smaller;
	font-weight: 400;
	text-transform: uppercase;
	text-align: left;
	color: #444;
}
table thead tr > th:first-child {
	font-weight: 700;
}
table tbody tr:nth-child(n + 2) > * {
	border-top: 1px solid silver;
}
</style>

<nav class="sidebar">
<ul>
<li class="currentPage"><a href="/about/supported-hardware.html">Supported Hardware</a></li>
<li><a href="/about/a-good-choice.html">Why Choose WPE?</a></li>
<li><a href="#wpe-in-action">WPE in Action</a></li>
</ul>
</nav>


<header class="page">

# Supported Hardware

WPE is currently running on a wide range of hardware. This page lists configurations which are known to work, sorted by manufacturer.

</header>

<section class="tables">

Note that this list is not exhaustive. Reports of unlisted configurations are welcome.

## NXP

| Series  | GPU            | Driver      | WPE Backend | Cog Shells |
|---------|----------------|-------------|-------------|------------|
| i&period;MX 51 | Imageon Z460   | freedreno (reverse-engineered) | fdo | fdo, drm |
| i&period;MX 53 | Imageon Z460   | freedreno (reverse-engineered) | fdo | fdo, drm |
| i&period;MX 6  | Vivante GC2000 | etnaviv (reverse-engineered) | fdo | fdo, drm |
| i&period;MX 6  | Vivante GC2000 | Vivante (Proprietary) | fdo | fdo |
| i&period;MX 6  | Vivante GC2000 | Vivante (Proprietary) | rdk, `VIV_IMX6_EGL` | n/a |
| i&period;MX 8M | Vivante GC7000 | etnaviv (reverse-engineered) | fdo | fdo, drm |
| i&period;MX 8M | Vivante GC7000 | Vivante (Proprietary) | fdo | fdo |

## Broadcom

| Device         | GPU | Driver | WPE Backend | Cog Shells |
|----------------|-----|--------|-------------|------------|
| Arris VIP5202W | VideoCore IV | Proprietary | rdk, `BCM_NEXUS` or `USE_BACKEND_BCM_NEXUS_WAYLAND` | n/a |
| Raspberry Pi 3 | VideoCore IV | Proprietary | rdk, `BCM_RPI` | n/a |
| Raspberry Pi 3 | VideoCore IV | Mesa vc4    | fdo | fdo, drm |
| Raspberry Pi 4 | VideoCore V  | Mesa v3d    | fdo | fdo |


## Qualcomm

| Device  | GPU | Driver | WPE Backend | Cog Shells |
|---------|-----|--------|-------------|------------|
| APQ8017 | Adreno 306 | Proprietary | Custom  | n/a |


## Nvidia

| Device | GPU | Driver | WPE Backend | Cog Shells |
|--------|-----|--------|-------------|------------|
| Jetson TK1 | Tegra K1 | | |


## RockChip

| Device | GPU          | Driver | WPE Backend | Cog Shells |
|--------|--------------|--------|-------------|------------|
| RK3399 | Mali T860MP4 | panfrost (reverse-engineered) | fdo | fdo |
| RK3399 | Mali T860MP4 | Mali (Proprietary) | | |


## PC-style Hardware

| Device | GPU | Driver | WPE Backend | Cog Shells |
|--------|-----|--------|-------------|------------|
| Any | AMD | Mesa amdgpu | fdo | fdo |
| Any | Intel | Mesa i965 | fdo | fdo, drm   |
| Any | Intel | Mesa iris | fdo | fdo, drm   |


## Other

| Device | GPU | Driver | WPE Backend | Cog Shells |
|--------|-----|--------|-------------|------------|
| Beaglebone | PowerVR SGX530 | Proprietary | | |

</section>

{% include resources.html %}
