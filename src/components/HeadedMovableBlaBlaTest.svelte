<script>
	import { onMount } from 'svelte';
	import Rectangle from './HeadedMovable8DirectionResizeableRectangle.svelte';

	let rectangle;

	onMount(() => {
		const dom = rectangle.getDOM();
		console.log(dom);
	});
</script>

<Rectangle
	bind:this={rectangle}
	settings={{
		width: 100,
		height: 100,
		minWidth: 40,
		minHeight: 40,
		x: 50,
		y: 50,
		resizerSize: 8,
		resizerOffset: 8,
		transparentResizer: false,
		resizable: true,
		movable: true
	}}
>
	<div slot="head">head</div>
	lorem ipsum dolor sit amet
</Rectangle>

<p>lorem ipsum</p>
