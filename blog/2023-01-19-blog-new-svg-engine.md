---
title: "Status of the new SVG engine in WebKit"
author: nzimmermann
permalink: /blog/05-new-svg-engine.html
thumbnail: /assets/lbse-logo-wide.png
preview: Let's take a detour from the <a href="/blog/04-wpe-networking-overview.html">previous WPE architecture related posts</a> to other aspects of our work on WebKit at Igalia. Today, the status of the development of WebKits' new SVG engine is presented, along with an introduction to the topic, and an outlook for 2023.
---

<style>
figure {
margin: 0;
}

figure > figure {
  border: 1px #cccccc solid;
  padding: 4px;
}

figcaption {
  background-color: #cccccc;
  color: black;
  padding: 1px;
  text-align: center;
  margin-bottom: 4px;
}
</style>

In the <a href="/blog/04-wpe-networking-overview.html">previous posts of this series</a>, various aspects of the WPE port architecture were covered. Besides maintaining and advancing the WPE port according to our customers' needs, Igalia also participates in the development of the **WebCore** engine itself, which is shared by *all* WebKit ports. WebCore is the part of the browser engine that does the heavy lifting: it contains all functionality necessary to load, parse, lay out, and paint Web content.

Since late 2019, Igalia has been working on a new SVG engine, dubbed **L**ayer-**B**ased **S**VG **E**ngine (**LBSE**), that will unify the HTML/SVG rendering pipelines in WebCore. This will resolve long-standing design issues of the "legacy" SVG engine and unlock a bunch of new *exciting* possibilities for Web developers to get creative with SVG. <a href="https://blogs.igalia.com/nzimmermann/posts/2021-10-13-svg-performance/">Hardware-accelerated compositing</a>, driven by CSS `transform` animations, <a href="https://blogs.igalia.com/nzimmermann/posts/2019-12-12-3d-transformations/">3D perspective transformations</a> for arbitrary SVG elements, CSS `z-index` support for all SVG graphics elements, and proper coverage rectangle computations and repaints are just a few highlights of the capabilities the future SVG engine will offer.

In this article, an overview is given about the problems that LBSE aims to solve, and the importance of a performant, well-integrated SVG engine *especially* for the embedded market. Finally, the current upstreaming status is summarized including an outlook for the year **2023**.

## LBSE in a nutshell

Before diving into the technical topics, let's take a few minutes to recap the motivations behind the LBSE work, and explain the importance of a well-integrated, performant SVG engine in WebKit, *especially* for the embedded market.

### Motivation

Many of our customers build products that utilize a Linux-powered embedded device, typically using non-x86 CPUs, custom displays with built-in input capabilities (e.g., capacitive touchscreens) often without large amounts of memory or even permanent storage. The software stack for these devices usually consists of a device-specific Linux distribution, containing the proprietary network, GPU, and drivers for the embedded device - the vendor-approved *"reference distribution"*.
 
No matter what type of product is built nowadays, many of them need an active Internet connection, to e.g. update their software stack and access additional information. Besides the UI needed to control the product, a lot of additional dialogs, wizards and menus have to be provided to be able to alter the devices' "system settings", such as date/time information, time zones, display brightness, WiFi credentials, Bluetooth settings, and so on.

A variety of toolkits exist that assist in writing GUI applications for embedded devices, with a few open-source projects on the market, as well as commercial products providing closed-source, proprietary solutions, that *specifically* target the embedded market and are often optimized for specific target device families, e.g. certain ARM processors / certain GPUs.

If the need arises, not only to communicate with the Internet but also to display arbitrary Web content, WPE comes into play. As presented in the <a href="/blog/02-overview-of-wpe.html#how-does-wpe-integrate-with-webkit%3F">first post in this series</a>, the flexible and modular WPE architecture makes it an ideal choice for any product in the embedded market that needs Web browsing abilities. The <a href="https://docs.gtk.org/glib">GLib</a>/C-based <a href="https://people.igalia.com/aperez/Documentation/wpe-webkit-1.1">WPE public APIs</a> allow for customization of the browsing engine and its settings (react on page load/input events, inject custom JS objects, modify style sheets, etc.) and allow the embedder to control/monitor all relevant Web browsing-related activities.

