---
title: "Update on the Layer Based SVG Engine (LBSE) in WebKit"
author: rbuis
permalink: /blog/status-of-lbse-in-webkit.html
thumbnail: /assets/lbse-logo-wide.png
preview: A look back at the last seven months of development on the Layer Based SVG Engine (LBSE) in WebKit.
---

This blog entry gives an update on what we at <a href="https://www.igalia.com">Igalia</a> have done on upstreaming and development of LBSE in WebKit in the last seven months. For an explanation of
what LBSE is and how it is related to WPE, see this <a href="https://wpewebkit.org/blog/05-new-svg-engine.html">previous entry</a> as a refresher.

<div style="float: right">
<figure>
  <a class="btn" href="https://www.igalia.com" target="_blank"><img
    style="display: block; height: 100px;"
    src="/assets/svg/igalia-tagline.svg"
    alt="The Igalia logo"></img>
  </a>
</figure>

<figure>
  <a class="btn" href="https://wix.com" target="_blank"><img
    style="display: block; height: 60px;"
    src="/assets/svg/wix-logo.svg"
    alt="The Wix logo"></img>
  </a>
</figure>
</div>

Thanks to generous funding by <a href="https://www.wix.com" alt="Wix homepage"><b>Wix</b></a>, which extensively uses SVG in their products and has a broad
knowledge of the SVG peculiarities across browser engines, LBSE has made great progress in the past seven months. During this period, several advanced SVG painting
features were implemented (e.g. clip-paths, masks, gradients, patterns), along with important performance improvements that expanded the new engine's capabilities
and stability. All this was possible thanks to Wix's decision to address their problems by funding upstream work at the core of WebKit, instead of accepting
the status-quo and implementing case-by-case fixes and workarounds on their end. As a result, WebKit-based browsers now benefit from the results of this fruitful
collaboration, which we'll try to explain in more detail in this blog post.

## Project kick off and WebKit Contributors Meeting

In **October 2023** we started the project mostly by thinking about the design and roadmap. We also did some general SVG bug fixing. For example, visual overflow computation for SVG renderers was <a href="https://commits.webkit.org/268981@main">corrected</a>, which fixed quite a few SVG pixel tests. Various visual bugs were also fixed, such as <a href="https://commits.webkit.org/269034@main">unnecessary repainting when `viewBox` is used on &lt;svg&gt; elements</a>, and <a href="https://commits.webkit.org/269360@main">incorrect clipping for outermost &lt;svg&gt; elements</a>

Also in the same month, we attended the <a href="https://docs.webkit.org/Other/Contributor%20Meetings/ContributorMeeting2023.html">WebKit Contributors Meeting</a>, where we presented a talk on the LBSE (<a href="https://www.slideshare.net/igalia/integrating-the-new-layerbased-svg-engine">slides are available here</a>). The feedback on LBSE at the meeting was very positive. Giving the talk early on in the process actually helped us since we needed to have a good design in place.

## Supporting SVG resources

The main focus in **October 2023** was introducing the SVG resource concept, as already outlined in the WebKit Contributors Meeting talk. Thus, we started with <a href="https://commits.webkit.org/269522@main">adding a base SVG resource class: `RenderSVGResourceContainer` </a>. This class was kept as simple as possible, with no support for resource invalidation or repainting logic. The main task of `RenderSVGResourceContainer` is to take care of registration so that the resource can be looked up by its clients.

For the first SVG resource to implement, we chose the SVG &lt;clip-path&gt; element, so we landed <a href="https://commits.webkit.org/269635@main"><code>RenderSVGResourceClipper</code></a>. To comply with the specification, the `RenderSVGResourceClipper` implementation produces 1-bit masks and uses a special rendering mode:

- `fill-opacity`/`stroke-opacity`/`opacity` set to `1`
- masker/filter not applied when rendering the children
- `fill` set to solid black and `stroke` set to `none`

The initial implementation did not use caching of ImageBuffers for clipping, but relied on Porter-Duff DestinationIn/SourceOver compositing operations to achieve the same effect, but faster. By integrating `RenderSVGResourceClipper` properly into `RenderLayer`, it aligned SVG clipping with HTML/CSS clipping.

Finally, the implementation prefers a pure clipping solution internally, as in legacy rendering, but for more complicated clip-paths (for example when the clip-path involves text content), a fallback to a mask is done.

## Resource invalidation handling

After introducing the first SVG resource (`RenderSVGResourceClipper`), we noticed some issues with handling invalidations for it, such as adding to clip-path contents. In the legacy engine, invalidations have been handled through layouting. This caused various problems: for one, it could cause calling the `setNeedsLayout` method from within layout, which meant the invalidation chain depended on the DOM order.

In **November 2023**, <a href="https://commits.webkit.org/271017@main">an implementation landed</a> that avoided using layout for resource invalidation. Instead, on dynamic updates, the style system is used to determine the appropriate action:

- For non resources, changes that cause renderer geometry changes, like changing the `x` value of a &lt;rect&gt; element, still require a relayout. For visual changes not affecting geometry, like changing the fill color of a &lt;rect&gt;, a repaint action is enough.
- For resources, the resource is invalidated/updated with the change and any of its clients are repainted using the new resource.

## Support for masks

With improved support for SVG resource invalidation, in **late November 2023** we were ready to upstream support for the next SVG resource, <a href="https://commits.webkit.org/271153@main">RenderSVGResourceMasker</a>.

