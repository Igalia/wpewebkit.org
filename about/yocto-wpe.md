---
layout: post
title: "WPE Yocto images for Raspberry Pi"
tags: [about]
data: { dateless: "true" }
permalink: /about/yocto-wpe.html
---

One way to easily test WPE is to use Yocto images for Raspberry Pi
devices, write them in a micro-SD card and use them to boot the
device.


## Getting and flashing the image on a micro-SD card

Use the following values:
* **MACHINE**: one of **{raspberrypi3-mesa|raspberrypi4-64-mesa}**
  * raspberrypi3-mesa is 32-bit, to be able to test WPE in a more resource-starved environment
  * raspberrypi4-64-mesa is 64-bit
* **SDIMG**: based on the machine, '`core-image-weston-browsers-${MACHINE}.wic`', e.g. '`core-image-weston-browsers-raspberrypi3-mesa.wic`'
* **SDCARD_DEV**: whatever the device in your system, e.g. '`/dev/mmcblk0_REMOVE_THIS`'
  * **note that PREVIOUS DATA WILL BE ERASED**, be specially careful to not overwrite the wrong disk/card

The version of WPE in these images is **2.38.x**.


### Writing using '`bmaptool`' (faster, recommended) or classic '`dd`'

Homepage for bmaptool: [https://github.com/intel/bmap-tools](https://github.com/intel/bmap-tools)

You can typically get this in GNU/Linux-based distributions installing '`bmap-tools`' package if available.


### Combined instructions for Raspberry Pi 3B/3B+ (32-bit) and Raspberry Pi 4 (64-bit)

Choose one of:
```
MACHINE=raspberrypi3-mesa
```
or:
```
MACHINE=raspberrypi4-64-mesa
```

Then to download the image:
```
SDIMG="core-image-weston-browsers-${MACHINE}.wic"
wget https://wk-contrib.igalia.com/yocto/meta-webkit/browsers/stable/images/${MACHINE}/${SDIMG}.{bz2,bmap}
```

Export micro-SD device to write to:
```
SDCARD_DEV=/dev/mmcblk0_REMOVE_THIS
```

To write with '`bmaptool`':
```
sudo bmaptool copy "${SDIMG}".bz2 "${SDCARD_DEV}"
```

To write with '`dd`':
```
bzip2 -dc "${SDIMG}".bz2 | sudo dd of="${SDCARD_DEV}" bs=4k status=progress
```

## Set-up

After writing the micro-SD card and using it to boot the device, it
should boot to a graphical environment, using Weston (from Wayland),
with a minimal top panel bar and some icons within it.

To test WPE networking is needed, either by pluggin-in an ethernet
cable (with DHCP networking should set-up automatically), or by
clicking the "wireless" icon in the panel, that brings up a basic
script to help to set the network up (selecting SSID and password).


## Testing and demos

After having the network working, the browser (`cog`) can be launched
from one of the icons in the panel, or alternatively by opening a
terminal with another of the icons and launching it from the command
line.

There are also some environment variables that can be used to change
the behaviour of Cog's window (e.g.  fullscreen, maximized, specific
dimensions), as well as some key bindings that can be used to perform
certain actions with Cog or change its behaviour (e.g. toggle
fullscreen, reload, zooming, exit...), when running on Wayland. You
can check more details about this in
[https://github.com/Igalia/cog/blob/master/docs/platform-wl.md](https://github.com/Igalia/cog/blob/master/docs/platform-wl.md).

Example:

```
COG_PLATFORM_WL_VIEW_FULLSCREEN=1 cog -P wl "https://www.wikipedia.org/"
```


### Demos

This is a short list of suggested demos that can be used to check WPE
in action on the device and its performance.

| Name | Animation |
|:----|:---:|
| CSS transformation and animations in [WebKit poster circle example](https://webkit.org/blog-files/3d-transforms/poster-circle.html) | ![Image: WebKit poster circle demo](../assets/balena-wpe/postercircle.gif "WebKit poster circle demo") |
| Playing an embedded video from [wpewebkit.org](https://wpewebkit.org/) | ![Image: Embedded video demo](../assets/balena-wpe/wpewebkitorg.gif "Embedded video demo") |
| Playing [BouncyBalls](https://bouncyballs.org/) | ![Image: Playing BouncyBalls demo](../assets/balena-wpe/bouncyballs.gif "Playing BouncyBalls demo") |
| Rendering WebGL [Aquarium](https://webglsamples.org/aquarium/aquarium.html) demo | ![Image: Rendering WebGL Aquarium demo](../assets/balena-wpe/webgl_aquarium.gif "Rendering WebGL Aquarium demo") |
| Rendering WebGL [Abstract Shapes](https://mrdoob.neocities.org/023/) | ![Image: Rendering WebGL Abstract Shapes demo](../assets/balena-wpe/webgl_abstractshapes.gif "Rendering WebGL Abstract Shapes demo") |