With a full-fledged Web engine at hand, one might ponder if it is feasible to replace the whole native GUI stack with a set of Web pages/applications, and only use WPE to paint the UI in full-screen mode, thus migrating away from native GUI applications — following the trend in the desktop market. The number of organizations migrating native GUI applications into Web applications is *rapidly* increasing, since there are compelling reasons for Web apps: "write once, use everywhere", avoiding vendor lock-in, easy/reliable deployment and update mechanisms, and efficient test/development cycles (local in-browser testing!).

Due to the sheer capabilities of the Web platform, it has grown to an environment in which any kind of application can be developed -- ranging from video editing applications, big data processing pipelines to 3D games, all using JS/WebAssembly in a browser, presented using HTML5/CSS. And as an important bonus: in 2023, it's much easier to find and attract talented Web developers and designers that are fluent in HTML/CSS/JS, than those that are comfortable designing UI applications in proprietary, closed-source C/C++ frameworks.

A long-term customer, successfully using WPE in their products, had very similar thoughts and carried out a study, contracting external Web designers to build a complete UI prototype using Web technology. The mock-up made extensive use of SVG2, embedded inline into HTML5 documents or via other mechanisms (CSS `background-image`, etc.). The UI fulfilled all expectations and worked great in Blink and WebKit-based browsers, delivering smooth animations. On the target device, however, the performance was too slow, far away from usable. A thorough analysis revealed that large parts of the Web page were constantly repainted, and layout operations were repeated for every frame when animations were active. The accumulated time to display a new frame during animations was in the order of a few milliseconds on desktop machines, but took 20-25 milliseconds on the target device, making smooth 60 FPS animations *impossible*.

The poor performance is not the result of shortcomings in the WPE port of WebKit: when replacing the aforementioned animated SVG document fragments with HTML/CSS "equivalents" (e.g. simulating SVG circles with CSS `border-radius` tricks) the performance issue vanisheed. Why? SVG lacks support for a key feature called **accelerated compositing**, which has been available for HTML/CSS since its introduction more than a decade ago. This compositing heavily relies on the **Layer Tree**, which is unaware of SVG. Extending the **Layer Tree** implementation to account for SVG is the **main motivation for LBSE**.

If you are unfamiliar with the concepts of **Render Tree** and **Layer Tree**, you might want to read the *"Key concepts"* section of an earlier <a href="https://blogs.igalia.com/nzimmermann/posts/2021-10-29-layer-based-svg-engine/page/3/#key-concepts">LBSE design document</a>, which provides an overview of the topic.

### Prototyping

The LBSE effort began in October 2019 as **a research project**, to find out an ideal design for the SVG **Render Tree**, that allows SVG to re-use the existing **Layer Tree** implementation with minimal changes. The aim for LBSE is to share as much code as possible with the HTML/CSS implementation, removing the need for things like SVG specific clipping/masking/filter code and disjoint HTML counterparts for the same operations.

After an extensive phase of experimentation, two abandoned approaches, and a long time spent on regression fixing, the LBSE prototype was finally finished after almost two years of work. It passed all 60k+ WebKit layout tests and offered initial support for compositing, 3D transformations, `z-index`, and more. The intent was to prove that we can reach feature parity with the legacy SVG engine and retrieve the very same visual results, pixel-by-pixel (except for progressions of LBSE). Shortly after the finalization, the prototype was presented during the <a href="https://blogs.igalia.com/nzimmermann/posts/2021-10-13-svg-performance/">WebKit contributors meeting in 2021</a>.

As the name "prototype" indicates, LBSE was not ready for integration into WebKit at this point. It **replaced** the old SVG engine with a new one, resulting in a monolithic patch exceeding *650 KB* of code changes. External contributions generally demand small patches, with ChangeLogs, tests, etc. -- no conscientious reviewer in any company would approve a patch replacing a core component of a browser engine in one shot. Splitting up into small pieces is also not going to work, since SVG needs to be kept intact upstream all the time. Duplicating the whole SVG engine? Not practicable either. With that problem in mind, a fruitful discussion took place with Apple during and after the WebKit contributors meeting: a realistic upstreaming strategy was defined - thanks *Simon Fraser* for suggesting a pragmatic approach!

