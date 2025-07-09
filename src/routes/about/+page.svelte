<script>
    import { onMount } from 'svelte';
    import { animate } from '$lib/actions/animate.js';

    let ready = false;
    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
    
    let pageContainer;
    let svgLayer1, svgLayer2, svgLayer3, svgLayer4, svgLayer5;
    
    let mouseMoveEnabled = false;
    let throttleTimer = false;
    let smoothScrollY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let lastScrollY = 0;
    
    onMount(() => {
        document.documentElement.style.setProperty('--background-color', '#111');
        document.documentElement.style.setProperty('--text-color', '#FFE964');
        document.documentElement.style.setProperty('--page-secondary-text', '#C4C4C4');
        
        if (pageContainer) {
            pageContainer.classList.add('dark-mode');
        }
        
        const allLogos = document.querySelectorAll('.responsive-svg');
        allLogos.forEach(logo => {
            logo.classList.add('on-dark');
        });
        
        setupSmoothAnimations();
                
        setTimeout(() => {
            ready = true;
            setTimeout(() => {
                mouseMoveEnabled = true;
            }, 600);
        }, 300);
    });
    
    function setupSmoothAnimations() {
        smoothScrollY = window.scrollY;
        lastScrollY = window.scrollY;
        
        function animationLoop() {
            smoothScrollY += (window.scrollY - smoothScrollY) * 0.05;
            
            if (mouseMoveEnabled) {
                lastMouseX += (mouseX - lastMouseX) * 0.1;
                lastMouseY += (mouseY - lastMouseY) * 0.1;
            }
            
            if (ready) {
                updatePatternPositions();
            }
            
            requestAnimationFrame(animationLoop);
        }
        
        animationLoop();
    }
    
    function updatePatternPositions() {
        if (svgLayer1) svgLayer1.style.transform = `translate(${lastMouseX * 20}px, ${lastMouseY * 20 + smoothScrollY * 0.08}px) rotate(${smoothScrollY * 0.002}deg)`;
        if (svgLayer2) svgLayer2.style.transform = `translate(${lastMouseX * 15}px, ${lastMouseY * 15 + smoothScrollY * 0.06}px)`;
        if (svgLayer3) svgLayer3.style.transform = `translate(${lastMouseX * 10}px, ${lastMouseY * 10 + smoothScrollY * 0.04}px)`;
        if (svgLayer4) svgLayer4.style.transform = `translate(${lastMouseX * -12}px, ${lastMouseY * -12 - smoothScrollY * 0.05}px) rotate(${-smoothScrollY * 0.001}deg)`;
        if (svgLayer5) svgLayer5.style.transform = `translate(${lastMouseX * -15}px, ${lastMouseY * -15 - smoothScrollY * 0.07}px)`;
    }
    
    function handleMouseMove(e) {
        if (!mouseMoveEnabled || throttleTimer) return;
        
        throttleTimer = true;
        setTimeout(() => {
            throttleTimer = false;
        }, 5);
        
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    }
</script>

<svelte:head>
    <title>About | Riccardo Pichi</title>
    <meta name="description" content="About Riccardo Pichi - Media Designer and Visual Artist" />
</svelte:head>

<svelte:window bind:scrollY on:mousemove={handleMouseMove}/>

