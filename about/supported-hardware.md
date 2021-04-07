---
layout: post
title: "Supported Hardware"
tags: [about] 
data: { dateless: "true" }
permalink: /about/supported-hardware.html 
--- 

WPE is currently running on a wide range of hardware. This page lists configurations which are known to work, sorted by manufacturer:

[[toc]]

Note that this list is not exhaustive. Reports of unlisted configurations are welcome.


### NXP

| Series  | GPU            | Driver      | WPE Backend | Cog Shells |
|---------|----------------|-------------|-------------|------------|
| i&period;MX 51 | Imageon Z460   |             |     | |
| i&period;MX 53 | Imageon Z460   |             |     | |
| i&period;MX 6  | Vivante GC2000 | etnaviv (reverse-engineered) | fdo | fdo, drm |
| i&period;MX 6  | Vivante GC2000 | Vivante (Proprietary) | fdo | fdo |
| i&period;MX 6  | Vivante GC2000 | Vivante (Proprietary) | rdk, `USE_BACKEND_VIV_IMX6_EGL` | n/a |
| i&period;MX 8M | Vivante GC7000 | etnaviv (reverse-engineered) | fdo | fdo, drm |
| i&period;MX 8M | Vivante GC7000 | Vivante (Proprietary) | fdo | fdo |

### Broadcom

| Device         | GPU | Driver | WPE Backend | Cog Shells |
|----------------|-----|--------|-------------|------------|
| Arris VIP5202W | VideoCore IV | Proprietary | rdk, `USE_BACKEND_BCM_NEXUS` or `USE_BACKEND_BCM_NEXUS_WAYLAND` | n/a |
| Raspberry Pi 3 | VideoCore IV | Proprietary | rdk, `USE_BACKEND_BCM_RPI` | n/a |
| Raspberry Pi 3 | VideoCore IV | Mesa vc4    | fdo | fdo, drm |
| Raspberry Pi 4 | VideoCore V  | Mesa v3d    | fdo | fdo |


### Qualcomm

| Device  | GPU | Driver | WPE Backend | Cog Shells |
|---------|-----|--------|-------------|------------|
| APQ8017 | Adreno 306 | Proprietary | Custom  | n/a |


### Nvidia

| Device | GPU | Driver | WPE Backend | Cog Shells |
|--------|-----|--------|-------------|------------|
| Jetson TK1 | Tegra K1 | | |


### RockChip

| Device | GPU          | Driver | WPE Backend | Cog Shells |
|--------|--------------|--------|-------------|------------|
| RK3399 | Mali T860MP4 | panfrost (reverse-engineered) | | |
| RK3399 | Mali T860MP4 | Mali (Proprietary) | | |


### PC-style Hardware

| Device | GPU | Driver | WPE Backend | Cog Shells |
|--------|-----|--------|-------------|------------|
| Any | AMD | Mesa amdgpu | fdo | fdo |
| Any | Intel | Mesa i965 | fdo | fdo, drm   |
| Any | Intel | Mesa iris | fdo | fdo, drm   |


### Other

| Device | GPU | Driver | WPE Backend | Cog Shells |
|--------|-----|--------|-------------|------------|
| Beaglebone | PowerVR SGX530 | Proprietary | | |


<style type="text/css">
h3 {
	background: #1593ED;
	color: white;
	margin: 1.5em 0 0;
	padding: 0.25em 0.5em;
}

.row table {
	width: 100%;
	margin: 0;
}
.row table:last-of-type {
	margin-bottom: 3em;
}
.row th, .row td:nth-child(-n + 3) {
	white-space: nowrap;
}
.row th, .row td {
	line-height: 1.25;
	padding: 0.5em 0.75em;
}
</style>