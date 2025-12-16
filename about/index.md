---
layout: page
title: "Learn & Discover"
tags: [learn]
data: { dateless: "true" }
permalink: /about/
htmlSitemapOrder: -5
sitemapChangeFrequency: yearly
sitemapPriority: 0.9
--- 
<style>
@media (min-width: 30rem) {
	#wpe-in-action-table {
		display:grid;
		grid-template-columns: 1fr 1fr;
		justify-items:center;
		grid-gap: 1rem 2rem;
		text-align: center;
	}
}
@media (min-width: 60rem) {
	#wpe-in-action-table {
		grid-template-columns: 1fr 1fr 1fr;
	}
}
</style>

  <style>
    .related-card {
      min-height: 10rem;
      border: 1px solid gray;
      border-radius: 10%;
      margin:  1rem;
      text-align:  center;
    }

lazy-youtube iframe,
lazy-youtube img {
  max-width: 100%;
}

lazy-youtube a {
  display: grid;
  justify-items: center;
  width: 100%;
  align-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

lazy-youtube a:hover {
  text-decoration: none;
}

/*
lazy-youtube a:hover span {
  background-color: white;
}
*/

lazy-youtube a > * {
  grid-row: 1;
  grid-column: 1;
  display: block;
}
lazy-youtube a > span {
  z-index: 2;
  width: 68px;
  color: transparent;
  height: 48px;
  cursor: pointer;
  transform: translate3d(-50%, -50%, 0);
  margin-top: 68px;
  margin-left: 68px;
  z-index: 1;
  background-color: transparent;
  /* YT's actual play button svg */
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 68 48"><path fill="%23f00" fill-opacity="0.8" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"></path><path d="M 45,24 27,14 27,34" fill="%23fff"></path></svg>');
  filter: grayscale(100%);
  transition: filter .1s cubic-bezier(0, 0, 0.2, 1);
  border: none;
}


#demos .btn { display: none; }

@media (min-width: 992px) {
  #demos .scroller {
   overflow-x: hidden;
   display: flex;
  }

  #demos .btn {
    display: grid;
    align-content: center;
    z-index: 1;
    box-shadow: none;
  } 

  #demos .btn > span {
    display: grid;
    width: 2rem;
    height: 2rem;
    align-content: center;
  }

  #demos.initialized .btn {
     visibility: visible;
  }
</style>
<script>
    document.addEventListener("DOMContentLoaded", () => {
      let vids = [...document.querySelectorAll('#demos .item > *')];
      let i=0;

      function stopVideos() {
        vids.forEach((vid) => {
          if (vid._player) {
            vid._player.pauseVideo()
          }
        })
      }

      let demos = document.getElementById('demos');
      if (demos) demos.classList.add('initialized');
    })

    class LazyYTElementLite extends HTMLElement {

      connectedCallback() {
        let hash = this.getAttribute('hash')
        let element = this;
        element.innerHTML = `
        <div><a href=https://www.youtube-nocookie.com/embed/${hash}?autoplay=1><img src=https://img.youtube.com/vi/${hash}/hqdefault.jpg alt='Video: ${this.getAttribute('title')}'><span>▶</span></a>
        <div>${this.getAttribute('title')}</div>
      </div>` /*
        */
        element.addEventListener('click', (evt) => {
          element._player = new YT.Player(element.firstElementChild, {
              height: '315',
              width: '560',
              videoId: hash,
              playerVars: { 'autoplay': 1 }
            });
            evt.preventDefault()
        })
      }
    }

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    function onYouTubeIframeAPIReady() {
      customElements.define('lazy-youtube', LazyYTElementLite);
    }
  </script>

<nav class="sidebar">
<ul>
<li><a href="/about/supported-hardware.html">Supported Hardware</a></li>
<li><a href="/about/a-good-choice.html">Why Choose WPE?</a></li>
<li><a href="#wpe-in-action">WPE in Action</a></li>
</ul>
</nav>


<header class="page">

# Learn & Discover

You might be wondering how a web browser may be used in an embedded device, or
why WPE could be a good choice for your product. If you are an engineer, you
might want to know if your target architecture is supported. Read below to
answer these and more questions.

</header>
<section class="full-bleed c2">

<div class="arrow-lists">

### WPE as a Solution