<div class="landing-page" bind:this={pageContainer} class:dark-mode={true}>
    <div class="svg-background-container">
        <div class="svg-layer svg-layer-1" bind:this={svgLayer1}><div class="svg-pattern bg-far"></div></div>
        <div class="svg-layer svg-layer-2" bind:this={svgLayer2}><div class="svg-pattern bg-medium-far"></div></div>
        <div class="svg-layer svg-layer-3" bind:this={svgLayer3}><div class="svg-pattern bg-middle"></div></div>
        <div class="svg-layer svg-layer-4" bind:this={svgLayer4}><div class="svg-pattern bg-medium-near"></div></div>
        <div class="svg-layer svg-layer-5" bind:this={svgLayer5}><div class="svg-pattern bg-near"></div></div>
    </div>

    <nav class="main-nav">
        <div class="nav-logo">
            <a href="/">
                <img src="/images/pictogram.svg" alt="RxInK Logo" class="responsive-svg on-dark" />
            </a>
        </div>
        <ul class="nav-links">
            <li><a href="/works">WORKS</a></li>
            <li class="active"><a href="/about">ABOUT</a></li>
            <li><a href="/contact">CONTACT</a></li>
        </ul>
    </nav>
    
    <div class="about-container">
        <div class="about-sidebar animatable" use:animate>
            <div class="profile-section">
                <div class="profile-image-container">
                    <img src="/images/profile/riccardo-pichi.jpg" alt="Riccardo Pichi" class="profile-image" />
                </div>
                
                <div class="sidebar-section">
                    <h3>CONTACT</h3>
                    <ul class="sidebar-list contact-list">
                        <li><div class="icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z"/></svg></div><span>rxink.designer@gmail.com</span></li>
                        <li><div class="icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,11.5,12,11.5z"/></svg></div><span>Rome</span></li>
                    </ul>
                    
                    <div class="social-links">
                        <a href="https://www.instagram.com/rinktonic/" target="_blank" rel="noopener noreferrer" class="social-link"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                        <a href="https://www.linkedin.com/in/riccardopichi/" target="_blank" rel="noopener noreferrer" class="social-link"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                       
                    </div>
                </div>

                <div class="sidebar-section tags-section">
                    <h3>CORE SKILLS</h3>
                    <div class="skill-tags">
                        <span class="skill-tag">Audiovisual Interaction</span>
                        <span class="skill-tag">Motion Design</span>
                        <span class="skill-tag">Creative Coding</span>
                        <span class="skill-tag">Live Visuals</span>
                        <span class="skill-tag">Projection Mapping</span>
                        <span class="skill-tag">Visual Identity</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="about-content">
            <div class="page-header animatable" use:animate>
                <div class="name-container">
                    <h1>RICCARDO PICHI</h1>
                    <div class="position-text">MEDIA DESIGNER | VISUAL ARTIST</div>
                </div>
                <div class="header-accent"></div>
            </div>
            
            <div class="story-section">
                <h2 class="section-title animatable" use:animate>PROFILE</h2>
                
                <div class="story-content">
                    <p class="narrative animatable" use:animate>
                        My work lies at the intersection of <span class="fw-bold">art, technology, and space</span>. Since childhood, I’ve used computers not just for consumption, but as tools for creation. This hands-on approach across <span class="fw-regular-italic">both physical and digital media</span> has been the foundation of my practice.
                    </p>
                    
                    <div class="story-block animatable" use:animate>
                        <p>
                            This path naturally led me to IED Rome, where I recently graduated with honors (110/110) in <span class="fw-medium">Media Design and New Technologies for Art</span>. The program was the perfect fit for my eclectic and restless nature, allowing me to dive into a wide range of outputs: <span class="fw-light">from video clips, motion graphics, and VFX to dynamic websites, app prototypes, and large-scale multimedia installations.</span>
                        </p>
                    </div>

                    <div class="journey-milestone animatable" use:animate>
                        <div class="milestone-dot"></div>
                        <div class="milestone-content">
                            <h3>From Theory to Practice</h3>
                            <p>
                                My education has been intensely practical. I thrive on turning theory into tangible results, which has led me to perform live, creating audioreactive visuals for major events like <span class="fw-medium">Videocittà 2024</span> (with Alice Felloni) and at renowned venues such as <span class="fw-medium">Spazio900</span>.
                            </p>
                            <p style="margin-top: 1rem;">
                                These high-pressure environments taught me to be methodical and adaptable. And, of course, there's a unique satisfaction in seeing your work command a massive LED wall.
                            </p>
                        </div>
                    </div>
                     <div class="journey-milestone animatable" use:animate>
                        <div class="milestone-dot"></div>
                        <div class="milestone-content">
                            <h3>My Focus</h3>
                            <p>
                                My primary ambition is to design and develop <span class="fw-bold">large-scale installations</span>. Whether for artistic or commercial purposes, this is where my passion converges: the orchestration of space, narrative, and technology to create a single, powerful experience. The process of bringing something from <span class="fw-regular-italic">non-existence to reality</span> is what truly drives me.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="cta-section animatable" use:animate>
                <p class="cta-message">
                    I'm always open to new collaborations and challenges. If you have an idea that requires a blend of creative vision and technical expertise, let's connect.
                </p>
                <div class="cta-buttons">
                    <a href="/works" class="cta-button">SEE MY WORK</a>
                    <a href="/contact" class="cta-button outline">GET IN TOUCH</a>
                </div>
            </div>
        </div>
    </div>
    
    <footer class="animatable" use:animate>
        <div class="footer-content">
            <p class="copyright">&copy; {new Date().getFullYear()} RICCARDO PICHI</p>
            <p class="tagline">THINK IN'INK</p>
        </div>
    </footer>
