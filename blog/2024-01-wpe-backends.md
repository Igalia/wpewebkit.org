---
title: A New WPE Backend Using EGLStream
author: llepage
date: 2024-01-29T09:00+0300
permalink: /blog/07-creating-wpe-backends.html
thumbnail: /assets/img/blog-backends-thumb@1x.png
preview: |-
  WPE backends allow adapting the web engine to the particularities of
  the graphics stack of the devices where it needs to run. In this article
  we cover their basics and build a WPE WebKit backend from scratch.
---

## What is a WPE Backend?

<div class="sidebar">

This article is a mashup of [The process of creating a new WPE
backend](https://blogs.igalia.com/llepage/the-process-of-creating-a-new-wpe-backend/)
and [Use EGLStreams in a WPE WebKit
backend](https://blogs.igalia.com/llepage/use-eglstreams-in-a-wpe-webkit-backend/),
originally published at Loïc's blog.

</div>


Depending on the target hardware WPE may need to use different techniques and
technologies to ensure correct graphical rendering. To be independent of any
user-interface toolkit and windowing system, WPE WebKit delegates the rendering
to a third-party API defined in the
[libwpe](https://github.com/WebPlatformForEmbedded/libwpe) library. A concrete
implementation of this API is a “WPE backend”.

WPE WebKit is a multiprocess application, the end-user starts and controls the
web widgets in the application process (which we often call “the <abbr
title="User Interface">UI</abbr> process” while the web engine itself uses
different subprocesses: `WPENetworkProcess` is in charge of managing network
connections and `WPEWebProcess` (or “web process”) in charge of the HTML and
JavaScript parsing, execution and rendering. The WPE backend is at a crossroads
between the UI process and one or more web process instances.

<figure>
  <a href="/assets/svg/part1-basics.md-1.svg" target="_blank"><img
    src="/assets/svg/part1-basics.md-1.svg"
    alt="Diagram showing a box for the WPE backend in between the UI process and WPEWebProcess">
  </a>
</figure>

The WPE backend is a shared library that is loaded at runtime by the web
process and by the UI process. It is used to render the visual aspect of a web
page and transfer the resulting video buffer from the web process to the
application process.

## Backend Interfaces

The WPE backend shared library must export at least one symbol called
`_wpe_loader_interface` of type `struct wpe_loader_interface` as defined [in
the *libwpe*
API](https://github.com/WebPlatformForEmbedded/libwpe/blob/d7c669ca6f5ec0d544c264016d270669b336c931/include/wpe/loader.h#L57).
Presently its only member is `load_object`, a callback function that receives a
string with an interface name and returns concrete implementations of the
following interfaces:

- [struct wpe\_renderer\_host\_interface](https://github.com/WebPlatformForEmbedded/libwpe/blob/d7c669ca6f5ec0d544c264016d270669b336c931/include/wpe/renderer-host.h#L48)
- [struct wpe\_renderer\_backend\_egl\_interface](https://github.com/WebPlatformForEmbedded/libwpe/blob/d7c669ca6f5ec0d544c264016d270669b336c931/include/wpe/renderer-backend-egl.h#L75)
- [struct wpe\_renderer\_backend\_egl\_target\_interface](https://github.com/WebPlatformForEmbedded/libwpe/blob/d7c669ca6f5ec0d544c264016d270669b336c931/include/wpe/renderer-backend-egl.h#L93)
- [struct wpe\_renderer\_backend\_egl\_offscreen\_target\_interface](https://github.com/WebPlatformForEmbedded/libwpe/blob/d7c669ca6f5ec0d544c264016d270669b336c931/include/wpe/renderer-backend-egl.h#L115)
- [struct wpe\_view\_backend\_interface](https://github.com/WebPlatformForEmbedded/libwpe/blob/d7c669ca6f5ec0d544c264016d270669b336c931/include/wpe/view-backend.h#L63)

The names passed to the `.load_object()` function are the same as those of the
interface types, prefixed with an underscore. For example, a
`.load_object("_wpe_renderer_host_interface")` call must return a pointer to a
`struct wpe_renderer_host_interface` object.

<details>
  <summary>Example C code for a <code>load_object</code> callback.</summary>
<!-- load_object example <<<1 -->

```c
static struct wpe_renderer_host_interface = { /* ... */ };
static struct wpe_renderer_backend_egl_interface = { /* ... */ };

static void*
my_backend_load_object(const char *name)
{
    if (!strcmp(name, "_wpe_renderer_host_interface"))
        return &my_renderer_host;
    if (!strcmp(name, "_wpe_renderer_backend_egl_interface"))
        return &my_renderer_backend_egl;

    /* ... */

    return NULL;
}

struct wpe_loader_interface _wpe_loader_interface = {
    .load_object = my_backend_load_object,
};
```

<!-- 1>>> -->
</details>

Each of these interfaces follow the same base structure: the `struct` members
are callback functions, all interfaces have `create` and `destroy` members which
act as instance constructor and destructor, plus any additional “methods”.
The pointer returned by the `create` callback will be passed as the `object`
“instance” of the other methods:

```c
struct wpe_renderer_host_interface {
  void* (*create)(void);
  void  (*destroy)(void *object);
  /* ... */
};
```

In the **UI process** side WPE WebKit will create:

- One “renderer host” instance, using `wpe_renderer_host_interface.create()`.
- Multiple “renderer host client” instances, using `wpe_renderer_host_interface.create_client()`.
  These are mainly used for IPC communication, one instance gets created for
  each web process launched by WebKit.
- Multiple “view backend” instances, using `wpe_view_backend_interface.create()`.
  One instance is created for each rendering target in the web process.

In each **web process**&mdash;there can be more than one&mdash;WPE WebKit
will create:

- One “renderer backend EGL” instance, using `wpe_renderer_backend_egl_interface.create()`.
- Multiple “renderer backend EGL target” instances, using
  `wpe_renderer_backend_egl_target_interface.create()`. An instance is created
  for each new rendering target needed by the application.

<details>
  <summary>How about <code>wpe_renderer_backend_egl_offscreen_target_interface</code>?</summary>
    <div>

The `rendererBackendEGLTarget` instances may be created by the `wpe_renderer_backend_egl_target_interface`, or
the `wpe_renderer_backend_egl_offscreen_target_interface` depending on the interfaces implemented in the backend.

Here we are only focusing on the `wpe_renderer_backend_egl_target_interface` that is relying on a classical EGL
display (defined in the `rendererBackendEGL` instance). The `wpe_renderer_backend_egl_offscreen_target_interface` may
be used in very specific use-cases that are out of the scope of this post. You can check its usage in the WPE WebKit
[source code](https://github.com/WebKit/WebKit/blob/f32cd0f7cb7961420ce08ae78b8f01f287bec199/Source/WebCore/platform/graphics/egl/GLContextLibWPE.cpp#L61)
for more information.

  </div>
</details>

These instances typically communicate with each others using Unix sockets for
<abbr title="Inter-Process Communication">IPC</abbr>. The IPC layer must be
implemented in the WPE backend itself because the *libwpe* interfaces only pass
around the file descriptors to be used as communication endpoints.

From a topological point of view, all those instances are organized as follows:

<figure>
  <a href="/assets/svg/part1-basics.md-2.svg" target="_blank"><img
    src="/assets/svg/part1-basics.md-2.svg">
  </a>
</figure>

From an usage point of view:

- The `rendererHost` and `rendererHostClient` instances are only used to manage
  IPC endpoints on the UI process side that are connected to each running
  web process. They are not used by the graphical rendering system.
- The `rendererBackendEGL` instance (one per web process) is only used to
  connect to the native display for a specific platform. For example, on a
  desktop Linux, the platform may be X11 where the native display would be the
  result of calling `XOpenDisplay()`; or the platform may be Wayland and in
  this case the native display would be the result of calling
  `wl_display_connect()`; and so on.
- The `rendererBackendEGLTarget` (on the web process side) and `viewBackend`
  (on the UI process side) instances are the ones truly managing the web page
  graphical rendering.

## Graphics Rendering

As seen above, the interfaces in charge of the rendering are
`wpe_renderer_backend_egl_target_interface` and `wpe_view_backend_interface`.
During their creation, WPE WebKit exchanges the file descriptors used to
establish a direct IPC connection between a `rendererBackendEGL` (in the
web process), and a `viewBackend` (in the UI process).

During the EGL initialization phase, when a new web process is launched, WebKit
will use the native display and platform provided by the
`wpe_renderer_backend_egl_interface.get_native_display()` and `.get_platform()`
functions to create a suitable OpenGL ES context.

When WebKit's
[ThreadedCompositor](https://github.com/WebKit/WebKit/blob/c22f641da18b8c4eee23b8021b37aeec69268675/Source/WebKit/Shared/CoordinatedGraphics/threadedcompositor/ThreadedCompositor.cpp#L220)
is ready to render a new frame (in the web process), it calls the
`wpe_renderer_backend_egl_target_interface.frame_will_render()` function to let
the WPE backend know that rendering is about to start. At this moment, the
previously created OpenGL ES context is made current to be used as the target
for GL drawing commands.

Once the threaded compositor has finished drawing, it will swap the front and
back EGL buffers and call the
`wpe_renderer_backend_egl_target_interface.frame_rendered()` function to signal
that the frame is ready. The compositor will then wait until the WPE backend
calls `wpe_renderer_backend_egl_target_dispatch_frame_complete()` to indicate
that the compositor may produce a new frame.

What happens inside the `.frame_will_render()` and `.frame_rendered()`
implementations is up to the WPE backend. As en example, it could
set up a [Frame Buffer Object](https://www.khronos.org/opengl/wiki/Framebuffer_Object)
to have the web content draw offscreen, in a texture that can be passed
back to the UI process for further processing, or use extensions like
[EGLStream](https://registry.khronos.org/EGL/extensions/KHR/EGL_KHR_stream.txt),
or [DMA-BUF exports](https://registry.khronos.org/EGL/extensions/MESA/EGL_MESA_image_dma_buf_export.txt)
to transfer the frame to the UI process without copying the pixel data.

<figure>
  <a href="/assets/svg/part1-basics.md-3.svg" target="_blank"><img
    src="/assets/svg/part1-basics.md-3.svg">
  </a>
</figure>

Typically the backend sends each new frame to the corresponding view backend in
in its `.frame_rendered()` function. The application can use the frame until it
sends back an <abbr>IPC</abbr> message to the renderer target (in the web
process) to indicate that the frame is not in use anymore and may be be freed
or recycled. Although it is not a requirement to do it at this exact point,
usually when a renderer backend receives this message it calls the
`wpe_renderer_backend_egl_target_dispatch_frame_complete()` function to trigger
the rendering of a new frame. As a side effect, this mechanism also allows
controlling the pace at which new frames are produced.


## Using EGLStream

EGLStream is an EGL extension that defines a mechanism to transfer hardware
video buffers from one process to another efficiently, without getting them
out of GPU memory. Although the extension is supported only in Nvidia
hardware, it makes for a good example as it transparently handles some
complexities involved, like buffers with multiple planes.

This backend uses the EGLStream extension to transfer graphics buffers from the
web process, which acts as a producer, to the UI process acting as a consumer.
The producer extension
[EGL_KHR_stream_producer_eglsurface](https://registry.khronos.org/EGL/extensions/KHR/EGL_KHR_stream_producer_eglsurface.txt)
allows creating a surface that may be used as target for rendering, then using
[eglSwapBuffers()](https://registry.khronos.org/EGL/sdk/docs/man/html/eglSwapBuffers.xhtml)
finishes drawing and sends the result to the consumer. Meanwhile, in the
consumer side, the
[EGL_NV_stream_consumer_eglimage](https://registry.khronos.org/EGL/extensions/NV/EGL_NV_stream_consumer_eglimage.txt)
extension is used to turn each buffer into an `EGLImage`.

The reference source code for this WPE backend is available in the
[WPEBackend-offscreen-nvidia](https://github.com/Igalia/WPEBackend-offscreen-nvidia)
repository, which has been tested with WPE WebKit 2.38.x or 2.40.x, and
*libwpe* version 1.14.x.

<details>
  <summary>Behold, the Future Belongs to DMA-BUF!</summary>
  <div>

With the growing adoption of
[DMA-BUF](https://docs.kernel.org/driver-api/dma-buf.html) for sharing memory
buffers on modern Linux platforms, the WPE WebKit architecture will be
evolving and, in the future, the need for a WPE Backend should disappear in
most cases.

Ongoing work on WPE WebKit removes the need to provide a WPE backend
implementation for most hardware platforms, with a generic implementation
using DMA-BUF provided as an integral, built-in feature of WebKit. It will
still be possible to provide external implementations for platforms that
might need to use custom buffer sharing mechanisms.

From the application developer point of view, in most cases writing
programs that use the WPE WebKit API will be simpler, with the complexity
of the communication among multiple processes handled by WebKit.

  </div>
</details>

### Stream Setup

The steps needed to set up EGLStream endpoints need to be done in a particular
order:

1. Create the consumer.
2. Get the stream file descriptor for the consumer.
3. Send the stream file descriptor to the producer.
4. Create the producer.

**First**, the consumer needs to be created:

```cpp
EGLStream createConsumerStream(EGLDisplay eglDisplay) {
    static const EGLint s_streamAttribs[] = {
        EGL_STREAM_FIFO_LENGTH_KHR, 1,
        EGL_CONSUMER_ACQUIRE_TIMEOUT_USEC_KHR, 1000 * 1000,
        EGL_NONE
    };
    return eglCreateStreamKHR(eglDisplay, s_streamAttribs);
}
```

The `EGL_STREAM_FIFO_LENGTH_KHR` parameter defines the length of the EGLStream
queue. If set to zero, the stream will work in “mailbox” mode and each time the
producer has a new frame it will empty the stream content and replace the frame
by the new one. If non-zero, the stream works work in “<abbr title="First-In,
First-Out">FIFO</abbr>” mode, which means that the stream queue can contain up
to `EGL_STREAM_FIFO_LENGTH_KHR` frames.

Here we configure a queue for one frame because in this case the specification
of `EGL_KHR_stream_producer_eglsurface` guarantees that calling
`eglSwapBuffers()` on the producer the call will block until the consumer
retires the previous frame from queue. This is used as implicit synchronization
between the UI process side and the web process side without needing to rely on
custom IPC, which would add a small delay between frames.

The `EGL_CONSUMER_ACQUIRE_TIMEOUT_USEC_KHR` parameter defines the maximum
timeout in microseconds to wait on the consumer side to acquire a frame when
calling `eglStreamConsumerAcquireKHR()`. It is only used with the
`EGL_KHR_stream_consumer_gltexture` extension because the
`EGL_NV_stream_consumer_eglimage` extension allows setting a timeout on each
call to `eglQueryStreamConsumerEventNV()` function.

**Second**, to initialize the consumer using the `EGL_NV_stream_consumer_eglimage`
extension it is enough to call the `eglStreamImageConsumerConnectNV()` function.

**Once the consumer has been initialized**, you need to send the EGLStream
file descriptor to the producer process. The usual way of achieving this would
be using IPC between the two processes, sending the file descriptor in a
`SCM_RIGHTS` message through an Unix socket&mdash;although with recent kernels
using [pidfd_getfd()](https://lwn.net/Articles/808997/) may be an option if
both processes are related.

When the file descriptor is **finally** received, the producer endpoint can be
created using the `EGL_KHR_stream_producer_eglsurface` extension:

```cpp
const EGLint surfaceAttribs[] = {
    EGL_WIDTH, width,
    EGL_HEIGHT, height,
    EGL_NONE
};
EGLStream eglStream = eglCreateStreamFromFileDescriptorKHR(eglDisplay, consumerFD);
EGLSurface eglSurface = eglCreateStreamProducerSurfaceKHR(eglDisplay, config, eglStream, surfaceAttribs);
```

As with <abbr title="Pixel Buffer">pbuffer</abbr> surfaces, the dimensions
need to be specified as surface attributes. When picking a frame buffer
configuration with `eglChooseConfig()` the `EGL_SURFACE_TYPE` attribute must
be set to `EGL_STREAM_BIT_KHR`. From this point onwards, rendering proceeds as
usual: the EGL surface and context are made active, and once the painting is
done a call to `eglSwapBuffers()` will “present” the frame, which in this case
means sending the buffer with the pixel data down the EGLStream to the
consumer.

<figure>
  <a href="/assets/svg/part2-eglstream.md-1.svg" target="_blank"><img 
    src="/assets/svg/part2-eglstream.md-1.svg">
  </a>
</figure>

### Consuming Frames

While on the producer side rendering treats the EGLStream surface like any
other, on the consumer some more work is needed to manager the lifetime of
the data received: frames have to be manually acquired and released once
they are not needed anymore.

The producer calls `eglQueryStreamConsumerEventNV()` repeatedly to retire the
next event from the stream:

- `EGL_STREAM_IMAGE_ADD_NV` indicates that there is a buffer in the stream
  that has not yet been bound to an `EGLImage`, and the application needs to
  create a new one to which the actual data will be bound later.
- `EGL_STREAM_IMAGE_AVAILABLE_NV` indicates that a new frame is available
  and that it can be bound to the previously created `EGLImage`.
- `EGL_STREAM_IMAGE_REMOVE_NV` indicates that a buffer has been retired from
  the stream, and that its associated `EGLImage` may be released once the
  application has finished using it.

This translates roughly to the following code:

```cpp
static constexpr EGLTime MAX_TIMEOUT_USEC = 1000 * 1000;
EGLImage eglImage = EGL_NO_IMAGE;

while (true) {
    EGLenum event = 0;
    EGLAttrib data = 0;

    // WARNING: The specification states that the timeout is in nanoseconds
    // (see: https://registry.khronos.org/EGL/extensions/NV/EGL_NV_stream_consumer_eglimage.txt)
    // but in reality it is in microseconds, at least with the version 535.113.01 of the NVidia drivers.
    if (!eglQueryStreamConsumerEventNV(display, eglStream, MAX_TIMEOUT_USEC, &event, &data))
        break;

    switch (event) {
      case EGL_STREAM_IMAGE_ADD_NV: // Bind an incoming buffer to an EGLImage.
          if (eglImage) eglDestroyImage(display, eglImage);
          eglImage = eglCreateImage(display, EGL_NO_CONTEXT, EGL_STREAM_CONSUMER_IMAGE_NV,
                                    static_cast<EGLClientBuffer>(eglStream), nullptr);
          continue; // Handle the next event.

      case EGL_STREAM_IMAGE_REMOVE_NV: // Buffer removed, EGLImage may be disposed.
          if (data) {
              EGLImage image = reinterpret_cast<EGLImage>(data);
              eglDestroyImage(display, image);
              if (image == eglImage)
                  eglImage = EGL_NO_IMAGE;
          }
          continue; // Handle the next event.

      case EGL_STREAM_IMAGE_AVAILABLE_NV: // New frame available.
          if (eglStreamAcquireImageNV(display, eglStream, &eglImage, EGL_NO_SYNC))
              break;

      default:
          continue; // Handle the next event.
    }

    /*** Use the EGLImage here ***/

    eglStreamReleaseImageNV(display, eglStream, eglImage, EGL_NO_SYNC);
}
```

The application is free to use each `EGLImage` as it sees fit. An obvious
example would be to use it as the contents for a texture, which then gets
painted in the “content” area of a web browser; or as the contents of the
screen for an in-game computer that the player can interact with, enabling
display of real, live web content as part of the gaming experience&mdash;now
*that* would be a deeply embedded browser!


### One Last Thing

There is a small showstopper to have EGLStream support working:
[currently](https://github.com/WebKit/WebKit/blob/cb07c70c253a35b0e09e46e6100e1cdcebab26e2/Source/WebCore/platform/graphics/egl/GLContextEGL.cpp#L135)
when WPE WebKit uses surfaceless EGL contexts it sets the surface type to
`EGL_WINDOW_BIT` attribute, while `EGL_STREAM_BIT_KHR` would be needed
instead. [A small
patch](https://github.com/Igalia/WPEBackend-offscreen-nvidia/blob/main/wpewebkit-patches/005-fix-surfaceless-egl-context-creation.patch)
is enough to apply this tweak:

```diff
diff --git a/Source/WebCore/platform/graphics/egl/GLContextEGL.cpp b/Source/WebCore/platform/graphics/egl/GLContextEGL.cpp
index d5efa070..5f200edc 100644
--- a/Source/WebCore/platform/graphics/egl/GLContextEGL.cpp
+++ b/Source/WebCore/platform/graphics/egl/GLContextEGL.cpp
@@ -122,9 +122,11 @@ bool GLContextEGL::getEGLConfig(EGLDisplay display, EGLConfig* config, EGLSurfac
         attributeList[13] = EGL_PIXMAP_BIT;
         break;
     case GLContextEGL::WindowSurface:
-    case GLContextEGL::Surfaceless:
         attributeList[13] = EGL_WINDOW_BIT;
         break;
+    case GLContextEGL::Surfaceless:
+        attributeList[13] = EGL_STREAM_BIT_KHR;
+        break;
     }

     EGLint count;
```



<!-- vim:set foldmethod=marker foldmarker=<<<,>>>: -->
