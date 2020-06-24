---
title: Security Advisories
layout: default
pagination:
  data: collections.WSA
  size: 50
  alias: posts
---
<!-- Header -->
<header class="masthead d-flex p-5">
  <div class="container text-center my-auto">
     <img style="width: 50%; margin-bottom: 3rem;" src="{{ '/assets/svg/web_Logo_Header_Color_300x110px.svg' | url }}">
    <p class="lead mb-0"><strong>WPE WebKit</strong> allows <strong>embedders</strong> to create simple and performant systems based on <strong>Web</strong> platform technologies. It is designed with hardware acceleration in mind, leveraging common 3D graphics APIs for best <strong>performance</strong>.</p>
</header>
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
        {%- for post in posts %}
	        <h3 class="release-heading"><a href="{{ post.url | url }}">{{ post.data.title }}</a></h3>{{ post.date | dateString }}
	        <p></p>	
		{%- endfor %}
		</div>
	</div> 
</section>
<!-- nav aria-labelledby="my-pagination">
  <h2 id="my-pagination">This is my Pagination</h2>
  <ol>
	{%- for pageEntry in pagination.pages %}
	    <li>item</li>
	{%- endfor %}
  </ol>
</nav -->