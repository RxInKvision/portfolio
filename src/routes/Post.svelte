<script>
    export let work;
</script>

<div class="image"></div>
<h2>{work.title}</h2>
<p>{work.description}</p>
{#each work.tags as tag}
    <p>{tag}</p>
{/each}

<style>
    	.image {
		width: 100%;
		height: 300px;
		background-color: rgb(110, 110, 110);
	}
</style>