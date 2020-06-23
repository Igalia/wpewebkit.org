---
layout: post
title: "Supported Hardware"
tags: [about] 
data: { dateless: "true" }
permalink: /about/supported-hardware.html 
--- 
WPE is currently running on a wide range of known supported hardware.

- Raspberry Pi 3
  * Cog FDO + WPEBackend-fdo + Mesa (vc4). Compositor: Weston, Cage (wlroots).
  * Cog + WPEBackend-rdk (USE_BACKEND_BCM_RPI) + rpi-userland. Compositor: n/a.
- Raspberry Pi 4
- [i.MX6 QuadPlus](https://www.nxp.com/products/processors-and-microcontrollers/arm-processors/i-mx-applications-processors/i-mx-6-processors/i-mx-6quadplus-processor-quad-core-high-performance-advanced-3d-graphics-hd-video-advanced-multimedia-arm-cortex-a9-core:i.MX6QP), 
  4x ARMv7 Cortex-A9 up to 1.2 GHz per core, Vivante GC2000 3D GPU, Vivante 2D(8-layer Composition) GPU GC-320, 1080p60 H264 decoding
- [i.MX6 Quad](https://www.nxp.com/products/processors-and-microcontrollers/arm-processors/i-mx-applications-processors/i-mx-6-processors/i-mx-6quad-processors-high-performance-3d-graphics-hd-video-arm-cortex-a9-core:i.MX6Q), 
  4x ARMv7 Cortex-A9 up to 1.2 GHz per core, Vivante GC2000 3D GPU, Vivante GC355 2D GPU, 1080p30 H264 decoding
- [i.MX8M](https://www.nxp.com/products/processors-and-microcontrollers/arm-processors/i-mx-applications-processors/i-mx-8-processors/i-mx-8m-family-armcortex-a53-cortex-m4-audio-voice-video:i.MX8M), 4x ARMv8 Cortex-A53, 4K H264 decoding
- [i.MX51](https://www.nxp.com/products/processors-and-microcontrollers/arm-processors/i-mx-applications-processors/i-mx-mature-processors/applications-processors-multimedia-high-performance-low-power-connectivity-arm-cortex-a8-core:i.MX516), 
  ARMv7 600 MHz Cortex-A8 CPU, 720p H264 decoding
- [RockChip RK3399](http://rockchip.wikidot.com/rk3399), 
  Dual-core ARM Cortex-A72 MPCore processor and Quad-core ARM Cortex-A53 MP Core processor, Mali-T860MP4 GPU
- Beaglebone
- nvidia Jetson ???
- Arris: 2 cores ARMv7, 2GB RAM (apparently divided in GPU/CPU like in Raspberry), BR2_PACKAGE_LINUX_FIRMWARE_BRCM_BCM43XXX=y, BR2_PACKAGE_BCM_REFSW_PLATFORM_72604=y
- Qualcomm 8017, 64-bit ARM. 512 MB of RAM. Qualcomm Adreno 306 GPU, 1080p @ 30fps.
  * Custom launcher + WPEBackend-bose (custom, uses Android buffer sharing) + Adreno proprietary driver (no Wayland support).
- Freescale i.MX6 Quad, 32-bit ARMv7 Cortex-A9, 1,2GHz. 1 GiB of RAM. Vivante GC2000, Ilitek LCD panel, 1024x600 @ 70Hz.
  * Custom launcher + Cog FDO + WPEBackend-fdo + Vivante proprietary driver. Compositor: Weston 3.0.0.
- x86_64, Intel GPUs.
  * Cog FDO + WPEBackend-fdo + Mesa (i965, iris). Compositor: Weston, Sway (wlroots), GNOME Shell.
  * Cog DRM + WPEBackend-fdo + Mesa (i965). Compositor: n/a.