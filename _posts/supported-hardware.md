---
layout: post
title: "Supported Hardware"
tags: [about] 
data: { dateless: "true" }
permalink: /about/supported-hardware.html 
--- 

WPE is currently running on a wide range of hardware.

This page list configurations which are known to work sorted by manufacturer:

[[toc]]

Note that this list is not exhaustive, reports of unlisted configurations
are welcome.


### NXP

| Series  | GPU            | Driver      | WPE Backend | Cog Shells |
|---------|----------------|-------------|-------------|------------|
| i&period;MX 51 | Imageon Z460   |             |     | |
| i&period;MX 6  | Vivante GC2000 | Proprietary | fdo | fdo |
| i&period;MX 8M | Vivante GC7000 | Proprietary | fdo | fdo |

### Broadcom

| Device         | GPU | Driver | WPE Backend | Cog Shells |
|----------------|-----|--------|-------------|------------|
| Arris VIP5202W | VideoCore IV | Proprietary | rdk, `USE_BACKEND_BCM_NEXUS` or `USE_BACKEND_BCM_NEXUS_WAYLAND` | n/a |
| Raspberry Pi 3 | VideoCore IV | Proprietary | rdk, `USE_BACKEND_BCM_RPI` | n/a |
| Raspberry Pi 3 | VideoCore IV | Mesa vc4    | fdo | fdo, drm |
| Raspberry Pi 4 | VideoCore V  | Mesa v3d    | fdo | fdo |


### Qualcomm

| SoC  | GPU | Driver | WPE Backend | Cog Shells |
|------|-----|--------|-------------|------------|
| 8017 | Adreno 306 | Proprietary | Custom  | n/a |


### Nvidia

| Device | GPU | Driver | WPE Backend | Cog Shells |
|--------|-----|--------|-------------|------------|
| Jetson TK1 | Tegra K1 | | |


### RockChip

| SoC    | GPU          | Driver | WPE Backend | Cog Shells |
|--------|--------------|--------|-------------|------------|
| RK3399 | Mali T860MP4 | Proprietary | | |


### PC-style Hardware

| GPU | Driver | WPE Backend | Cog Shells |
|-----|--------|-------------|------------|
| AMD | Mesa amdgpu | fdo | fdo |
| Intel | Mesa i965 | fdo | fdo, drm   |
| Intel | Mesa iris | fdo | fdo, drm   |


### Other

| Device | GPU | Driver | WPE Backend | Cog Shells |
|--------|-----|--------|-------------|------------|
| Beaglebone | PowerVR SGX530 | Proprietary | |