* [What is an embedded browser?](/about/what-is-embedded.html)
* [Why choose WPE?](#why-choose-wpe%3F)
* [Success stories](/#success-stories)
* [See WPE in action](#wpe-in-action)

</div>

<div class="arrow-lists">

### WPE For Developers

* [Supported Hardware](/about/supported-hardware.html)
* [Architecture](/about/architecture.html)
* [API Documentation](/developers/#api-documentation)
* [Release Schedule](/release/schedule)
* [Frequently Asked Questions](/about/faq.html)

</div>
</section>

<div class="dotsep">

### Supported Hardware

WPE runs on [a wide range of hardware](/about/supported-hardware.html), including devices made by Broadcom, Nvidia, NXP, Qualcomm, or Rockchip.

<ul class="gallery c4">
<li><img src="/assets/img/logo-rockchip@2x.png" alt=""></li>
<li><img src="/assets/img/logo-nvidia@2x.png" alt=""></li>
<li><img src="/assets/img/logo-nxp@2x.png" alt=""></li>
<li><img src="/assets/img/logo-qualcomm@2x.png" alt=""></li>
</ul>
</div>

<div class="dotsep">

### Why Choose WPE?

WPE WebKit is widely adopted by many industries, including digital signage,
professional audio, home appliances, set-top-boxes, automotive, and in-flight
infotainment. Countless devices deployed around the globe are already using
WPE WebKit as their web runtime platform, and usage is growing rapidly. [Read
more about why you should choose WPE](/about/a-good-choice.html).

<img src="/assets/img/WhyChooseWPE-ExploreLand.png" alt="">
</div>

<div class="dotsep">

### WPE In Action

<div class="container text-center my-auto" id="wpe-in-action-table">
	<div class="item">
  		<lazy-youtube hash="bg6yCx7VdPY" title="WPE WebGL performance demos">
			<div>
				<a href="https://www.youtube-nocookie.com/embed/bg6yCx7VdPY?autoplay=1"><img src="https://img.youtube.com/vi/bg6yCx7VdPY/hqdefault.jpg" alt="Video: WPE WebGL performance demos"><span>▶</span></a>
				<div>WPE WebGL performance demos</div>
			</div>
		</lazy-youtube>
	</div>
	<div class="item">
		<lazy-youtube hash="Nz2Y8HGdZDE" title="WPE SVG transformations and hardware acceleration">
	  		<div>
	  			<a href="https://www.youtube-nocookie.com/embed/Nz2Y8HGdZDE?autoplay=1"><img src="https://img.youtube.com/vi/Nz2Y8HGdZDE/hqdefault.jpg" alt="Video: WPE SVG transformations and hardware acceleration"><span>▶</span></a>
				<div>WPE SVG transformations and hardware acceleration</div>
			</div>
		</lazy-youtube>
	</div>
	<div class="item">
  		<lazy-youtube hash="_X_23cb8l6o" title="WPE 2D canvas and video performance on low-end hardware">
  			<div>
  				<a href="https://www.youtube-nocookie.com/embed/_X_23cb8l6o?autoplay=1"><img src="https://img.youtube.com/vi/_X_23cb8l6o/hqdefault.jpg" alt="Video: WPE 2D canvas and video performance on low-end hardware"><span>▶</span></a>
  				<div>WPE 2D canvas and video performance on low-end hardware</div>
			</div>
		</lazy-youtube>
	</div>
	<div class="item">
  		<lazy-youtube hash="QNZJYOuVGiE" title="Web-augmented video overlays with WPEWebKit and GStreamer">
			<div>
				<a href="https://www.youtube-nocookie.com/embed/QNZJYOuVGiE?autoplay=1"><img src="https://img.youtube.com/vi/QNZJYOuVGiE/hqdefault.jpg" alt="Video: Web-augmented video overlays with WPEWebKit and GStreamer"><span>▶</span></a>
				<div>Web-augmented video overlays with WPEWebKit and GStreamer</div>
			</div>
		</lazy-youtube>
	</div>
	<div class="item">
  		<lazy-youtube hash="0L8Fv7sswSk" title="WPE CSS transforms and performance">
			<div>
				<a href="https://www.youtube-nocookie.com/embed/0L8Fv7sswSk?autoplay=1"><img src="https://img.youtube.com/vi/0L8Fv7sswSk/hqdefault.jpg" alt="Video: WPE CSS transforms and performance"><span>▶</span></a>
				<div>WPE CSS transforms and performance</div>
			</div>
		</lazy-youtube>
	</div>
</div>

</div>
