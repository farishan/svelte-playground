<script>
	import { onMount } from 'svelte';
	import ResizableRectangle from './Resizable8DirectionRectangle.svelte';

	let resizableRectangle;

	onMount(() => {
		const dom = resizableRectangle.getDOM();
		console.log(dom);
	});
</script>

<ResizableRectangle
	bind:this={resizableRectangle}
	settings={{
		width: 100,
		height: 100,
		minWidth: 40,
		minHeight: 40,
		x: 50,
		y: 50,
		resizerSize: 8,
		resizerOffset: 8,
		transparentResizer: false
	}}
>
	lorem ipsum dolor sit amet
</ResizableRectangle>

<p>lorem ipsum</p>