The idea is simple: bootstrap LBSE *in parallel* to the legacy SVG engine. Upstream LBSE behind a compile-time flag and additionally a runtime setting. This way the LBSE code is compiled by the <a href="https://trac.webkit.org/wiki/EarlyWarningSystem">EWS bots</a> during upstreaming (rules out bit-rot) and we gain the ability to turn LBSE on, selectively, from our layout tests -- very useful during early bootstrapping. For WebKit, that strategy is the best -- for LBSE another *major* effort is necessary: moving from a **drop-in replacement** approach to a **dual-stack** SVG engine: LBSE + legacy built into the same WebKit binaries. At least the timing was good since a split-up into small pieces was needed anyhow for upstreaming. Time to dissect the huge branch into logical, atomic pieces with proper change logs.

Before we jump to the upstreaming status, one question should be answered, that came up during the WebKit contributors meeting and also during various discussions: why don't you just *fix* the existing SVG engine and instead propose a new one - isn't that too risky for Web compatibility?

### Why don't you fix the existing SVG engine?

<img style="float: right; width: 55%;" alt="LBSE logo" src="/assets/lbse-logo-wide.png">

There was *no initial intention* to come up with a new SVG engine. During LBSE development it became apparent how much SVG-specific code can be erased when unifying certain aspects with HTML/CSS. After carrying out the integration work, layout/painting and hit-testing work fundamentally different than before. Since that time, LBSE is labeled as a *"new SVG engine"*, even though the SVG DOM tree part remained almost identical. Web compatibility will *improve* with LBSE: a few long-standing, critical interop issues with other browser vendors are solved in LBSE. Therefore, there are no concerns regarding Web compatibility risks from our side.

To answer the initial question, whether it is possible to fix the existing SVG engine to add layer support without adding a "new" SVG engine in parallel? Short answer: *no*.

In the following section, it is shown that adding support for layers implies changing the class hierarchy of the SVG render tree. All SVG renderers need to inherit from `RenderLayerModelObject` -- a change like this cannot be split up easily into small, atomic pieces. Improving the design is difficult if there's a requirement to keep the SVG engine working all the time upstream: all patches in that direction end up being large as many renderers have to be changed at the same time. Having distinct, LBSE-only implementations of SVG renderers, independent of the legacy engine, leaves a lot of freedom to strive for an optimal design, free of legacy constraints, and avoids huge patches that are *impossible* to review.

Let's close the introduction and review the upstreaming status, and discuss where we stand today.

## Upstreaming progress

### Planning

To unify the HTML/CSS and SVG rendering pipelines there are two possible paths to choose from: teach the **Layer Tree** about the SVG **Render Tree** and its rendering model, or vice-versa. For the latter path, the HTML/CSS-specific `RenderLayer` needs to split into HTML/SVG subclasses and a base class, that is constructible from non-`RenderLayerModelObject`-derived renderers. The layer management code currently in `RenderLayerModelObject` would need to move into another place, and so forth. This *invasive* approach can potentially break lots of things. Besides that danger, many places in the layer/compositing system would need subtle changes to account for the specific needs of SVG (e.g. different coordinate system origin/convention).

Therefore the former route was chosen, which requires transforming the SVG render tree class hierarchy, such that all renderers that need to manage layers derive from **`RenderLayerModelObject`**. Using this approach support, for SVG can be added to the layer/compositing system in a *non-invasive* manner, with only a minimum of SVG-specific changes. The following class hierarchy diagrams illustrate the planned changes.

<figure style="display: inline-block;">
<figure style="margin-left: 0; margin-right: auto; display: inline-block; width: 48%;">
<figcaption><a href="/assets/svg/svg_render_tree_legacy.svg" target="_blank">Legacy design (click to enlarge)</a></figcaption>
<img alt="Visualization of the legacy SVG render tree class hierarchy in WebCore" src="/assets/svg/svg_render_tree_legacy.svg">
</figure>

