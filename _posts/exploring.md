---
layout: post
title: "Exploring Embedded Browsers"
tags: [about]
permalink: /about/exploring.html
--- 
# Exploring Embedded Browsers

it would have been reasonable to  might have imagined that the number of browsers must be less than the number of households.
Embedded browsers are in everything these days - cars, signs, gaming systems, televisions and appliances - they're even in space.  The Web Platform is a frequently chosen foundational technology for many reasons, including:

* Because they are built on standards, they have great longevity 
* Because these standards are open, embedded systems can incorporate them without licensing fees or other worries.  
* Open standards with great longevity allows lots more things to benefit from the same investments
* The number of people with the basic skills to build things with web technologies is massive. 

However, the fact that over the past few years _billions_ of new devices have come online, and the implications of this is still under discussed.  We believe developers need to be able explore and understand this space, and that lessons here are potentially helpful to the larger web ecosystem as well. However, this can be challenging because embedded browsers are a little different...

## Why embedded browsers are different
For many of us, a browser is an application like the one you're probably using now.  You click an icon on your graphical operating system, navigate somewhere with a URL bar, search and so on.  You have bookmarks and tabs that you can drag around, and lots of other features.

But, for most embedded systems this isn't the case at all.  For most embedded systems there isn't a common desktop OS - in fact, you create the OS.  Part of the reason for this is that by and large they are not general purpose computing devices, they have slightly different security concerns and they also run on often radically different sorts of hardware than your desktop, laptop or many mobile devices.

So, what really _is_ an embedded browser?

### Browsers, engines and projects 

The application that you are running to read this is, in all likihood, a proper "browser".  This browser is built on one of 3 open source projects: WebKit, Chromium or Gecko.  These projects define something of an abstract browser - that is, they provide concrete implementations and an architecture through which something else (for example, a browser) can bind to the top layer in order to drive us from URL to URL, and to the bottom layer to fulfill things like actually painting on the screen, rendering graphics, receiving input from devices like keyboards, mice and pointing devices and connect to things like the speech subsystem.  

In terms of WebKit browsers, a "port" is something that provides things at those top and bottom layers.  The WebKit project has a few "official" ports that are 
available from [webkit.org/downloads/](https://webkit.org/downloads/).  WPE is the official port for embedded systems, and it adds another layer to the architecture allowing for more easily swappable __backends_ (the graphics layers, windowing and so on) and various easier bindings for programmatic top level control in Linux based systems.  Cog is another project that makes it easier to launch and drive WPE views.

In other words, WPE is designed to be _built_ and optimized for your embedded device in order to deliver the best performance.

What all of this means is that there isn't really a single "WPE" that is as easy to provide as many browsers that you're probably familiar with that is entirely representative of what your experience will be like.


### Easy ways to explore WPE
All of this said, we believe that enabling developers to explore the space is important for a whole lot of reasons.  Therefore, we've tried to make it easy for developers who aren't comfortable building entire embedded systems to get their hands on _something_ where they can begin exploring and learning useful things.

* Rasperry PI OS: Probably the most straight-foward way to learn a lot without a lot of experience in embedded is to try out our image that runs on Raspberry Pi OS.  Lots of developers have a Rasperry Pi sitting around somewhere and if you don't, you can one without a huge investment.  A Raspberry PI 3b, as of the time of this writing costs under $45, and can be connected to any display or keyboard.  The Raspberry Pi OS is a more or less full featured desktop OS, so it's easy to configure things like a WiFi connection, install a local server, setup SSH and so on.  The browser we've packed up with this distribution is _not_ especially optimized for the hardware, so you can get a pretty good feel of what running on really limited 32-bit hardware _can_ be like - and which sorts of performance relaated things we just owe to particular optimizations.

* Flatpak: We also provide a flatpak for Linux systems which may let your run on your current hardware/desktop OS.  If your graphics drivers are supported, this can be an easy way to let you explore what sorts of things can be supported by WPE and what some of the differences with a full browser are.


