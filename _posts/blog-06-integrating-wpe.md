---
layout: post
title: "Integrating WPE: URI Scheme Handlers and Script Messages"
tags: [blogpost]
author: aperez
date: 2023-03-05
permalink: /blog/06-integrating-wpe.html
thumbnail: /assets/img/extending-minicog-echouri.png
preview: |-
  This post explores some of the ways in which WPE WebKit can integrate with
  its surrounding environment, in order to expose platform functionality to
  Web content seamlessly.
---

While most Web content designed entirely for screen display&mdash;and there is
*a lot* of it&mdash;will spend its life in the somewhat restricted sandbox
implemented by a web browser, taking advantage of Web technologies to provide
rich user interfaces in all kinds of consumer devices requires at least *some*
degree of integration with the rest of their software and hardware. This is
where a Web engine like WPE designed to be *embeddable* shines: not only does WPE
provide a [stable API][wpewebkit-api], it is also comprehensive in
supporting a number of ways to *integrate* with its environment further
than the plethora of available [Web platform APIs][mdn-web-apis].

Integrating a “Web view” (the main [entry point of the WPE embedding
API][api-webview]) involves providing extension points, which allow the
Web content (HTML/CSS/JavaScript) it loads to call into native code provided
by the client application (typically written in C/C++) from JavaScript, and
vice versa. There are a number of ways in which this can be achieved:

- **[URI scheme handlers](#uri-scheme-handlers)** allow native code to
  register a custom <abbr title="Uniform Resource Identifier">URI</abbr>
  scheme, which will run a user provided
  function to produce content that can be “fetched” regularly.
- **[User script messaging](#user-script-messages)** can be used to send JSON
  messages from JavaScript running in the same context as Web pages to an user
  function, and vice versa.
- The **JavaScriptCore API** is a powerful solution to provide new JavaScript
  functionality to Web content seamlessly, almost as if they were implemented
  inside the Web engine itself&mdash;akin to [NodeJS C++ addons][node-addons].

In this post we will explore the first two, as they can support many
interesting use cases without introducing the additional complexity of
extending the JavaScript virtual machine. Let's dive in!

## Intermission

We will be referring to the code of a tiny browser written for the occasion.
Telling WebKit how to call our native code involves creating a
[WebKitUserContentManager][api-contentmgr], customizing it, and then
associating it with web views during their creation. The only exception to
this are [URI scheme handlers](#uri-scheme-handlers), which are registered
using [webkit_web_context_register_uri_scheme()][api-ctxurischeme]. This
minimal browser includes an `on_create_view` function, which is the perfect
place to do the configuration:

```c
static WebKitWebView*
on_create_view(CogShell *shell, CogPlatform *platform)
{
    g_autoptr(GError) error = NULL;
    WebKitWebViewBackend *view_backend = cog_platform_get_view_backend(platform, NULL, &error);
    if (!view_backend)
        g_error("Cannot obtain view backend: %s", error->message);

    g_autoptr(WebKitUserContentManager) content_manager = create_content_manager();  /** NEW! **/
    configure_web_context(cog_shell_get_web_context(shell));                         /** NEW! **/
 
    g_autoptr(WebKitWebView) web_view =
        g_object_new(WEBKIT_TYPE_WEB_VIEW,
                     "user-content-manager", content_manager,  /** NEW! **/
                     "settings", cog_shell_get_web_settings(shell),
                     "web-context", cog_shell_get_web_context(shell),
                     "backend", view_backend,
                     NULL);
    cog_platform_init_web_view(platform, web_view);
    webkit_web_view_load_uri(web_view, s_starturl);
    return g_steal_pointer(&web_view);
}
```

The size has been kept small thanks to reusing code from the [Cog
core](https://github.com/Igalia/cog#cog) library. As a bonus, it should
run on Wayland, X11, and even on a bare display using the <abbr title="Direct
Rendering Manager">DRM<abbr>/<abbr title="Kernel Mode Setting">KMS</abbr>
subsystem directly. Compiling and running it, assuming you already have the
dependencies installed, should be as easy as running:

```sh
cc -o minicog minicog.c $(pkg-config cogcore --libs --cflags)
./minicog wpewebkit.org
```

If the current session kind is not automatically detected, a second parameter
can be used to manually choose among `wl` (Wayland), `x11`, `drm`, and so on:

```sh
./minicog wpewebkit.org x11
```

The full, unmodified source for this minimal browser is included right below.

<details>
  <summary>Complete <code>minicog.c</code> source
    (<a target="_blank" rel="noopener" href="https://gist.github.com/aperezdc/f6a65a95f2baa222c0ce9d65e516e13b">Gist</a>)
  </summary>
<!-- minicog.c <<<1 -->
<div>
<pre><code class="language-c">
/*
 * SPDX-License-Identifier: MIT
 *
 * cc -o minicog minicog.c $(pkg-config wpe-webkit-1.1 cogcore --cflags --libs)
 */
&nbsp;
#include &lt;cog/cog.h&gt;
&nbsp;
static const char *s_starturl = NULL;
&nbsp;
static WebKitWebView*
on_create_view(CogShell *shell, CogPlatform *platform)
{
    g_autoptr(GError) error = NULL;
    WebKitWebViewBackend *view_backend = cog_platform_get_view_backend(platform, NULL, &error);
    if (!view_backend)
        g_error("Cannot obtain view backend: %s", error->message);
&nbsp;
    g_autoptr(WebKitWebView) web_view =
        g_object_new(WEBKIT_TYPE_WEB_VIEW,
                     "settings", cog_shell_get_web_settings(shell),
                     "web-context", cog_shell_get_web_context(shell),
                     "backend", view_backend,
                     NULL);
    cog_platform_init_web_view(platform, web_view);
    webkit_web_view_load_uri(web_view, s_starturl);
    return g_steal_pointer(&web_view);
}
&nbsp;
int
main(int argc, char *argv[])
{
    g_set_application_name("minicog");
&nbsp;
    if (argc != 2 && argc != 3) {
        g_printerr("Usage: %s [URL [platform]]\n", argv[0]);
        return EXIT_FAILURE;
    }
&nbsp;
    g_autoptr(GError) error = NULL;
    if (!(s_starturl = cog_uri_guess_from_user_input(argv[1], TRUE, &error)))
        g_error("Invalid URL '%s': %s", argv[1], error->message);
&nbsp;
    cog_modules_add_directory(COG_MODULEDIR);
&nbsp;
    g_autoptr(GApplication) app = g_application_new(NULL, G_APPLICATION_DEFAULT_FLAGS);
    g_autoptr(CogShell) shell = cog_shell_new("minicog", FALSE);
    g_autoptr(CogPlatform) platform =
        cog_platform_new((argc == 3) ? argv[2] : g_getenv("COG_PLATFORM"), &error);
    if (!platform)
        g_error("Cannot create platform: %s", error->message);
&nbsp;
    if (!cog_platform_setup(platform, shell, "", &error))
        g_error("Cannot setup platform: %s\n", error->message);
&nbsp;
    g_signal_connect(shell, "create-view", G_CALLBACK(on_create_view), platform);
    g_signal_connect_swapped(app, "shutdown", G_CALLBACK(cog_shell_shutdown), shell);
    g_signal_connect_swapped(app, "startup", G_CALLBACK(cog_shell_startup), shell);
    g_signal_connect(app, "activate", G_CALLBACK(g_application_hold), NULL);
&nbsp;

</code></pre>
<!-- 1>>> -->
</div>
</details>


## URI Scheme Handlers

<figure>
  <img src="{{ '/assets/svg/URI_syntax_diagram.svg' | url }}"
      alt="“Railroad” diagram of URI syntax">
  <figcaption>URI syntax (<a target="_blank" rel="noopener"
      href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>,
    <a target="_blank" rel="noopener"
      href="https://commons.wikimedia.org/wiki/File:URI_syntax_diagram.svg">source</a>),
    notice the “scheme” component at the top left.
  </figcaption>
</figure>

A URI scheme handler allows “teaching” the web engine how to handle *any*
load (pages, subresources, the [Fetch API][mdn-web-api-fetch],
`XmlHttpRequest`, ...)&mdash;if you ever wondered how Firefox implements
`about:config` or how Chromium does `chrome://flags`, this is it. Also,
WPE WebKit has public API for this. Roughly:

1. A custom URI scheme is registered using
   [webkit_web_context_register_uri_scheme()](https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/method.WebContext.register_uri_scheme.html). This also associates a callback function to it.
2. When WebKit detects a load for the scheme, it invokes the provided
   function, passing a
   [WebKitURISchemeRequest](https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/class.URISchemeRequest.html).
3. The function generates data to be returned as the result of the load,
   as a [GInputStream](https://docs.gtk.org/gio/class.InputStream.html)
   and calls [webkit_uri_scheme_request_finish()](https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/method.URISchemeRequest.finish.html).
4. WebKit will now read the data from the input stream.


### Echoes

Let's add an echo handler to our [minimal browser](#intermission)
that returns the requested URI as plain text. Registering the scheme is
straightforward enough:

```c
static void
configure_web_context(WebKitWebContext *context)
{
    webkit_web_context_register_uri_scheme(context,
                                           "echo",
                                           handle_echo_request,
                                           NULL /* userdata */,
                                           NULL /* destroy_notify */);
}
```

One way of implementing `handle_echo_request()` could be wrapping the request
URI, which is part of the `WebKitURISchemeRequest` parameter to the handler,
stash it into a [GBytes](https://docs.gtk.org/glib/struct.Bytes.html)
container, and [create an input stream to read back its
contents](https://docs.gtk.org/gio/ctor.MemoryInputStream.new_from_bytes.html):

```c
static void
handle_echo_request(WebKitURISchemeRequest *request, void *userdata)
{
    const char *request_uri = webkit_uri_scheme_request_get_uri(request);
    g_print("Request URI: %s\n", request_uri);

    g_autoptr(GBytes) data = g_bytes_new(request_uri, strlen(request_uri));
    g_autoptr(GInputStream) stream = g_memory_input_stream_new_from_bytes(data);

    webkit_uri_scheme_request_finish(request, stream, g_bytes_get_size(data), "text/plain");
}
```

Note how we need to tell WebKit how to [finish the load
request](https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/method.URISchemeRequest.finish.html),
in this case only with the data stream, but it is possible to have [more
control of the
response](https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/method.URISchemeRequest.finish_with_response.html)
or [return an
error](https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/method.URISchemeRequest.finish_error.html).

With these changes, it is now possible to make page loads from the new custom
URI scheme:

<figure>
  <img alt="Screenshot of the minicog browser loading a custom echo:// URI"
    src="{{ '/assets/img/extending-minicog-echouri.png' | url }}" class="picture">
  <figcaption>It worked!</figcaption>
</figure>


### Et Tu, CORS?

The main roadblock one may find when using custom URI schemes is that loads
are affected by <abbr title="Cross-Origin Resource Sharing">CORS</abbr>
checks. Not only that, WebKit by default does _not_ allow sending cross-origin
requests to custom URI schemes. This is by design: instead of accidentally
leaking potentially sensitive data to websites, developers embedding a web
view *need* to consciously opt-in to allow [CORS][mdn-cors] requests *and*
send back suitable `Access-Control-Allow-*` response headers.

In practice, the additional setup involves
[retrieving](https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/method.WebContext.get_security_manager.html)
the `WebKitSecurityManager` being used by the `WebKitWebContext` and
[registering the scheme as
CORS-enabled](https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/method.SecurityManager.register_uri_scheme_as_cors_enabled.html).
Then, in the handler function for the custom URI scheme, create a
[WebKitURISchemeResponse](https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/class.URISchemeResponse.html),
which allows fine-grained control of the response, including setting
[headers](https://libsoup.org/libsoup-3.0/struct.MessageHeaders.html),
and finishing the request instead with
`webkit_uri_scheme_request_finish_with_response()`.

In addition to providing a complete CORS-enabled custom URI scheme [example](https://gist.github.com/aperezdc/74809a6cd617faf445c22097a47bcb50),
we recommend the [Will It CORS?](https://httptoolkit.com/will-it-cors) tool
to help troubleshoot issues.


### Further Ideas

Once we have WPE WebKit calling into our custom code, there are no limits
to what a URI scheme handler can do&mdash;as long as it involves replying
to requests. Here are some ideas:

* Allow pages to access a subset of paths from the local file system in a
  controlled way (as [CORS applies](#et-tu%2C-cors%3F)). For inspiration,
  see [CogDirectoryFilesHandler](https://igalia.github.io/cog/class.DirectoryFilesHandler.html).
* Package all your web application assets into a single ZIP file, making
  loads from `app:/...` fetch content from it. Or, make the scheme handler
  load data using [GResource][api-gio-gresource] and bundle the application
  inside your program.
* Use the presence of a well-known custom URI to have a web application
  realize that it is running on a certain device, and make its user
  interface adapt accordingly.
* Provide a REST API, which internally calls into
  [NetworkManager](https://networkmanager.dev/) to list and configure
  wireless network adapters. Combine it with a local web application and
  embedded devices can now easily get on the network.


## User Script Messages

While [URI scheme handlers](#uri-scheme-handlers)
allow streaming large chunks of data back into the Web engine, for exchanging
smaller pieces of information in a more programmatic fashion it may be
preferable to exchange messages without the need to trigger resource loads. 
The user script messages part of the
[WebKitUserContentManager][api-contentmgr] API can be used this way:

1. Register a user message handler with
   [webkit_user_content_manager_register_script_message_handler()](https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/method.UserContentManager.register_script_message_handler.html).
   As opposed to URI scheme handlers, this only enables receiving messages,
   but does not associate a callback function *yet*.
2. Associate a callback to the
   [script-message-received](https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/signal.UserContentManager.script-message-received.html)
   signal. The signal detail should be the name of the registered handler.
3. Now, whenever JavaScript code calls
   `window.webkit.messageHandlers.<name>.postMessage()`, the signal is
   emitted, and the native callback functions invoked.

### It's All JavaScript

Let's add a feature to our [minimal browser](#intermission) that will allow
JavaScript code to trigger rebooting or powering off the device where it is
running. While this should definitely *not* be functionality exposed to the
open Web, it is perfectly acceptable in an embedded device where we control
what gets loaded with WPE, and that exclusively uses a web application as its
user interface.

<figure>
  <img src="{{ '/assets/img/pepe-silvia-all-javascript.jpg' | url }}"
    class="picture" alt="Pepe Silvia conspiracy image meme, with the text “It's all JavaScript” superimposed">
  <figcaption>Pepe Silvia has it all figured out.</figcaption>
</figure>

First, create a `WebKitUserContentManager`, register the message handler,
and connect a callback to its associated signal:

```c
static WebKitUserContentManager*
create_content_manager(void)
{
    g_autoptr(WebKitUserContentManager) content_manager = webkit_user_content_manager_new();
    webkit_user_content_manager_register_script_message_handler(content_manager, "powerControl");
    g_signal_connect(content_manager, "script-message-received::powerControl",
                     G_CALLBACK(handle_power_control_message), NULL);
    return g_steal_pointer(&content_manager);
}
```

The callback receives a [WebKitJavascriptResult][api-jsresult], from which we
can get the [JSCValue][api-jscvalue] with the contents of the parameter
passed to the `postMessage()` function. The `JSCValue` can now be inspected
to check for malformed messages and determine the action to take, and
then arrange to call `reboot()`:
```c
static void
handle_power_control_message(WebKitUserContentManager *content_manager,
                             WebKitJavascriptResult *js_result, void *userdata)
{
    JSCValue *value = webkit_javascript_result_get_js_value(js_result);
    if (!jsc_value_is_string(value)) {
        g_warning("Invalid powerControl message: argument is not a string");
        return;
    }

    g_autofree char *value_as_string = jsc_value_to_string(value);
    int action;
    if (strcmp(value_as_string, "poweroff") == 0) {
        action = RB_POWER_OFF;
    } else if (strcmp(value_as_string, "reboot") == 0) {
        action = RB_AUTOBOOT;
    } else {
        g_warning("Invalid powerControl message: '%s'", value_as_string);
        return;
    }

    g_message("Device will %s now!", value_as_string);
    sync(); reboot(action);
}
```

Note that the `reboot()` system call above will most likely fail because it
needs administrative privileges. While the browser process could run as `root`
to sidestep this issue&mdash;definitely *not* recommended!&mdash;it would be
better to grant the `CAP_SYS_BOOT` capability to the process, and *much*
better to ask the system manager daemon to handle the job. In machines
using [systemd](https://systemd.io/) a good option is to call the `.Halt()`
and `.Reboot()` methods of its `org.freedesktop.systemd1` interface.

Now we can write a small HTML document with some JavaScript sprinkled on top
to arrange sending the messages:

```html
<html>
  <head>
    <meta charset="utf-8" />
    <title>Device Power Control</title>
  </head>
  <body>
    <button id="reboot">Reboot</button>
    <button id="poweroff">Power Off</button>
    <script type="text/javascript">
      function addHandler(name) {
        document.getElementById(name).addEventListener("click", (event) => {
          window.webkit.messageHandlers.powerControl.postMessage(name);
          return false;
        });
      }
      addHandler("reboot");
      addHandler("poweroff");
    </script>
  </body>
</html>
```

The complete source code for this example can be found
[in this Gist](https://gist.github.com/aperezdc/621c1ec6bb78923e27fc035fa0689522).

### Going In The Other Direction

But how can one return values from user messages back to the JavaScript code
running in the context of the web page? Until recently, the only option
available was exposing some known function in the page’s JavaScript code, and
then using
[webkit_web_view_run_javascript()](https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/method.WebView.run_javascript.html)
to call it from native code later on. To make this more idiomatic and allow
waiting on a [Promise][mdn-promise], an approach like the following works:

1. Have convenience JavaScript functions wrapping the calls to
   `.postMessage()` which add an unique identifier as part of the message,
   create a `Promise`, and store it in a `Map` indexed by the identifier.
   The `Promise` is itself returned from the functions.
2. When the callback in native code handle messages, they need to take
   note of the message identifier, and then use
   `webkit_web_view_run_javascript()` to pass it back, along with the
   information needed to resolve the promise.
3. The Javascript code running in the page takes the `Promise` from
   the `Map` that corresponds to the identifier, and resolves it.

To make this approach a bit more palatable, we could tell WebKit to [inject a
script](https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/method.UserContentManager.add_script.html)
along with the regular content, which would provide the [helper
functions](https://gist.github.com/aperezdc/a112c6a61a5a11885eac2498702e3a6d)
needed to achieve this.

Nevertheless, the approach outlined above is cumbersome and can be
tricky to get right, not to mention that the effort needs to be duplicated in
each application. Therefore, we have recently added new API hooks to provide this
as a built-in feature, so starting in WPE WebKit 2.40 the recommended approach
involves using
[webkit_user_content_manager_register_script_message_handler_with_reply()](https://people.igalia.com/aperez/Documentation/wpe-webkit-2.0/method.UserContentManager.register_script_message_handler_with_reply.html)
to register handlers instead. This way, calling `.postMessage()` now returns a
`Promise` to the JavaScript code, and the callbacks connected to the
[script-message-with-reply-received](https://people.igalia.com/aperez/Documentation/wpe-webkit-2.0/signal.UserContentManager.script-message-with-reply-received.html)
signal now receive a
[WebKitScriptMessageReply](https://people.igalia.com/aperez/Documentation/wpe-webkit-2.0/struct.ScriptMessageReply.html),
which can be used to resolve the promise&mdash;either on the spot, or
asynchronously later on.


### Further Ideas (Bis)

User script messages are a powerful and rather flexible facility to make WPE
integrate web content into a complete system. The provided example is rather
simple, but as long as we do not need to pass huge amounts of data in
messages the possibilities are almost endless&mdash;especially with the
added convenience in WPE WebKit 2.40. Here are more ideas that can
be built on top of user script messages:

* A handler could receive requests to “monitor” some object, and
  return a `Promise` that gets resolved when it has received changes.
  For example, this could make the user interface of a smart thermostat
  react to temperate updates from a sensor.
* A generic handler that takes the message payload and converts it into
  [D-Bus](https://en.wikipedia.org/wiki/D-Bus) method calls, allowing
  web pages to control many aspects of a typical Linux system.


## Wrapping Up

WPE has been designed from the ground up to integrate with the rest of the
system, instead of having a sole focus on rendering Web content inside a
monolithic web browser application. Accordingly, the public API must be
comprehensive enough to use it as a component of *any* application. This
results in features that allow plugging into the web engine at different
layers to provide custom behaviour.

At Igalia we have years of experience embedding WebKit into all kinds of
applications, and we are always sympathetic to the needs of such systems. If
you are interested collaborating with WPE development, or searching for a
solution that can tightly integrate web content in your device, feel free to
[contact us](https://www.igalia.com/contact/).


[wpewebkit-api]: https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/
[api-webview]: https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/class.WebView.html
[api-contentmgr]: https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/class.UserContentManager.html
[api-ctxurischeme]: https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/method.WebContext.register_uri_scheme.html
[api-gio-gresource]: https://docs.gtk.org/gio/struct.Resource.html
[api-jsresult]: https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1/struct.JavascriptResult.html
[api-jscvalue]: https://people.igalia.com/aperez/Documentation/wpe-javascriptcore-1.1/class.Value.html
[mdn-web-apis]: https://developer.mozilla.org/en-US/docs/Web/API
[mdn-web-api-fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[node-addons]: https://nodejs.org/api/addons.html#c-addons
[mdn-cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[mdn-promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

<!-- vim:set foldmethod=marker foldmarker=<<<,>>>: -->