<figure style="margin-left: auto; margin-right: 0; display: inline-block; width: 48%">
<figcaption><a href="/assets/svg/svg_render_tree_lbse.svg" target="_blank">LBSE design (click to enlarge)</a></figcaption>
<img alt="Visualization of the LBSE SVG render tree class hierarchy in WebCore" src="/assets/svg/svg_render_tree_lbse.svg">
</figure>
</figure>

The first graph shows the class hierarchy of the render tree in the legacy SVG engine: `RenderObject` is the base class for all nodes in the render tree. `RenderBoxModelObject` is the common base class for all HTML/CSS renderers. It inherits from `RenderLayerModelObject`, potentially allowing HTML renderers to create layers. For the SVG part of the render tree, there is no common base class shared by all the SVG renderers, for historical reasons. 

The second graph shows only the SVG renderers of the LBSE class hierarchy. In that design, all relevant SVG renderers may create/destroy/manage layers, via `RenderLayerModelObject`. More information regarding the challenges can be found in the earlier <a href="https://blogs.igalia.com/nzimmermann/posts/2021-10-29-layer-based-svg-engine/page/6/#legacy-class-hierarchy">LBSE design document</a>.

### Report

The upstreaming work started in **December 2021**, with the introduction of a new layer-aware root renderer for the SVG render subtree: `RenderSVGRoot`. The existing <a href="https://trac.webkit.org/changeset/286392/webkit">`RenderSVGRoot` class was renamed to `LegacyRenderSVGRoot`</a> (as well as any files, comments, etc.) and all call sites and build systems were adapted. Afterward, a stub implementation <a href="https://trac.webkit.org/changeset/286842/webkit">of a layer-aware `RenderSVGRoot` class was added</a> and assured that the <a href="https://trac.webkit.org/changeset/286846/webkit">new renderer is created for the corresponding SVG DOM element</a> if LBSE is activated. 

That process needs to be repeated for all SVG renderers that have substantially changed in LBSE and thus deserve an LBSE-specific upstream implementation. For all other cases, in-file `#if ENABLE(LAYER_BASED_SVG_ENGINE) ... #endif` blocks will be used to encapsulate LBSE-specific behavior. For example, `RenderSVGText` / `RenderSVGInlineText` are almost identical in LBSE downstream, compared to their legacy variants; thus, they are going to share the renderer implementation between the legacy SVG engine and LBSE.

The multi-step procedure was repeated for <a href="https://trac.webkit.org/changeset/287538/webkit">`RenderSVGModelObject`</a> (the base class for SVG graphics primitives), <a href="https://trac.webkit.org/changeset/287832/webkit">`RenderSVGShape`</a>, <a href="https://trac.webkit.org/changeset/287834/webkit">`RenderSVGRect`</a>, and <a href="https://trac.webkit.org/changeset/287921/webkit">`RenderSVGContainer`</a>. Core functionality such as laying out children of a container, previously hidden in <a href="https://github.com/WebKit/WebKit/blob/main/Source/WebCore/rendering/svg/SVGRenderSupport.cpp#L241">`SVGRenderSupport::layoutChildren()`</a> in the legacy SVG engine, now lives in a dedicated class: <a href="https://trac.webkit.org/changeset/288011/webkit">`SVGContainerLayout`</a>. Computing the various SVG bounding boxes - **object/stroke/decorated  bounding box** - is <a href="https://svgwg.org/svg2-draft/coords.html#BoundingBoxes">precisely specified in SVG2</a> and got a dedicated implementation as the <a href="https://trac.webkit.org/changeset/287873/webkit">`SVGBoundingBoxComputation`</a> class, instead of fragmenting the algorithms all over the SVG render tree as in the legacy SVG engine. 

By **February 2022**, enough functionality was in place to construct the LBSE render tree for basic SVG documents, utilizing nested containers and rectangles as leaves. While this doesn't sound exciting *at all*, it provided an ideal environment to implement support for SVG in the `RenderLayer`-related code - **before** converting all SVG renderers to LBSE, and **before** implementing painting in the SVG renderers.