</div>

<style>
    :root {
        font-family: 'IBM Plex Mono', monospace;
    }
    .fw-bold { font-weight: 700; color: var(--page-text); }
    .fw-medium { font-weight: 500; color: var(--page-text); }
    .fw-regular-italic { font-style: italic; color: var(--page-secondary-text); }
    .fw-light { font-weight: 300; color: var(--page-secondary-text); }

    .dark-mode { --page-bg: #111; --page-text: #FFE964; --page-secondary-text: #C4C4C4; --page-accent: #4A8D65; }
    :global(.responsive-svg.on-light) { filter: brightness(0) saturate(100%); }
    :global(.responsive-svg.on-dark) { filter: invert(90%) sepia(39%) saturate(692%) hue-rotate(325deg) brightness(103%) contrast(103%); }
    
    .svg-background-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; overflow: hidden; pointer-events: none; }
    .svg-layer { position: absolute; top: -150%; left: -150%; width: 400%; height: 400%; will-change: transform; }
    .svg-layer-1 { opacity: 0.02; }
    .svg-layer-2 { opacity: 0.03; }
    .svg-layer-3 { opacity: 0.04; }
    .svg-layer-4 { opacity: 0.03; }
    .svg-layer-5 { opacity: 0.02; }
    .svg-pattern { position: absolute; width: 100%; height: 100%; background-repeat: repeat; filter: grayscale(100%); mix-blend-mode: overlay; }
    .bg-far { background-image: url('/images/full-logo.svg'); background-size: 600px auto; }
    .bg-medium-far { background-image: url('/images/logotype.svg'); background-size: 450px auto; }
    .bg-middle { background-image: url('/images/pictogram.svg'); background-size: 200px auto; }
    .bg-medium-near { background-image: url('/images/logotype.svg'); background-size: 250px auto; transform: rotate(45deg); }
    .bg-near { background-image: url('/images/pictogram.svg'); background-size: 100px auto; }
    
    .landing-page { min-height: 100vh; overflow-x: hidden; position: relative; }
    .main-nav { position: fixed; top: 0; left: 0; right: 0; width: auto; display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem; z-index: 1000; background: rgba(17, 17, 17, 0.5); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
    .nav-logo img { width: 40px; height: 40px; }
    .nav-links { display: flex; list-style: none; gap: 2rem; margin: 0; padding: 0; }
    .nav-links li.active a { color: var(--page-text); }
    .nav-links a { text-decoration: none; font-size: 0.9rem; font-weight: bold; position: relative; padding: 8px 0; color: var(--page-secondary-text); transition: color 0.3s ease; }
    .nav-links a:hover { color: var(--page-text); }
    
    .about-container { display: grid; grid-template-columns: 320px 1fr; gap: 4rem; max-width: 1200px; margin: 0 auto; padding: 8rem 2rem 4rem; position: relative; z-index: 2; }
    
    .about-sidebar { position: sticky; top: 8rem; align-self: start; }
    .profile-image-container { position: relative; margin-bottom: 2.5rem; overflow: hidden; border-radius: 8px;}
    .profile-image { width: 100%; display: block; }
    .sidebar-section { margin-bottom: 2.5rem; }
    h3 { color: var(--page-secondary-text); font-size: 0.8rem; margin: 0 0 1rem 0; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; }
    .sidebar-list { list-style: none; padding: 0; margin: 0; }
    .contact-list li { display: flex; align-items: center; margin-bottom: 0.8rem; font-size: 0.9rem; color: var(--page-secondary-text);}
    .icon { color: var(--page-accent); margin-right: 0.8rem; }
    .social-links { display: flex; gap: 1rem; margin-top: 1.2rem; }
    .social-link { color: var(--page-secondary-text); transition: all 0.3s ease; }
    .social-link:hover { color: var(--page-text); transform: translateY(-2px); }
    .language-name { font-size: 0.8rem; letter-spacing: 0.05em; color: var(--page-secondary-text); }
    .bar-container { height: 4px; background-color: rgba(255, 255, 255, 0.1); border-radius: 2px; overflow: hidden; }
    .bar-fill { height: 100%; background-color: var(--page-accent); border-radius: 2px; }
    
    .skill-tags { display: flex; flex-wrap: wrap; gap: 0.8rem; }
    .skill-tag {
        font-family: 'IBM Plex Mono', monospace;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--page-secondary-text);
        padding: 0.6rem 1rem;
        border-radius: 6px;
        transition: all 0.3s ease;
    }
    .skill-tag:hover {
        transform: translateY(-2px);
        background: rgba(255, 255, 255, 0.1);
        color: var(--page-text);
        border-color: rgba(74, 141, 101, 0.5);
    }
    
    .about-content { padding-right: 1rem; }
    .page-header { margin-bottom: 4rem; position: relative; }
    .name-container { margin-bottom: 1rem; }
    h1 { font-family: 'IBM Plex Mono', monospace; font-size: 3rem; color: var(--page-text); margin: 0 0 0.5rem 0; line-height: 1.1; font-weight: 700; }
    .position-text { color: var(--page-accent); font-size: 1rem; letter-spacing: 0.05em; }
    .header-accent { width: 80px; height: 3px; background-color: var(--page-accent); }
    .section-title { font-size: 1.3rem; color: var(--page-accent); margin: 0 0 2rem 0; letter-spacing: 0.05em; }
    .story-section, .philosophy-section, .toolbox-section { margin-bottom: 5rem; }
    .narrative { font-size: 1.2rem; line-height: 1.7; margin-bottom: 2rem; max-width: 65ch; color: var(--page-secondary-text); font-weight: 300; }
    .story-block { border-left: 2px solid rgba(255,255,255,0.15); padding-left: 1.5rem; margin: 2rem 0; color: var(--page-secondary-text); line-height: 1.7; font-weight: 300;}
    .journey-milestone { display: flex; margin-bottom: 2.5rem; position: relative; }
    .milestone-dot { width: 10px; height: 10px; background-color: var(--page-accent); border-radius: 50%; margin-top: 8px; margin-right: 1.5rem; flex-shrink: 0; }
    .milestone-content h3 { font-size: 1.1rem; color: var(--page-text); margin-bottom: 0.8rem; font-weight: 500; }
    .milestone-content p { line-height: 1.7; color: var(--page-secondary-text); max-width: 65ch; font-weight: 300;}
    
    .cta-section { margin-top: 5rem; padding: 3rem; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; text-align: center; }
    .cta-message { font-size: 1.2rem; line-height: 1.6; margin-bottom: 2rem; max-width: 700px; margin: 0 auto 2rem auto; color: var(--page-secondary-text); font-weight: 300;}
    .cta-buttons { display: flex; justify-content: center; gap: 1.5rem; }
    .cta-button { display: inline-block; padding: 0.8rem 1.5rem; background-color: var(--page-accent); color: #000; text-decoration: none; font-weight: 700; font-size: 0.9rem; border-radius: 4px; transition: all 0.3s ease; }
    .cta-button:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); }
    .cta-button.outline { background-color: transparent; border: 1px solid var(--page-accent); color: var(--page-text); }
    
    footer { padding: 3rem 2rem; border-top: 1px solid rgba(255,255,255,0.1); position: relative; z-index: 2; max-width: 1200px; margin: 5rem auto 0 auto; }
    .footer-content { display: flex; justify-content: space-between; }
    .copyright, .tagline { font-size: 0.8rem; color: var(--page-secondary-text);}
    .tagline { color: var(--page-accent); }
</style>