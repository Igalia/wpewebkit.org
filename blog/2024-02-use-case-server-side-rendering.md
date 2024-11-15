---
title: "Use Case: Server-side headless rendering"
date: 2024-02-01
tags: [usecase]
permalink: /blog/2024-use-case-server-side-rendering.html
preview: Server-side rendering is another interesting use case for WPE that can unleash the potential of the Web platform for different use cases.
thumbnail: /assets/img/logo-server-side-rendering.png
---

<div class="success-top">
<img alt="WPE and server-side headless rendering" align="center" src="/assets/img/logo-server-side-rendering.png" srcset="/assets/img/logo-server-side-rendering@2x.png 2x">
</div>

In many distributed applications, it can be useful to run a light web browser on the server side to render some HTML content or process images, video and/or audio using JavaScript.

Some concrete use-cases can be:
- Video post-production using HTML overlays.
- Easy 3D rendering with WebGL that can be broadcasted as a video stream.
- Reusing the same JavaScript code between a frontend web application and the backend processing.

WPE WebKit is the perfect solution for all those use cases as it offers a lightweight solution which can run on low-end hardware or even within a container. It provides a lot of flexibility at the moment of choosing the backend infrastructure as WPE WebKit can, for instance, run from within a container with a very minimal Linux configuration (no need for any windowing system) and with full hardware acceleration and zero-copy of the video buffers between the GPU and the CPU.

Additionally, the fact that WPE WebKit is optimized for lower-powered devices, makes it also the perfect option for server-side rendering when scaling commercial deployments while keeping cost under control, which is yet another important factor to take into account when considering cloud rendering.