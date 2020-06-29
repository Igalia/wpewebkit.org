---
layout: post
title: "Exploring Embedded Browsers"
tags: [about]
data: { dateless: "true" }
permalink: /about/exploring.html 
--- 

Long ago, it might have been reasonable to have imagine that maximum number of browsers that could be deployed in the world would be based on the maximum number of desktop computers.  However, embedded browsers are in everything these days - cars, signs, tablets, gaming systems, televisions and appliances - they're even in space.  The Web Platform is a frequently chosen foundational technology for <em>many reasons</em>, including:

* Because they are built on standards, they have great longevity 
* Because these standards are open, embedded systems can incorporate them without licensing fees or other worries.  
* Open standards with great longevity allows lots more things to benefit from the same investments
* The number of people with the basic skills to build things with web technologies is massive. 

The fact that over the past few years _billions_ of new devices have come online, and the implications of this is still under discussed.  We believe developers need to be able explore and understand this space, and that lessons here are potentially helpful to the larger web ecosystem as well. However, this can be challenging because embedded browsers are a little different...

## Why embedded browsers are different
For many of us, a browser is an application like the one you're probably using now.  You click an icon on your graphical operating system, navigate somewhere with a URL bar, search and so on.  You have bookmarks and tabs that you can drag around, and lots of other features.

But, for most embedded systems this isn't the case at all.  For most embedded systems there isn't a common desktop OS - in fact, you create the OS.  Part of the reason for this is that by and large they are not general purpose computing devices, they have slightly different security concerns and they also run on often radically different sorts of hardware than your desktop, laptop or many mobile devices.

So, what really _is_ an embedded browser?

### Browsers, engines and projects 

The application that you are running to read this is, in all likelihood, a proper "browser".  This browser is built on one of 3 open source projects: WebKit, Chromium or Gecko.  These projects define something of an abstract browser - that is, they provide concrete implementations and an architecture through which something else (for example, a browser) can bind to the top layer in order to drive us from URL to URL, and to the bottom layer to fulfill things like actually painting on the screen, rendering graphics, receiving input from devices like keyboards, mice and pointing devices and connect to things like the speech subsystem.

In terms of WebKit browsers, a "port" is something that provides things at those top and bottom layers.  The WebKit project has a few "official" ports that are 
available from [webkit.org/downloads/](https://webkit.org/downloads/).  WPE is the official port for embedded systems, and it adds another layer to the architecture allowing for more easily swappable __backends_ (the graphics layers, windowing and so on) and various easier bindings for programmatic top level control in Linux based systems.  Cog is another project that makes it easier to launch and drive WPE views.

In other words, WPE is designed to be _built_ and optimized for your embedded device in order to deliver the best performance.

What all of this means is that there isn't really a single "WPE" that is as easy to provide as many browsers that you're probably familiar with that is entirely representative of what your experience will be like.


### Easy ways to explore WPE
All of this said, we believe that enabling developers to explore the space is important for a whole lot of reasons.  Therefore, we've tried to make it easy for developers who aren't comfortable building entire embedded systems to get their hands on _something_ where they can begin exploring and learning useful things.

* <span class="btn btn-primary text-light">[Install with Flatpak](https://blogs.igalia.com/zdobersek/2020/03/02/flatpak-repository-for-wpe/)</span>: If you have support for flatpak on your current hardware/desktop OS, and your graphics drivers are supported, there is an easy to install Flatpak for WPE.  This can be a very easy way to let you explore 'generally' if you have questions about sorts of things can be supported by WPE, or just want to experiment and learn more about what some of the differences with a full browser are.

* <span class="btn btn-primary text-light">[Raspberry Pi OS with WPE image](https://wk-contrib.igalia.com/debian/images/wpe-raspbian.img.zip)</span>: Probably the most straight-forward way to learn a lot without a lot of experience in embedded is to try out our image that runs on Raspberry Pi OS.  Just download and flash the image onto an SD card, plug it in and go. Lots of developers have a Raspberry Pi sitting around somewhere and if you don't, you can one without a huge investment.  A Raspberry PI 3b, as of the time of this writing costs under $45, and can be connected to any display or keyboard.  The Raspberry Pi OS is a more or less full featured desktop OS, so it's easy to configure things like a WiFi connection, install a local server, setup SSH and so on.  The browser we've packed up with this distribution is _not_ especially optimized for the hardware, so you can get a pretty good feel of what running on really limited 32-bit hardware _can_ be like - and which sorts of performance related things we just owe to particular optimizations.




