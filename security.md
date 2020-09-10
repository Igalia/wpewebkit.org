---
title: Security Advisories
layout: page
pagination:
  data: collections.WSA
  size: 50
  alias: posts
---
<section class="content-section bg-primary text-white small-section">
  <div class="container text-center">
    <div class="content-section-heading">
      <h2>Security Advisories</h2> 
    </div>
  </div>
</section>

<section class="content-section bg-light small-section">
  <div class="container text-center">
    <div class="row">
      <div class="col-lg-10 mx-auto lead text-left">
        {%- for post in posts reversed %}
	        <h3 class="release-heading"><a href="{{ post.url | url }}">{{ post.data.title }}</a></h3>{{ post.date | dateString }}
	        <p></p>	
		{%- endfor %}
		</div>
	</div> 
</section>