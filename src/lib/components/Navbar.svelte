<nav class="main-nav">
    <div class="nav-logo">
        <a href="/">
            <img src="/images/pictogram.svg" alt="RxInK Logo" class="responsive-svg on-light" />
        </a>
    </div>
    <ul class="nav-links">
        <li><a href="/works">WORKS</a></li>
        <li><a href="/about">ABOUT</a></li>
        <li><a href="/contact">CONTACT</a></li>
    </ul>
</nav>

<style>
    .main-nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 2rem;
        z-index: 1000;
        
        /* Increased blur and subtle background */
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        
        border-bottom: 1px solid rgba(98, 168, 124, 0.2);
        transition: all 0.4s ease;
    }

    /* Light/Dark mode specific backgrounds for the glass effect */
    .light-mode .main-nav {
        background: rgba(255, 255, 255, 0.05);
    }
    .dark-mode .main-nav {
        background: rgba(0, 0, 0, 0.1);
    }

    .nav-logo img {
        width: 40px;
        height: 40px;
        transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), filter 0.4s ease;
    }

    .nav-logo:hover img {
        transform: scale(1.1) rotate(5deg);
        filter: drop-shadow(0 0 8px var(--page-accent));
    }

    .nav-links {
        display: flex;
        list-style: none;
        gap: 1rem; /* Reduced gap slightly */
        margin: 0;
        padding: 0;
    }

    .nav-links a {
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: bold;
        padding: 8px 16px; /* Added padding for a larger hover area */
        border-radius: 6px; /* Rounded corners for the hover background */
        position: relative;
        transition: color 0.3s ease, background-color 0.3s ease;
    }

    /* NEW: Cool and smooth hover effect */
    .nav-links a:hover {
        color: var(--page-text); /* Ensure text color remains correct */
        background-color: rgba(98, 168, 124, 0.15);
    }
</style>