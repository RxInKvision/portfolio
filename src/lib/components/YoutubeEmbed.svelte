<script>
  export let videoId;
</script>

<div class="youtube-embed-container">
  <iframe
    src="https://www.youtube.com/embed/{videoId}?loop=1&playlist={videoId}&controls=1&showinfo=0&rel=0"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    title="Embedded YouTube video"
  ></iframe>
</div>

<style>
  .youtube-embed-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* Proporzioni 16:9 */
    overflow: hidden;
    border-radius: 8px;
    background-color: #000;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
</style>