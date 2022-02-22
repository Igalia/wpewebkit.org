---
layout: post
title: "Try WPE with Balena"
tags: [about]
data: { dateless: "true" }
permalink: /about/balena-wpe.html
---

[Balena](https://balena.io) is a company in the area of IoT, with a
complete open-source stack of tools, images and services for deploying
IoT services based on Docker containers.  With Balena Cloud one can
manage and deploy services in a _fleet_ of devices and manage them
remotely.

As WPE maintainers, we created a so-called _block_ (somewhat akin to a
_service_) to allow users to deploy WPE-based services in devices
supported by Balena.


## Add your device to the public _fleet_

For a more step-by-step guide, check the [Getting Started
guide](https://www.balena.io/os/docs/raspberrypi3/getting-started/)
and select the device in the droplist below the header for your
particular case.

Joining the public _fleet_ for WPE with your hardware devices is a
convenient way to test WPE for a quick evaluation, because it takes
few steps to get the service running on several devices.

As a quick overview, these are the steps that you should perform:

1. Go to [https://hub.balena.io/wpe_webkit/balenawpe](https://hub.balena.io/wpe_webkit/balenawpe)

1. Select the appropriate device (there are fewer devices supported in
   this public _fleet_ than the general support of BalenaOS) and fill
   in basic configuration parameters, such as wireless network

1. Download the image to _flash_

1. Write the image to a micro-SD card or similar method appropriate
   for your use-case

1. After finishing with booting and configuration, the device(s)
   should be part of the public fleet and running `balena-wpe`


See [Service running and URLs](#service-running-and-urls) for testing.


## Manual installation


### Install BalenaOS

The first thing to do is to download the BalenaOS image (based on
Linux) for the device that you are interested in.

Check the [Getting Started
guide](https://www.balena.io/os/docs/raspberrypi3/getting-started/)
and select the device in the droplist below the header for your
particular case.

As a quick overview, these are the steps that you should perform:

1. Go to [https://www.balena.io/os/](https://www.balena.io/os/)

1. Select the appropriate type of device, and either the Production or
   Development flavour of the image, and download it

1. Write the image to a micro-SD card or similar method appropriate
   for your use-case


> _Note_: In the Getting Started guide it recommends to use
> 	  `balena-cli` tools, as it's easier to do the initial
> 	  configuration and write the image, but other methods can be
> 	  used.


### Run Balena-WPE _block_ (container service)

This can be done following the [Running your first Container](https://www.balena.io/os/docs/raspberrypi3/getting-started/#Running-your-first-Container)
section in the Getting Started guide, but using the URL for the source
of the `balena-wpe` block instead.

Using `balena-cli` tools, the basic steps are:

```shell
$ git clone https://github.com/Igalia/balena-wpe.git

$ cd balena-wpe

$ balena push devicename.local
```

The first time it will be slow because the base images need to be
pulled into the device, but subsequent operations will be faster.

During all of these operations, the log messages are shown in the
console where these commands were issued, to see the progress or
possible problems.

See [Service running and URLs](#service-running-and-urls) for testing.


## Service running and URLs

After the service starts, it should show a website in the screen
connected to your device.  By default it loads
[https://wpewebkit.org](https://wpewebkit.org), but this can be
changed with the environment variable `WPE_URL` in the container.

Additionally, this _block_ ships with
[tohora](https://github.com/mozz100/tohora/), which is a simple
interface to change dynamically the URL being shown.  It can be
accessed in port 8080, something like: `http://devicename.local:8080/`.


## Demos

| Name | Animation |
|:----|:---:|
| CSS transformation and animations in [WebKit poster circle example](https://webkit.org/blog-files/3d-transforms/poster-circle.html) | ![Image: WebKit poster circle demo](../assets/balena-wpe/postercircle.gif "WebKit poster circle demo") |
| Playing an embedded video from [wpewebkit.org](https://wpewebkit.org/) | ![Image: Embedded video demo](../assets/balena-wpe/wpewebkitorg.gif "Embedded video demo") |
| Playing [BouncyBalls](https://bouncyballs.org/) | ![Image: Playing BouncyBalls demo](../assets/balena-wpe/bouncyballs.gif "Playing BouncyBalls demo") |
| Rendering WebGL [Aquarium](https://webglsamples.org/aquarium/aquarium.html) demo | ![Image: Rendering WebGL Aquarium demo](../assets/balena-wpe/webgl_aquarium.gif "Rendering WebGL Aquarium demo") |
| Rendering WebGL [Abstract Shapes](https://mrdoob.neocities.org/023/) | ![Image: Rendering WebGL Abstract Shapes demo](../assets/balena-wpe/webgl_abstractshapes.gif "Rendering WebGL Abstract Shapes demo") |


## Further info

Check this collection of blog posts for more info, tips, new releases,
etc:

* [https://http503.gvatas.in/category/services/balena/](https://http503.gvatas.in/category/services/balena/)