Both `RenderLayer` and `RenderLayerBacking` query CSS geometry information such as **border box**, **padding box**, or **content box** from their associated renderer, which is expected to be a **`RenderBox`** in many places. This is *incorrect* for SVG: `RenderSVGModelObject` inherits from `RenderLayerModelObject`, but not from `RenderBox` since it doesn't adhere to the CSS box model. Various call sites cast the associated renderer to `RenderBox` to call e.g. `borderBoxRect()` to retrieve the border box rectangle. There are similar accessors in SVG to query the geometry, but there is no equivalent of a **border box** or other CSS concetps in SVG. Therefore, we extended `RenderSVGModelObject` to provide a **CSS box model view** of an SVG renderer, by offering methods such as `borderBoxRectEquivalent()` or `visualOverflowRectEquivalent()` that return geometry information in the same coordinate system using the same conventions as their HTML/CSS counterparts. 

We also refactored `RenderLayer` to use a proxy method - `rendererBorderBoxRect()` - <a href="https://trac.webkit.org/changeset/289210/webkit">that provides access</a> to the `borderBoxRect()` for HTML and the `borderBoxRectEquivalent()` for SVG renderers, and the same <a href="https://trac.webkit.org/changeset/289213/webkit">fix</a> to `RenderLayerBacking`. With these fixes in place, support to <a href=">https://trac.webkit.org/changeset/289207/webkit">position and size SVG layers</a> and to <a href="https://trac.webkit.org/changeset/289204/webkit">compute overflow information</a> could be added -- *both* pre-conditions to enable painting.

By **March 2022**, LBSE <a href="https://trac.webkit.org/changeset/290324/webkit">was able to paint basic SVG documents</a> - a major milestone for the bootstrapping process, demonstrating that the layer painting code was functional for SVG. It was time to move on to *transformations*: implementing <a href="https://trac.webkit.org/changeset/290880/webkit">`RenderSVGTransformableContainer`</a> (e.g. `<g>` elements with a non-identity `transform` attribute or CSS `transform` property) and CSS/SVG `transform` support for all other graphics primitives, utilizing the `RenderLayer`-based **CSS Transform** implementation. As preparation, the existing code was reviewed and <a href="https://trac.webkit.org/changeset/291338/webkit">cleaned up</a>: `transform-origin` computation <a href="https://trac.webkit.org/changeset/291338/webkit">was decoupled</a> from CTM computation (CTM = current transformation matrix, see <a href="https://www.w3.org/TR/css-transforms-1/#current-transformation-matrix">CSS Transforms Module Level 1</a>) and `transform-box` computations <a href="https://trac.webkit.org/changeset/292525/webkit">were unified in a single place</a>.

In **April 2022**, **2D transforms** <a href="https://trac.webkit.org/changeset/292706/webkit">were enabled</a> and became <a href="https://trac.webkit.org/changeset/293504/webkit">fully functional</a> a few weeks later. Besides missing *compositing support* upstream, downstream work showed that enabling 3D transforms for SVG required <a href="https://trac.webkit.org/changeset/294615/webkit">fixing a decade-old bug</a> that made the computed `perspective` transformation dependent on the choice of `transform-origin`. That became apparent when testing the layer code with SVG, which uses different default values for certain transform-related CSS properties than HTML does: `transform-box: view-box` and `transform-origin: 0 0` are the relevant defaults for SVG, referring to the top-left corner of nearest SVG viewport vs. the center of the element in HTML.

By **May 2022**, the legacy SVG text rendering code was <a href="https://trac.webkit.org/changeset/294385/webkit">altered to be usable for LBSE as well</a>. At this point, it made sense to run layout tests using LBSE. Previously most tests were expected to fail, as most either utilize text, paths, or shapes, and sometimes all three together. LBSE render tree text dumps (dumping the parsed render tree structure in a text file) were added for all tests in the `LayoutTests/svg` subdirectory, as well as a new pixel test baseline (screenshots of the rendering as PNGs), generated using the legacy SVG engine, to verify that LBSE produces pixel-accurate results. All upcoming LBSE patches are expected to *change* the expected layout test result baseline, and/or the `TestExpectations` file, depending on the type of patch. This will ease the reviewing process a lot for future patches.

