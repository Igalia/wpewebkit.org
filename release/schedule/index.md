---
layout: post
title: Release Schedule
---

WPE WebKit follows a 6-month development cycle:

- There are two feature releases are done every year, typically in March
  and September.
- Within feature releases there may be any number of bug fix releases.
- Development releases are the base for the feature releases that follow
  them. They do not follow a fixed schedule in the release cycle.


WPE WebKit and [WebKitGTK](https://webkitgtk.org) share a fair amount of code.
Therefore, both projects produce their feature releases simultaneously,
and share the same release branches. For bug fix releases, the release
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
  at the API and ABI level.
- New `minor` releases may contain new features and backward-compatible
  changes in the public API. In general the ABI will remain compatible as
  well, because we actively avoid breaking it unless strictly needed.


## Compatible Components

The following table summarizes which *stable* releases of libwpe, WPE WebKit,
and WPEBackend-fdo are compatible and tested with each other.

| **WPE WebKit** | **libwpe** | **WPEBackend-fdo** |
|:--------------:|:----------:|:------------------:|
| 2.24.x         | 1.2.x      | 1.2.x              |
| 2.22.x         | 1.0.x      | 1.0.x              |
| 2.20.x         | \< 1.0.0   | \< 1.0.0           |

Distributors and packagers are strongly advised to use the versions above.
Note that libwpe used to be called wpebackend before version 1.0.x — it was
renamed to avoid confusion.
