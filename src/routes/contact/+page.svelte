<script>
	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};
	
	let formSubmitted = false;
	let formError = false;
	
	function handleSubmit() {
		// Simulate form submission
		formSubmitted = true;
		
		// You would typically send the form data to a server here
		console.log('Form submitted:', formData);
	}
</script>

<svelte:head>
	<title>Contact | Riccardo Pichi</title>
	<meta name="description" content="Contact Riccardo Pichi - Media Designer and Visual Artist" />
</svelte:head>

<div class="contact-page">
	<header class="main-header">
		<div class="logo">
			<a href="/">
				<svg width="40" height="40" viewBox="0 0 100 100">
					<g fill="#FFDE59">
						<rect x="45" y="20" width="10" height="60" />
						<rect x="25" y="40" width="10" height="25" />
						<rect x="65" y="40" width="10" height="25" />
					</g>
				</svg>
			</a>
		</div>
		<nav>
			<ul>
				<li><a href="/works">WORKS</a></li>
				<li><a href="/about">ABOUT</a></li>
				<li class="active"><a href="/contact">CONTACT</a></li>
			</ul>
		</nav>
	</header>

	<section class="contact-section">
		<h1>
			<span>CONTACT ME</span>
		</h1>
		
		<div class="contact-container">
			<div class="contact-info">
				<div class="info-item">
					<h3>EMAIL</h3>
					<p>rxink.designer@gmail.com</p>
				</div>
				
				<div class="info-item">
					<h3>PHONE</h3>
					<p>+39 392 814 5287</p>
				</div>
				
				<div class="info-item">
					<h3>LOCATION</h3>
					<p>Rome, Italy</p>
				</div>
				
				<div class="socials">
					<h3>FIND ME ON</h3>
					<div class="social-links">
						<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
							</svg>
						</a>
						<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-link">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
								<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
							</svg>
						</a>
						<a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" class="social-link">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
								<path d="M22.875 10.063c-2.442 5.217-8.337 12.319-12.063 12.319-3.672 0-4.203-7.831-6.208-13.043-.987-2.565-1.624-1.976-3.474-.681l-1.128-1.455c2.698-2.372 5.398-5.127 7.057-5.28 1.868-.179 3.018 1.098 3.448 3.832.568 3.593 1.362 9.17 2.748 9.17 1.08 0 3.741-4.424 3.878-6.006.243-2.316-1.703-2.386-3.392-1.663 2.673-8.754 13.793-7.142 9.134 2.807z"/>
							</svg>
						</a>
					</div>
				</div>
			</div>
			
			<div class="contact-form">
				{#if formSubmitted}
					<div class="success-message">
						<h3>Thank you for your message!</h3>
						<p>I'll get back to you as soon as possible.</p>
					</div>
				{:else}
					<form on:submit|preventDefault={handleSubmit}>
						<div class="form-group">
							<label for="name">NAME</label>
							<input 
								type="text" 
								id="name" 
								bind:value={formData.name} 
								required
							/>
						</div>
						
						<div class="form-group">
							<label for="email">EMAIL</label>
							<input 
								type="email" 
								id="email" 
								bind:value={formData.email} 
								required
							/>
						</div>
						
						<div class="form-group">
							<label for="subject">SUBJECT</label>
							<input 
								type="text" 
								id="subject" 
								bind:value={formData.subject} 
								required
							/>
						</div>
						
						<div class="form-group">
							<label for="message">MESSAGE</label>
							<textarea 
								id="message" 
								bind:value={formData.message} 
								rows="6" 
								required
							></textarea>
						</div>
						
						<button type="submit" class="submit-btn">SEND MESSAGE</button>
					</form>
				{/if}
			</div>
		</div>
	</section>
	
	<footer>
		<div class="footer-content">
			<p class="copyright">&copy; {new Date().getFullYear()} RICCARDO PICHI</p>
			<p class="tagline">THINK IN'INK</p>
		</div>
	</footer>
</div>

<style>
	.contact-page {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}
	
	.main-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 4rem;
	}
	
	.logo {
		flex: 0 0 auto;
	}
	
	.logo a {
		display: block;
		transition: transform 0.3s ease;
	}
	
	.logo a:hover {
		transform: scale(1.1);
	}
	
	nav ul {
		display: flex;
		list-style: none;
		gap: 2rem;
	}
	
	nav a {
		color: #FFFFFF;
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.3s ease;
	}
	
	nav a:hover, nav li.active a {
		color: #FFDE59;
	}
	
	h1 {
		font-size: 2.5rem;
		font-weight: bold;
		color: #FFDE59;
		margin: 0 0 2rem 0;
		line-height: 1.2;
		display: flex;
		flex-direction: column;
	}
	
	.contact-container {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 3rem;
	}
	
	.contact-info {
		border-right: 1px solid #333;
		padding-right: 2rem;
	}
	
	.info-item {
		margin-bottom: 2rem;
	}
	
	h3 {
		color: #7ba77b;
		font-size: 1rem;
		margin: 0 0 0.5rem 0;
		font-weight: normal;
	}
	
	.info-item p {
		font-size: 0.9rem;
		margin: 0;
	}
	
	.socials {
		margin-top: 3rem;
	}
	
	.social-links {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
	}
	
	.social-link {
		color: #7ba77b;
		transition: color 0.3s ease;
	}
	
	.social-link:hover {
		color: #FFDE59;
	}
	
	.contact-form {
		width: 100%;
	}
	
	.form-group {
		margin-bottom: 1.5rem;
	}
	
	label {
		display: block;
		font-size: 0.8rem;
		margin-bottom: 0.5rem;
		color: #7ba77b;
	}
	
	input, textarea {
		width: 100%;
		padding: 0.8rem;
		background: transparent;
		border: 1px solid #333;
		color: #FFFFFF;
		font-family: 'ABC Favorit Mono', monospace;
		font-size: 0.9rem;
	}
	
	input:focus, textarea:focus {
		outline: none;
		border-color: #7ba77b;
	}
	
	.submit-btn {
		background-color: transparent;
		border: 1px solid #FFDE59;
		color: #FFDE59;
		padding: 1rem 2rem;
		font-family: 'ABC Favorit Mono', monospace;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}
	
	.submit-btn:hover {
		background-color: #FFDE59;
		color: #1E1E1E;
	}
	
	.success-message {
		background-color: rgba(123, 167, 123, 0.1);
		border: 1px solid #7ba77b;
		padding: 2rem;
		text-align: center;
	}
	
	.success-message h3 {
		color: #FFDE59;
		margin-bottom: 1rem;
	}
	
	footer {
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 1px solid #333;
	}
	
	.footer-content {
		display: flex;
		justify-content: space-between;
	}
	
	.copyright, .tagline {
		font-size: 0.8rem;
	}
	
	.tagline {
		color: #FFDE59;
	}
	
	@media (max-width: 900px) {
		.contact-container {
			grid-template-columns: 1fr;
		}
		
		.contact-info {
			border-right: none;
			border-bottom: 1px solid #333;
			padding-right: 0;
			padding-bottom: 2rem;
			margin-bottom: 2rem;
		}
		
		.footer-content {
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>