To further proceed, a **test-driven approach** was used to prioritize the implementation of the missing functionality. At that time, missing `viewBox` support for outer \<svg\> elements was causing many broken tests. The effect of the transformation induced by the **viewBox** attribute, specified on outer \<svg\> elements, cannot be implemented as an additional CSS transformation applied to the outermost \<svg\> element, as that would affect the painted dimensions of the SVG document, which are subject to the CSS `width`/`height` properties and the size negotiation logic only. The `viewBox` attribute is supposed to only affect the visual appearance of the descendants, by establishing a new local coordinate system for them. The legacy SVG engine manually handled the `viewBox`-induced transformation in various places throughout `LegacyRenderSVGRoot`, to only affect the painting of the descendants and not e.g. the position/dimension of the border surrounding the \<svg\>, if the CSS `border` property is specified. In LBSE, transformations are handled on `RenderLayer`-level and not in the renderers anymore. 

By **July 2022**, after testing different approaches, a proper solution <a href="https://commits.webkit.org/252643@main">to add `viewBox` support was upstreamed</a>. The chosen solution makes use of another CSS concept that arises in the context of generated content: *"anonymous boxes"*. The idea is to wrap the direct descendants of `RenderSVGRoot` in an anonymous `RenderSVGViewportContainer` ("anonymous" = no associated DOM element) and apply the `viewBox` transformation as a regular CSS transformation on the anonymous renderer. With that approach, LBSE is left with just a *single, unified* `viewBox` implementation, without error-prone special cases in `RenderSVGRoot`, unlike the legacy SVG engine which has two disjoint implementations in `LegacyRenderSVGViewportContainer` and `LegacyRenderSVGRoot`.

After the summer holidays, in **August 2022**, the next major milestone was reached: <a href="https://bugs.webkit.org/show_bug.cgi?id=242833">enabling compositing support for arbitrary SVG elements</a>, bringing **z-index** support, **hardware-accelerated compositing** and **3D transforms** to SVG. This time *all lessons* learned from the previous LBSE prototypes were taken into account, resulting in a *complete* compositing implementation, that works in various scenarios: different `transform-box` / `transform-origin` combinations, inline SVG enclosed by absolute/relative positioned CSS boxes and many more, all way more polished than in the "final" LBSE prototype.

The aforementioned patch contained a fix for a <a href="https://webkit.org/b/27684">long-standing bug</a> (*"Composited elements appear pixelated when scaled up using transform"*), that made composited elements look blurry when scaling up with a CSS `transform` animation. The so-called *"backing scale factor"* of the associated `GraphicLayers` (see <a href="/blog/03-wpe-graphics-architecture.html">here for details</a> about the role of `GraphicLayer` in the compositing system</a>) never changes during the animation. Therefore, the rendered image was scaled up instead of re-rendering the content at the right scale. LBSE now enforces updates of that scale factor, to avoid blurry SVGs. The fix is *not* activated yet for HTML as that requires more thought - see the previously-linked bug report for details.
 
With all the new features in place and covered by tests, it was time to finish the remaining SVG renderers: <a href="https://commits.webkit.org/250913@main">RenderSVGEllipse</a>, <a href="https://commits.webkit.org/251688@main">RenderSVGPath</a> and <a href="https://commits.webkit.org/252500@main">RenderSVGViewportContainer</a> (for inner \<svg\> elements), <a href="https://commits.webkit.org/253510@main">RenderSVGHiddenContainer</a>, <a href="https://commits.webkit.org/253793@main">RenderSVGImage</a>, and <a href="https://commits.webkit.org/253816@main">RenderSVGForeignObject</a>. A proper \<foreignObject\> implementation was lacking in WebKit for 15+ years, due to the fundamental problem that the layer tree was not aware of the SVG subtree. The LBSE variant of `RenderSVGForeignObject` looks trivial, yet offers a fully compatible **\<foreignObject\> implementation** - for the first time without issues with non-static positioned content as a direct child of \<foreignObject\>, at least a few weeks later after <a href="https://commits.webkit.org/256960@main">it landed</a>.

Returning to the test-driven approach, the next best target to fix was text rendering, which was working but not pixel-perfect. The legacy SVG engine takes into account the transformation from the text element up to the topmost renderer when computing the effective "on-screen" font size used to select a font for drawing/measuring, during *layout* time. LBSE needed a way to calculate the CTM for a given SVG renderer, up to a given ancestor renderer (or root), taking into account all possible transformation scenarios, including CSS `transform`, `translate`, `rotate`, SVG `transform` attribute, shifts due to `transform-origin`, perspective transformations, and much more. The *same functionality* is required to implement `getCTM()` / `getScreenCTM()`. 

