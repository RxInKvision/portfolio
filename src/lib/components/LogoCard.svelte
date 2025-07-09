<script>
    export let name;
    export let logoSrc;
</script>

<div class="logo-card">
    <div class="logo-mask" style="--logo-url: url({logoSrc})"></div>
    <span class="logo-name">{name}</span>
</div>

<style>
    .logo-card {
        background: var(--glass-bg);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(98, 168, 124, 0.1);
        border-radius: 8px;
        padding: 1.5rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
        text-align: center;
    }

    .logo-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 25px rgba(98, 168, 124, 0.25);
        background: rgba(98, 168, 124, 0.1);
    }

    /* NEW: This is the div that will display the logo */
    .logo-mask {
        width: 100px;
        height: 48px;
        /* The color is now a simple background that will be masked */
        background-color: var(--page-text);
        transition: background-color 0.05s ease;

        /* This is the magic: Use the SVG as a mask */
        -webkit-mask-image: var(--logo-url);
        mask-image: var(--logo-url);
        -webkit-mask-size: contain;
        mask-size: contain;
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-position: center;
        mask-position: center;
    }

    .logo-name {
        font-family: 'ABC Favorit Mono', monospace;
        font-size: 0.8rem;
        font-weight: bold;
        color: var(--page-text);
    }
</style>