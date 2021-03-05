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
        <h2>Stable</h2>
        {%- for post in collections.recentStableReleaseNotes -%}
	        <h3 class="release-heading"><a href="{{ post.url | url }}">{{ post.data.title }}</a></h3>{{ post.date | dateString }} 
	        | <strong>{{ post.data.package }}</strong>
	        | {{ post.data.version }}
	        | {{ post.data.tags }}
				{%- endfor -%}
        <h2>Unstable</h2>
        {%- for post in collections.recentUnstableReleaseNotes -%}
	        <h3 class="release-heading"><a href="{{ post.url | url }}">{{ post.data.title }}</a></h3>{{ post.date | dateString }} 
	        | <strong>{{ post.data.package }}</strong>
	        | {{ post.data.version }}
	        | {{ post.data.tags }}
				{%- endfor -%}
        <h3>Latest Releases</h3>
        {%- for release in collections.latestReleases -%}
          <h4>{{ release[0] }}</h4>
          {%- for type in release[1] -%}
        		<p>{{ type[1].version }} {{ type[0] }}</p>
					{%- endfor -%}
				{%- endfor -%}
		  </div>
		</div>
	</div> 
</section>