Like the support for clip-path, `RenderSVGResourceMasker` started out without caching image buffers and relied on creating temporary image buffers at rendering time. Mask content invalidations/changes were supported out of the box since we had improved resource invalidation handling (see above).

## Support for gradients

In early **January 2024**, <a href="https://commits.webkit.org/272653@main">support for SVG gradients was upstreamed</a>. Gradients are a kind of SVG resource that is a bit different to the previously implemented clipping paths and masks because it is a <a href="https://www.w3.org/TR/SVG2/pservers.html">paint server</a>, so a helper class for that called `SVGPaintServerHandling` and a base class `RenderSVGResourcePaintServer` were introduced. The main difference is in invalidation: paint servers simply need a repaint of all its clients on invalidation, whereas clipping paths/masks may need to do more work; i.e., masks underlying image buffers need to be updated before its clients can be repainted.

## Support for patterns and markers

By the end of **January 2024**, <a href="https://commits.webkit.org/273757@main">support for SVG patterns was upstreamed</a>. In the first implementation, no image buffer caching was implemented in order to keep things clean and simple. This implementation is different from the legacy implementation because the pattern contents are being rendered through pattern content layers (see <a href="https://github.com/WebKit/WebKit/blob/main/Source/WebCore/rendering/RenderLayer.cpp#L2846">`RenderLayer::paintSVGResourceLayer`</a>). To make this work, `RenderSVGResourcePattern` has to set up the graphics context matrix correctly before calling `paintSVGResourceLayer`.

Around that same time, we implemented the next to last SVG resource on our TODO list, namely <a href="https://commits.webkit.org/273820@main">SVG markers</a>.

## SVG filters

In **February 2024**, Apple started work on <a href="https://github.com/WebKit/WebKit/pull/25087">supporting SVG filters</a> in LBSE. A first iteration managed to fix a lot of the official SVG filter tests, but it turned out a <a href="https://github.com/WebKit/WebKit/pull/25512">filter regression</a> had to be fixed first. Moreover, the initial work uncovered issues with the HTML/CSS filters implementation that need to be fixed in general. Finally, another reason why this support takes more time than some other features is that there is a strong requirement to make the support efficient in both memory usage and overall (re)painting speed. Still, the early results are very promising!

## Cycle detection

It is quite easy in SVG to cause direct circular references:


```html
<svg>
    <defs>
        <pattern id="p" xlink:href="#p" />
    </defs>
    ...
</svg>
```

It is also possible to cause indirect circular references:

```html
<svg>
    <defs>
        <mask id="z" />
            <rect mask="url(#z)" />
        </mask>
    </defs>
    <ellipse mask="url(#z)" />
</svg>
```

The legacy engine solved this in an ad-hoc way in various places in the engine; it tried to break cycles before rendering, but still needed cycle protections in various places, since the solution was never unified or complete.

In **February 2024** we provided a unified solution for LBSE by introducing `SVGVisitedRendererTracking`; <a href="https://commits.webkit.org/274392@main">see this commit</a> for more. In the new approach, we don't attempt to remove cycles, but detect them everywhere upon usage and stop processing in well-defined ways, all centralized in <code>SVGVisitedRendererTracking</code>.

## Nested mask/pattern slowness

In **April 2024**, we addressed the slowness problems with nested masks/patterns. As an example, consider this for nested masks:

```html
<svg>
    <defs>
        <mask id="z" />
            <rect id="1" mask="url(#y)" />
            <rect id="2" mask="url(#y)" />
            ...
        </mask>
        <mask id="y" />
            <rect id="1" mask="url(#x)" />
            <rect id="2" mask="url(#x)" />
            ...
        </mask>
        ...
    </defs>
    <ellipse mask="url(#z)" />
</svg>
```

For this example, the complexity can be increased at will by adding more masks and contents per mask.

The solution was twofold:

- For masks, we realized bounding box calculations for a mask were not affected by masks used in the mask contents, so we could cut off bounding box calculations for nested masks.
- For both masks and patterns, we added caching of image buffers per resource client so nested masks/patterns that are already encountered can reuse the image buffer cache.

See optimizations here for nested <a href="https://commits.webkit.org/273820@main">masks</a> and <a href="https://commits.webkit.org/277306@main">patterns</a>.

## Next steps

For the short and mid-term, the plan is to make LBSE at least as good as legacy in regards to test coverage; i.e., all tests that pass in legacy should pass in LBSE. We have made a lot of progress over the
last seven months just because of the amount of SVG resources that were implemented, but for example ,we will need to have SVG filters in place to pass this goal.

Another goal is to make sure LBSE passes all security requirements, as failing that would be a blocker to replacing the current engine. Fortunately, we are already taking this into account in several ways, such as adopting a lot of good <a href="https://github.com/WebKit/WebKit/wiki/Smart-Pointer-Usage-Guidelines">smart pointer practices</a>.

Finally, a big goal will be for LBSE to perform well on certain benchmarks like <a href="https://browserbench.org/MotionMark1.2/">MotionMark</a>, since WebKit has a golden rule to never ship a performance regression. So far there has not been an explicit focus
on performance, and we know there are likely optimizations possible in <code>RenderLayer</code> usage, both in reducing the number of <code>RenderLayer</code> objects we create in certain situations as well as a possible reduction in complexity of <code>RenderLayer</code> for LBSE usage.

All in all, we are very pleased with the results and the progress we made in the last seven months. We at <a href="https://www.igalia.com">Igalia</a> look forward to finishing the work to get the new engine in a shippable state in the near future!
