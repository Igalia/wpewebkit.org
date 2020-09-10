---
title: Releases
layout: page
pagination:
  data: collections.release
  size: 50
  alias: posts
---
<section class="content-section bg-primary text-white small-section">
  <div class="container text-center">
    <div class="content-section-heading">
      <h2>Release Announcements</h2>
    </div>
  </div>
</section>

<section class="content-section bg-light small-section">
  <div class="container text-center">
    <div class="row">
      <div class="col-lg-10 mx-auto lead text-left">
        {%- for post in collections.release reversed -%}
	        <h3 class="release-heading"><a href="{{ post.url | url }}">{{ post.data.title }}</a></h3>{{ post.date | dateString }}
	        <p></p>	
		{%- endfor -%}
		</div>
	</div> 
</section>
