---
---

window.cwmBaseUrl = "//{{ site.domain }}";
window.cwmBookmarkletUrl = window.cwmBaseUrl + "/bookmarklets/clean-stream";

{% include js/jcors-loader.js %}
{% include js/cwm-jsload.js %}

{% include js/load-clean-stream.js %}