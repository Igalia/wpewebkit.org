---
layout: post
title: "Happy birthday WPE!"
tags: [blogpost]
author: nzimmermann
permalink: /blog/01-happy-birthday-wpe.html
---

Welcome to the new *Blog* section on [wpewebkit.org]({{ '/' | url }})!

Today is a special day for **Igalia**, especially for those colleagues that work on WebKit:
Five years ago, on the **21st of April 2017**, the WPE port was announced by our colleague
[Žan Doberšek](https://www.igalia.com/team/zdobersek) on the [WebKit mailing list](https://lists.webkit.org/pipermail/webkit-dev/2017-April/028923.html).

Let's take some time to celebrate and recap how WPE evolved from the early prototyping days to the product empowering **hundreds of millions of devices**
worldwide today.

<div align="center">
<img style="width: 75%;" src="{{ '/assets/svg/wpe-birthday-cake-5-years.svg' | url }}" alt="Celebrating WPEs 5th birthday with a cake">
</div>

## WPE is ... what exactly?

To get everyone on the same page, let's start by reiterating what WPE is: **a WebKit port optimized for embedded devices**.
It allows you to embed a full-fledged **Web browser engine** that supports a large set of modern Web technologies into your product.
WPE itself is *not* a Web browser such as Safari, Chrome or Firefox but contains the underlying building blocks to load, parse and
render websites. To learn more about the distinction between a Web browser and a Web browser engine read [our explainer]({{ '/about/exploring.html' | url }}).

You might ask yourself, what does *"optimized for embedded devices"* mean in practice? Unlike most other WebKit ports, WPE does not
rely on a specific user-interface toolkit, such as [Qt](https://qt.io), [GTK](https://gtk.org), [Cocoa](https://en.wikipedia.org/wiki/Cocoa_(API)),
etc., nor does it offer any integration with these kinds of toolkits. WPE WebKit is light-weight, integrates well with a
[variety of hardware configurations]({{ '/about/supported-hardware.html' | url }}), and only requires a minimum set of APIs on your side:
**[EGL](https://en.wikipedia.org/wiki/EGL_(API))** and **[OpenGL ES 2](https://en.wikipedia.org/wiki/OpenGL_ES)**.

## The early days 2014 - 2017

The idea for a new WebKit port was born in 2014, as part of a collaboration between [Metrological](https://www.metrological.com)
and [Igalia](https://www.igalia.com). The goal of this collaboration was to have a WebKit port running efficiently on their set-top boxes,
utilizing a modern **[Wayland](https://wayland.freedesktop.org)** based Linux graphics architecture. Back then, **QtWebKit** was popular
among embedders; however, it was unmaintained and its future was unclear since [Qt wanted to transition](https://www.qt.io/blog/2014/01/23/qt-webengine-technology-preview-available)
from using [WebKit](https://www.webkit.org) to [Blink](https://www.chromium.org/blink).

In September 2014 a group of Igalians forked the *WebKitGtk* port, removed all GTK toolkit dependencies, and prototyped what was necessary
to achieve the goal: rendering websites without involving any of the traditional toolkits and instead utilizing a Wayland-based rendering approach.

During development it became apparent that this WebKit port is generally useful for all our customers and the community as a whole.
Therefore Igalia decided to aim for an even more flexible design, where *Wayland* is only one of the possible backends.
Our fellow Igalian [Miguel Gomez](https://www.igalia.com/team/magomez) reported in his [late 2016 blog post](https://blogs.igalia.com/magomez/2016/12/19/wpe-web-platform-for-embedded)
about this change, and the renaming of the port: **WPE** appears for the first time in public.

The project's removal of the Wayland dependency and the subsequent reorganization lead to the [architecture we have today]({{ '/about/architecture.html' | url }}),
consisting of not only the WPE port itself but a whole ecosystem of projects such as [libwpe](https://github.com/WebPlatformForEmbedded/libwpe),
[WPEBackend-fdo](https://github.com/Igalia/WPEBackend-FDO), [WPEBackend-rdk](https://github.com/WebPlatformForEmbedded/WPEBackend-rdk), etc.,
that together form the **WPE** project.

## 2017 - today

After months of focused engineering efforts, the downstream work was finished and Igalia was ready to announce **WPE** to the
[public](https://lists.webkit.org/pipermail/webkit-dev/2017-April/028923.html) on the **17th of April 2017**, with the promise that Igalia
will maintain the port alongside the existing **WebKitGtk** port. That is not a cheap bill: maintaining an upstream port is a recurring
multi-million dollar investment. Just in order to keep the port itself healthy, as updates are made all around it, requires infrastructure,
bots and a team of fully dedicated engineers to deal with maintenance, testing, triaging, tickets, etc. To implement new Web standards, fix
related bugs or design and contribute features requires an even more considerable amount of resources.

Since then, Igalia ramped up the WPE investments and steadily advanced the port while helping customers to integrate WPE into their
environments. Today WPE is healthy, runs on many platforms, and offers the most flexible browser architecture at present. Also, thanks in great
part to this work, Igalia was responsible for nearly **16.5%** of all commits in WebKit itself last year, helping make the larger project
and ecosystem around it healthier too.

However, none of this would be possible without the commitment of many [Igalians](https://www.igalia.com/team) pushing the project forward every day for the past **8 years**.
A new **People Behind WPE** series will be launched soon: over the following months, the Igalians involved with WPE will introduce themselves, their area of
expertise, and talk about a specific WPE related technical topic. You'll get to know the people behind the product and a first-class technical overview
of individual parts of the WPE architecture! We plan to release a new article every 3-4 weeks, so be sure to visit [wpewebkit.org/blog]({{ '/blog/' | url }})
again soon and enjoy the upcoming **People Behind WPE** series.

Feel free to spread the word and make noise about WPE. Stay healthy, stay tuned!
