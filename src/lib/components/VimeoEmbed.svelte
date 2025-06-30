<script>
  export let videoId;
</script>

<div class="vimeo-embed-container">
  <iframe
    src="https://player.vimeo.com/video/{videoId}?loop=1&autopause=0&controls=1"
    frameborder="0"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen
    title="Embedded Vimeo video"
  ></iframe>
</div>

<style>
  .vimeo-embed-container {
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