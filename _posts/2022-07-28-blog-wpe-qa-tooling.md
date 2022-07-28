---
layout: post
title: "WPE QA and tooling"
tags: [blogpost]
author: lmoura
permalink: /blog/04-wpe-qa-tooling.html
---

In the previous posts, my colleagues Claudio and Miguel wrote respectively about the <a href="/blog/02-overview-of-wpe.html">components</a> and the <a href="/blog/03-wpe-graphics-architecture.html">graphics</a> architecture of WPE. Today, you'll see our efforts to improve the quality of both WPE and the experience of working and using it. If you haven't read the previous entries in this blog post series about <a href="https://wpewebkit.org/">WPE</a>, we recommend you to start with the <a href="/blog/01-happy-birthday-wpe.html">first post in the series</a> for an introduction, and then come back to this.

## Automated testing

Testing is an essential part of the WebKit project, primarily due to the large number of use cases covered by HTML/CSS/Javascript specifications and the need for the project to work correctly in a wide range of configurations.

As an official port of WebKit, WPE uses the former's testing infrastructure, based on [BuildBot](https://buildbot.net/). There are two primary servers, [one working as an early warning system](https://ews-build.webkit.org) by testing the patches before they're committed to the main repository, and [another](https://build.webkit.org) for more extensive testing after accepting the incoming changes.

<div align="center">
<img style="width: 75%" alt="build.webkit.org screenshot" align="center" src="{{ '/assets/build-webkit-org-screenshot.png' | url }}">
</div>

<br>

Currently, the WPE testing bots target debug and release configurations using the [Flatpak](https://flatpak.org/) SDK (more on it later in this article) on 64bit Intel-based Linux Debian systems. We have plans of adding bots running on Raspberry Pi boards in the future. Alongside nightly testing, we keep builder bots covering the [Ubuntu LTS/Debian versions](https://trac.webkit.org/wiki/WebKitGTK/DependenciesPolicy) we support. After August 14th, 2022, the earliest supported versions will be Ubuntu 20.04 LTS and Debian 11 (Bullseye).

### Test suites

Initially, the WPE [builder bots](https://build.webkit.org/#/builders?tags=%2BWPE&tags=%2BBuild) build WPE in both release and debug configurations and feed the built packages into the [tester bots](https://build.webkit.org/#/builders?tags=%2BWPE&tags=%2BTests), which run some test suites according to their configuration, each suite focused in one aspect of the project:

* Layout tests: The main suite tests whether WebKit correctly renders web pages and its implementation of web APIs. This suite comprises both WebKit's test cases and the imported tests from [Web Platform Test](https://web-platform-tests.org/). At the time of writing, it runs over 50,000 test cases.
* API Tests: This suite tests the API provided to developers by WebKit and its ports. For example, this step tests the WPE API used in [Cog](https://github.com/Igalia/cog).
* Javascriptcore tests: Covers the JavascriptCore engine, running  WebKit's tests alongside [test262](https://github.com/tc39/test262), the reference test suite for JS/ECMAScript implementations.
* WebDriver: Tests from [Selenium](https://www.selenium.dev/selenium/docs/api/py/index.html) and [W3C WebDriver](https://www.w3.org/TR/webdriver/) APIs for browser automation.
* Other small suites: Tests for WebKit's tooling components.

Due to a large number of tests and the fast development of both WebKit and the specifications - it's not uncommon to have dozens of daily commits touching dozens of tests - it's hard to keep the testing bots green.

For example, while we try to make the tests work on all platforms, many old layout tests use the expected.txt scheme, where the render tree is printed in a textual format with the text sized in pixels for every node. While this works fine in most cases, many tests have minor differences between the expected result in the Mac platform and the WPE/GTK platform. One of the causes is the font rendering particularities of each port.

Thankfully, this situation improved significantly since the beginning of the project. Among the efforts, many tests are now using a "reference" HTML file, which are HTML files that render to the same expected result as the test case, so both the test case and the reference will use the same font rendering scheme and can be compared pixel by pixel.

## Building and running WPE

This section focuses on the experience of building and running WPE in a regular Linux x86_64 system. In a future post, we'll cover building for and running on embedded devices.

### Checking out the code

Recently, [WebKit moved to GitHub](https://github.com/WebKit/WebKit), so you can clone it directly from there:

```
$ mkdir ~/dev
$ git clone https://github.com/WebKit/WebKit.git
```

Note: Due to the size of the project history, you might want to use `--depth=1` to clone a single revision, followed by `git pull --unshallow` from inside the cloned repository to fetch the history if needed.

There's more information in [WebKit's GitHub wiki](https://github.com/WebKit/WebKit/wiki/Contributing#checking-out-WebKit) about setting up the git checkout for contributing code back to WebKit. It'll set up some git hooks to do some tasks required by the project, like formatting the commit message and automatically linking the pull request to the Bugzilla issue.

All commands in the following sections are run from inside the cloned repository.

### Updating the dependencies (aka The WebKit Flatpak SDK)

Like most complex software projects, WebKit has a reasonably extensive list of dependencies. Keeping a reference set of their versions frozen during development is desirable to make it easier to reproduce bugs and test results. In older times, WPE and WebKitGTK used [JHBuild](https://gnome.pages.gitlab.gnome.org/jhbuild/) to freeze a set of dependencies. While this worked for a long time, it did not cover all dependencies. Sometimes, there could be minor differences in the layout tests between the reference test bots and the developer machine due to some dependency resolved by the host system outside JHBuild.

To improve reproducibility, since 2020, WPE and WebKitGTK have been using an SDK based on Flatpak (kudos to my colleagues [Thibault Saunier](https://blogs.gnome.org/tsaunier/) and [Philippe Normand](https://base-art.net)), with a much more extensive dependency coverage and isolation from the host system. Alongside the dependencies, it ships [some tools like rr](https://trac.webkit.org/wiki/WebKitFlatpakSDK/DebugWithRR) and [supports tools like `clangd`](https://trac.webkit.org/wiki/WebKitEnablingFlatpakClangd). Almost all bots enable this SDK, the exception being the LTS/Stable bots; as in the latter, we want to build with the already available packages in each distribution.

```
$ ./Tools/Scripts/update-webkit-flatpak
```

The command will set up the local flatpak repository at `./WebKitBuild/UserFlatpak` with the downloaded SDK and create some bundled icecc toolchains. This enables distributed builds in local networks..

### Building

Once the SDK download finishes, you can use the helper script `./Tools/Scripts/build-webkit`, which wraps the `cmake` command with some pre-set options commonly used in normal development, like enabling developer-only features usually disabled in regular builds. Manually invoking cmake is possible, although usually only when you want more control over the build. To build WPE in release mode, use:

```
$ ./Tools/Scripts/build-webkit --release --wpe
```

Optionally, you can pass it multiple arguments to be fed directly to make or cmake with the switches  `--makeargs=...` and `--cmakeargs=...`, respectively. For example, `--makeargs="-j8"` will limit make to 8 parallel jobs and `--cmakeargs="-DENABLE_GAMEPAD=1"` will enable gamepad support (requires `libmanette`, bundled in the SDK).

The first build might take a while (up to almost one hour in a regular laptop). Fortunately, the SDK uses `ccache` to avoid recompiling the same object files, so subsequent builds without significant changes usually are faster. For more info on speeding the build, check [the wiki](https://trac.webkit.org/wiki/WebKitGTK/SpeedUpBuild).

### Running the browser (Cog)

To run Cog, the reference WPE browser, you need a Wayland server, which is common in most Linux systems nowadays.

```
$ ./Tools/Scripts/run-minibrowser --wpe --release https://wpewebkit.org/
```

<div align="center">
<img style="width: 75%" alt="Cog with GTK4 shell screenshot" align="center" src="{{ '/assets/gtk-cog-screenshot.png' | url }}">
</div>
<br>

### Running some tests

To run the API tests, which reside in `Tools/TestWebKitAPI/Tests/`, you can use the following command:

```
$ ./Tools/Scripts/run-wpe-tests --release --display-server=headless
```

Other test suites:

* Layout tests: `./Tools/Scripts/run-wpe-tests`
* JSC tests: `./Tools/Scripts/run-javascriptcore-tests`
* WebDriver: `./Tools/Scripts/run-webdriver-tests`

As stated when we described the test suites, the main challenge in testing is keeping up with the fast pace of development, as it's not uncommon to have some revisions updating hundreds of tests.

### Contributing code to WPE

After hacking locally, you can submit your changes following the workflow listed in the [WebKit wiki](https://github.com/WebKit/WebKit/wiki/Contributing#contributing-code).

## Testing WPE in the wild

If you don't want to build your WPE build or image, there are some options to [get a taste of WPE](https://wpewebkit.org/about/exploring.html) listed on our website, including:

* Prebuilt distribution packages
    * For [Debian](https://packages.debian.org/search?searchon=sourcenames&keywords=wpewebkit), [Ubuntu](https://packages.ubuntu.com/search?keywords=wpewebkit&searchon=sourcenames&suite=all&section=all), [Raspbian](https://archive.raspbian.org/raspbian/pool/main/w/wpewebkit/), [Arch Linux](https://archlinux.org/packages/extra/x86_64/wpewebkit/), and [Fedora](https://copr.fedorainfracloud.org/coprs/philn/wpewebkit/)
* [Flatpak image](https://wpewebkit.org/about/flatpak.html)
* Prebuilt Raspberry Pi (3B, 3B+ and 4) images
    * For [stable](https://wk-contrib.igalia.com/debian/images/wpe-raspbian.img.zip) and [nightly](https://wk-contrib.igalia.com/debian/images/nightly/wpe-raspbian.img.zip) releases
* [Balena blocks](https://wpewebkit.org/about/balena-wpe.html)

Some of these options, like the prebuilt images and the Balena blocks, will be the subject of future blog posts in this series.

## Final thoughts

With this, we conclude this brief overview of <a ref="https://wpewebkit.org/">WPE</a> automated testing and the main tools we use in our daily work with WPE. In future posts in this area we'll go deeper in other subjects like testing on embedded boards and debugging practices.

If this post got you interested in collaborating with <a ref="https://wpewebkit.org/">WPE</a> development, or you are in need of a web engine to run on your embedded device, feel free to <a href="https://www.igalia.com/contact/">contact us</a>. We'll be pleased to help!

We also have open positions at the WebKit team at <a href="https://www.igalia.com/">Igalia</a>. If you're motivated by this field and you're interested in developing your career around it, you can apply <a href="https://www.igalia.com/jobs/browsers_webkit_position">here</a>!
