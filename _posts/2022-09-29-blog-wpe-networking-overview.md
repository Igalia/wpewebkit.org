---
layout: post
title: "WPE Networking Overview"
tags: [blogpost]
author: pgriffis
permalink: /blog/04-wpe-networking-overview.html
thumbnail: /assets/networking-layers.svg
preview: In this post we'll cover the many layers of the networking stack that WPE uses including libsoup and glib.
---

At the heart of any browser engine is networking; Connecting with services and other users.  Unlike other engines WebKit approaches this more abstractly by leaving a large portion of the networking up to individual ports. This includes network protocols such as HTTP, WebSockets, and WebRTC. The upside to this approach is a higher level of integration with the system provided libraries and features so WebKit will behave similarly to other software on the platform often with more centralized configuration.

Due to this abstraction there are a few independent layers that make up the networking stack of WPE. In this post I'll break down what each layer accomplishes as well as brief insight into the codebases structure.

## Networking Layers

<div align="center">
    <img alt="WebKit Network Layers" src="/assets/networking-layers.svg">
</div>

### WebKit

Before we get into the libraries used for WPE lets discuss WebKit itself. Despite abstracting out a lot of the protocol handling WebKit itself still needs to understand a lot of fundamentals of HTTP.

WebCore (discussed in [WPE Overview](/blog/02-overview-of-wpe.html)) understands HTTP requests, headers, and cookies are as they are required to implement many higher level features. What it does not do is the network operations, most parsing, or on-disk storage for them. In the codebase these are represented by `ResourceRequest` and `ResourceResponse` objects mapping to general HTTP functionality.

#### NetworkProcess

A core part of modern web engine security is the multi-process model. Each website runs in its own isolated process that does not have network access to defend from exploits. In order to allow for network access they must talk over IPC to a dedicated NetworkProcess, one per browser instance typically. The NetworkProcess receives a `ResourceRequest`, creates a `NetworkDataTask` with it to download the data, and responds with a `ResourceResponse` to the WebProcess which looks like this:

<div align="center">
    <img alt="WebKit Network Flowchart" src="/assets/networking-flow.svg">
</div>

### WPE

WPE implements the platform specific versions of the classes above, as `ResourceRequestSoup` and `NetworkDataTaskSoup`, primarily using a library called libsoup.

The [libsoup](https://libsoup.org) library was originally created for the GNOME project for its email client and has since grown to be a very featureful HTTP implementation now maintained by Igalia.

At a high level the main task that libsoup does is manage connections and queued requests to websites and then efficiently stream the responses back to WPE. However properly implementing HTTP is a fairly large task and this is a non-exhaustive list of features it implements: HTTP/1.1, HTTP/2, WebSockets, cookies, decompression, multiple authentication standards, HSTS, and HTTP proxies.

libsoup on its own is really focused on the HTTP layer and uses the [GLib](https://gitlab.gnome.org/GNOME/glib) library to implement many of its networking features in a portable way. This is where TCP, DNS, and TLS are handled. It is also directly used by WebKit for URI parsing and DNS pre-caching.

Using GLib also helps standardize behavior across a modern Linux system. It allows configuration of a global proxy resolver that WebKit along with other applications will use.

#### TLS

Another unique detail of our stack is that TLS is fully abstracted inside of GLib by a project called [GLib-Networking](https://gitlab.gnome.org/GNOME/glib-networking). This project provides multiple implementations of TLS that can be chosen at runtime including OpenSSL and gnutls on Linux. The benefits to this is clients can choose the implementation they prefer be it for licensing, certification, or technical reasons.

### Usage

Lets go step by step to see some real world usage. If we call `webkit_web_view_load_uri()` for a new domain it will:

1. Create a `ResourceRequest` in WebCore that represents an HTTP request with a few basic headers set.
    - `ResourceRequestSoup` will create its own internal representation for the request using `soup_message_new_for_uri()`.
2. This is passed to the `NetworkProcess` to load this request as a `NetworkDataTask`.
3. `NetworkDataTaskSoup` will send/receive the request/response with `soup_session_send()` which queues the message to be sent.
4. libsoup will connect to the host using `GSocketClient` which does a DNS lookup and TCP connection.
    - If this is a TLS connection `GTlsClientConnection` will use a library such as gnutls to do a TLS handshake.
5. libsoup will write the HTTP request and read from the socket parsing the HTTP responses eventually returning the data to WebKit.
6. WebKit receives this data, along with periodic updates about the state of the request, and sends it out of the `NetworkProcess` back to the main process as a `ResourceResponse` eventually loading the data in the `WebProcess`.

## Summary

In conclusion WebKit provides a very flexible abstraction for platforms and WPE leverages mature system libraries to provide a portable implementation. It has many layers but they are all well organized and suited to their tasks.

If you are working with WPE and are interested in collaborating feel free to [contact us](https://www.igalia.com/contact/) or if you are interested in working with Igalia you can [apply here](https://www.igalia.com/jobs/browsers_webkit_position).
