<script>
	import Post from "./Post.svelte";

	let { data } = $props();

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>RxInK Portfolio</h1>

	
</section>

{#each data.works as work}
	<Post work={work}></Post>
{/each}

<style>

</style>
