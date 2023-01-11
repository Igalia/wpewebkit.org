---
layout: post
title: "Try WPE images for Raspberry Pi"
tags: [about]
data: { dateless: "true" }
permalink: /about/rpi-yocto-wpe.html
---

One way to easily test WPE is to use Yocto images for Raspberry Pi
devices, write them in a micro-SD card and use them to boot the
device.


## Getting and flashing the image on a micro-SD card

### Downloads

#### Download for Raspberry Pi 4 (64-bit)

The current version of WPE in these images is **2.38.x**.

Download image with:
```
wget https://wk-contrib.igalia.com/yocto/meta-webkit/browsers/stable/images/raspberrypi4-64-mesa/core-image-weston-browsers-raspberrypi4-64-mesa_202205_4.0_kirkstone_r1_20221228073347.wic.bz2
```

#### Download for Raspberry Pi 3B/3B+ (32-bit)

The current version of WPE in these images is **2.38.x**.

Download image with:
```
wget https://wk-contrib.igalia.com/yocto/meta-webkit/browsers/stable/images/raspberrypi3-mesa/core-image-weston-browsers-raspberrypi3-mesa_202205_4.0_kirkstone_r1_20221228073347.wic.bz2
```

### Flash the image

To write with '`dd`' (replace '`mmcblk_XYZ`' with your actual target
device) and use the downloaded image, for example:

```
bzip2 -d core-image-weston-browsers-raspberrypi3-mesa_202205_4.0_kirkstone_r1_20221228073347.wic.bz2
sudo dd if=core-image-weston-browsers-raspberrypi3-mesa_202205_4.0_kirkstone_r1_20221228073347.wic of="/dev/mmcblk_XYZ" bs=4k status=progress
```

'`bmaptool`' can also be used and is typically (faster), we also provide the `.bmap` files to download.

## Set-up

After writing the micro-SD card and using it to boot the device, it
should boot to a graphical environment, using Weston (from Wayland),
with a minimal top panel bar and some icons within it.

To test WPE networking is needed, either by pluggin-in an ethernet
cable (with DHCP networking should set-up automatically), or by
clicking the "wireless" icon in the panel, that brings up a basic
script to help to set the network up (selecting SSID and password).


## Testing

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
