---
title: Pattern index
layout: default
permalink: "patterns/index/index.html"
---

<main class="inner pattern">
  <h1>All patterns</h1>

  <p>{{ content | safe }}</p>

  <h2>Index</h2>
  <ul>
  {%- for pattern in collections.patternsByTitle -%}
    <a href="/patterns/{{ pattern.fileSlug | lower }}"><li>{{ pattern.data.title }}</li></a>
  {%- endfor -%}
  </ul>
</main>
