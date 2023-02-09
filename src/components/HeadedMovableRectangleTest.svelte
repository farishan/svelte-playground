<script>
	import { onMount } from 'svelte';
	import HeadedMovableRectangle from './HeadedMovableRectangle.svelte';
	let rect;

	onMount(() => {
		const rectDOM = rect.getDOM();
		rectDOM.style.width = 'auto';
		rectDOM.style.height = 'auto';
	});
</script>

<HeadedMovableRectangle bind:this={rect}>
	<div slot="head">[Head] Drag me!</div>

	[Body] Drag the Head, not me!
</HeadedMovableRectangle>
