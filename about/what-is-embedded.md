---
layout: page
title: "What is an Embedded Browser?"
tags: [about]
data: { dateless: "true" }
permalink: /about/what-is-embedded.html
htmlSitemapOrder: -10
sitemapChangeFrequency: yearly
--- 

<header class="page">

# {{ title }}

Long ago, it might have been reasonable to imagine browsers only in the realm of desktop computers.  However, embedded browsers are in everything these days: cars, signs, tablets, gaming systems, televisions and appliances.  They're even in space!

</header>

The Web Platform is a frequently chosen foundational technology for _many reasons_, including:

* Because Web Platform technologies are built on standards, they have great longevity 
* Because these standards are open, embedded systems can incorporate them without licensing fees or other worries.  
* Open standards with great longevity allows lots more things to benefit from the same investments
* The number of people with the basic skills to build things with web technologies is massive 

The fact that over the past few years, _billions_ of new devices have come online, and the implications of this are still under-discussed.  We believe developers need to be able explore and understand this space, and that lessons learned here are potentially helpful to the larger web ecosystem as well. However, this can be challenging, because embedded browsers are a little different...

## Why embedded browsers are different
For many of us, a browser is an application like the one you're probably using now.  You click an icon on your graphical operating system (OS), navigate somewhere with a URL bar, search, and so on.  You have bookmarks and tabs that you can drag around, and lots of other features.

In contrast, an embedded browser is contained within another application or is built for a specific purpose and runs in an embedded system, and the application controlling the embedded browser does not provide all the typical features of browsers running in desktops.

Furthermore, for most embedded systems there isn't a common desktop <abbr title="Operating System">OS</abbr> for the browser to run on&nbsp;— in fact, the <abbr title="Operating System">OS</abbr> is built specifically for that type of device, and the embedded browser is built along with it.  Part of the reason for this is that, by and large, they are not general-purpose computing devices.  They have slightly different security concerns, and they also run on often radically different sorts of hardware than desktop, laptop or many mobile devices.

So, what really _is_ an embedded browser?

### Browsers, engines and ports

A "proper" _browser_ is, in all likelihood, the application in which you are reading this.  This browser is built on one of three open source projects: WebKit, Chromium or Gecko.  Each of these projects defines an _engine_&nbsp;— that is, they provide an architecture through which something else (e.g., a browser) can bind to the top layer of the engine in order to drive us from URL to URL, and use the engine’s bottom layer to do things like actually put content on the screen, render graphics, receive input from devices like keyboards, mice and pointing devices, and connect to things like the text-to-speech subsystem.

In terms of WebKit-based browsers, a "port" is the set of extra layers that provides facilities at those top and bottom layers of the engine.  The WebKit project has a few "official" ports that are available from [webkit.org/downloads/](https://webkit.org/downloads/).  Some, like Safari, are fully-featured desktop browsers.  WebKitGTK is a port for the GTK GUI toolkit, used among others by the desktop browser Epiphany.

WPE ("Web Platform for Embedded") is the official port for embedded systems, and it adds another layer to the architecture allowing for more easily swappable _backends_ (the graphics layers, windowing and so on) and simpler bindings for programmatic top-level control in Linux based systems.  Cog is another project that makes it easier to launch and drive WPE views.

In other words, WPE is designed to be _built_ and optimized for your embedded device in order to deliver the best performance.  What all of this means is that there isn't really a single "WPE" that’s as easy to provide as many browsers that you're probably familiar with.