By the end of **August 2022**, <a href="https://commits.webkit.org/253938@main">`SVGLayerTransformComputation` was added</a> that re-used the existing `mapLocalToContainer()` / `TranformState` API to obtain the CTM. The CTM construction and ancestor chain walk - to accumulate the final transformation matrix - is performed by `mapLocalToContainer()` and no longer needs a special, *incomplete* SVG approach: the existing general approach now works for SVG too.

**September 2022** was mostly devoted to bug fixes related to **pixel-snapping**. Outermost \<svg\> elements <a href="https://commits.webkit.org/254314@main">were not always enforcing stacking contexts</a> and <a href="https://commits.webkit.org/254558@main">failed to align to device pixels</a>. All other elements behaved fine with respect to pixel snapping (*not* applied for SVG elements) unless compositing layers were active. In that case, a `RenderLayerBacking` code path was used that unconditionally applied pixel-snapping - <a href="https://commits.webkit.org/254863@main">avoid that for SVG</a>.

By **October 2022** LBSE could <a href="https://commits.webkit.org/255291@main">properly display</a> SVGs embedded into HTML host documents via \<object\> elements -- the size negotiation logic failed to take into account the LBSE-specific renderers before. CSS `background-image` / `list-image` / HTML \<img\> / etc. <a href="https://commits.webkit.org/255625@main">were fixed as well</a>. Zooming and panning support were <a href="https://commits.webkit.org/255727@main">implemented and improved compared to the legacy engine</a>. Along the way an important bug was fixed, one that other browsers had already fixed back in 2014. The bug caused percentage-sized documents (e.g. `width: 100%; height: 100%`) that also specify a `viewBox` to always keep the document size, regardless of the zoom level. Thus, upon zooming, only the stroke width enlarged, but not the boundaries of the document, and thus scrollbars never appeared.

Over the following weeks, text-related issues had to be fixed, which were responsible for a bunch of the remaining test issues. Transformed text did not render, which turned out to be a simple <a href="https://commits.webkit.org/255801@main">mistake</a>. More tests were upstreamed, related to <a href="https://commits.webkit.org/256502@main">compositing</a> and <a href="https://commits.webkit.org/256948@main">transformations</a>. More test coverage revealed that transform changes were not handled consistently -- it took a period of investigation to <a href="https://commits.webkit.org/256787@main">land a proper fix</a>. SVG transform / SMIL \<animateMotion\> / SMIL \<animateTransform\> / CSS transform changes are now handled consistently in LBSE, leading to proper repaints, as expected.

Transformation support can be considered complete and properly handled both during the painting and layout phases. Dynamic changes at runtime are correctly triggering invalidations. However, the Web-exposed **SVG DOM API** that allows querying the transformation matrices of SVG elements, such as `getCTM()` and `getScreenCTM()`, was still missing. By **November 2022** a complete implementation <a href="https://commits.webkit.org/256862@main">was upstreamed</a>, that utilized the new `SVGLayerTransformComputation` class to construct the desired transformation matrices. This way the same internal API is used for painting/layout/hit-testing and implementing the **SVG DOM accessors**.

By **December 2022** LBSE was in a good shape: most important architectural changes were upstreamed and the most basic features were implemented. The year closed with a proposed <a href="https://github.com/WebKit/WebKit/pull/7482">patch</a> that will avoid re-layout when an element's transform changes. The legacy SVG engine always needs a re-layout if transform changes, as the size of each ancestor can depend on the presence of transformations on the child elements -- a bad design decision two decades ago that LBSE will resolve. Only repainting should happen, but no layouts, in LBSE.

Let's move on to 2023, and recap what's still missing in LBSE.

### Next steps

Besides fixing all remaining test regressions (see <a href="https://github.com/WebKit/WebKit/blob/main/LayoutTests/platform/mac-ventura-wk2-lbse-text/TestExpectations">`LayoutTests/platform/mac-ventura-wk2-lbse-text/TestExpectations`</a>) "SVG resources" are missing in LBSE. That includes all "paint servers" and advanced painting operations: there is no support for linear/radial gradients, no support for patterns, and no support for clipping/masking and filters. 

