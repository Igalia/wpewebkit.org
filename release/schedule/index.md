---
layout: post
title: Release Schedule
skipHtmlSitemap: false
sitemapChangeFrequency: yearly
sitemapPriority: 0.4
---

WPE WebKit follows a 6-month development cycle:

- There are two feature releases are done every year, typically in March
  and September.
- Within feature releases, there may be any number of bug-fix releases.
- Development releases are the base for the feature releases that follow
  them. They do not follow a fixed schedule in the release cycle.


WPE WebKit and [WebKitGTK](https://webkitgtk.org) share a fair amount of code.
Therefore, both projects produce their feature releases simultaneously,
and share the same release branches. For bug-fix releases, the release
teams for both projects try to sync their version numbers as well as they
can.


## Versioning Scheme

Version numbers follow the `major.minor.patch` numbering scheme. Changes to
the `major` version signify considerable architectural or API changes; the
`minor` version number changes throughout the development cycle. Even numbers
indicate stable releases and odd ones development releases. Lastly, the
`patch` number is incremented for each release, and for stable release
candidates it is bumped to `90`.

| **Kind**          | **Minor** | **Patch** |
|-------------------|:---------:|:---------:|
| Stable            | even      | any       |
| Development       | odd       | \< 90     |
| Release Candidate | odd       | ≥ 90      |


For stable releases the following is always true, as long as the `major`
version number stays the same:

- New `patch` releases are guaranteed to be backward-compatible *both*
  at the <abbr title="Application Program Interface">API</abbr> and <abbr title="Application Binary Interface">ABI</abbr> level.
- New `minor` releases may contain new features and backward-compatible
  changes in the public API. In general, the ABI will remain compatible as
  well, because we actively avoid breaking it unless strictly needed.


## Compatible Components

The following table summarizes which *stable* releases of libwpe, WPE WebKit,
WPEBackend-fdo, and Cog are compatible and tested with each other (updated
October 2024). Distributors and packagers are strongly advised to use the
versions listed below.

| **WPE WebKit** | **libwpe**   | **WPEBackend-fdo** | **Cog**      |
|:--------------:|:------------:|:------------------:|:------------:|
| 2.50.x         | 1.16.x       | 1.16.x             | 0.18.x       |
| 2.48.x         | 1.16.x       | 1.16.x             | 0.18.x       |
| 2.46.x         | 1.16.x       | 1.16.x, 1.14.x     | 0.18.x       |
| 2.44.x         | 1.16.x, 1.14.x | 1.14.x           | 0.18.x       |
| 2.42.x         | 1.14.x       | 1.14.x             | 0.18.x       |
| 2.40.x         | 1.14.x, 1.12.x | 1.14.x, 1.12.x | 0.16.x |
| 2.38.x         | 1.14.x, 1.12.x | 1.14.x, 1.12.x, 1.10.x | 0.16.x, 0.14.x, 0.12.x |
| 2.36.x         | 1.12.x, 1.10.x | 1.12.x, 1.10.x | 0.14.x, 0.12.x, 0.10.x | 
| 2.34.x         | 1.12.x, 1.10.x, 1.8.x | 1.12.x, 1.10.x | 0.12.x, 0.10.x, 0.8.x |
| 2.32.x         | 1.10.x, 1.8.x, 1.6.x | 1.10.x, 1.8.x | 0.10.x, 0.8.x |
| 2.30.x         | 1.8.x, 1.6.x | 1.10.x, 1.8.x      | 0.8.x, 0.6.x |
| 2.28.x         | 1.6.x        | 1.6.x              | 0.8.x, 0.6.x |
| 2.26.x         | 1.4.x        | 1.4.x              | 0.4.x        |
| 2.24.x         | 1.2.x        | 1.2.x              | 0.3.x        |
| 2.22.x         | 1.0.x        | 1.0.x              | 0.2.x        |
| 2.20.x         | \< 1.0.0     | \< 1.0.0           | ≤ 0.1.x      |


**Notes:**

- libwpe used to be called wpebackend before version 1.0.x — it was renamed to
  avoid confusion.
- Cog adopted the same versioning scheme as the rest of the components
  starting with the 0.6 series.