From the painting capabilities, LBSE is still in a *basic shape*. However, this was intentional, since a lot of the existing code for SVG resource handling is *no longer needed* in LBSE. Clipping/masking and filters will be handled via `RenderLayer`, reusing the existing HTML/CSS implementations. Temporary `ImageBuffers` are no longer needed for clipping, and thus there is no need to cache the "per client" state in the resource system (e.g. re-using the cached clipping mask for repainting). This will simplify the implementation of the "SVG resources" a lot.

Therefore the first task in 2023 is to implement clipping, then masking, gradients, patterns, and as the last item, filters, since they require a substantial amount of refactoring in `RenderLayerFilters`.
Note that these implementations are already complete in LBSE downstream and do not need to be invented from scratch. The first patches in that direction should be up for review by **February 2023**.

After all "SVG resources" are implemented in LBSE, feature parity is almost there and performance work will follow afterward. WebKit has a golden rule to never ship a performance regression; therefore, LBSE needs to be at least as fast in the standard performance tests, such as *MotionMark*, before it can replace the legacy engine. Currently, LBSE is *slower than the legacy engine* with respect to static rendering performance. Quoting numbers does not help at present, since the problem is well understood and will be resolved in the following months. 

LBSE currently creates more `RenderLayer` objects than necessary: for each renderer, unconditionally. This is a great stress test of the layer system, and helpful for bootstrapping, but the associated overhead and complexity are simply not necessary for many cases, and actively hurt performance. LBSE already outperforms the legacy SVG engine whenever animated content is viewed, if it benefits from the *hardware acceleration* in LBSE.

2023 will be an exciting year, and hopefully brings LBSE to the masses, stay tuned!

## Demos

"A picture is worth a thousand words", so we'd like to share with you the videos shown during the **WebKit contributors meeting in 2022** that demo the LBSE capabilities. Be sure to check them out so you can get a good picture of the state of the work. Enjoy!

1. [Accelerated 2D transforms (Tiger)](https://cloud.igalia.com/s/fXjsXmqQocxF5P7/download/01-demo-tiger-2d.mp4)
   <p style="text-align: center">
       <video width="800" height="600" controls><source src="https://cloud.igalia.com/s/fXjsXmqQocxF5P7/download/01-demo-tiger-2d.mp4"></video>
   </p>

2. [Accelerated 3D transform (Tiger)](https://cloud.igalia.com/s/FDx9koYej65wcFb/download/02-demo-tiger-3d.mp4)
   <p style="text-align: center">
       <video width="800" height="600" controls><source src="https://cloud.igalia.com/s/FDx9koYej65wcFb/download/02-demo-tiger-3d.mp4"></video>
   </p>

3. [Transition storm (Tiger)](https://cloud.igalia.com/s/zyAAwLWRaFQMatL/download/03-demo-tiger-transition-storm.mp4)
   <p style="text-align: center">
       <video width="800" height="600" controls><source src="https://cloud.igalia.com/s/zyAAwLWRaFQMatL/download/03-demo-tiger-transition-storm.mp4"></video>
   </p>

4. [Vibrant example](https://cloud.igalia.com/s/e2ZfqWpnT44awEZ/download/04-demo-vibrant.mp4)
   <p style="text-align: center">
       <video width="800" height="600" controls><source src="https://cloud.igalia.com/s/e2ZfqWpnT44awEZ/download/04-demo-vibrant.mp4"></video>
   </p>

## Final thoughts

We at Igalia are doing our best to fulfill the mission and complete the LBSE upstreaming as fast as possible. In the meanwhile, let us know about *your* thoughts:

* What would you do with a performant, next-level SVG engine?
* Any particular desktop / embedded project that would benefit from it?
* Anything in reach now, that seemed impossible before with the given constraints in WebKit?

Thanks for your attention! Be sure to keep an eye on <a href="https://github.com/nikolaszimmermann/WebKitIgalia/issues/1">our "Upstreaming status" page at GitHub</a> to follow LBSE development.
