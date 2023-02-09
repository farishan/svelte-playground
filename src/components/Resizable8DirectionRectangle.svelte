<script>
	let dom;
	export const getDOM = () => dom;
	export let settings = {};

	let minWidth = settings.minWidth || 40; // px
	let minHeight = settings.minHeight || 40; // px
	let resizerSize = settings.resizerSize || 8; // px
	let resizerOffset = settings.resizerOffset || 8; // px
	let width = settings.width || 100; // px
	let height = settings.height || 100; // px
	let left = settings.x || 20; // px
	let top = settings.y || 20; // px
	let transparentResizer = settings.transparentResizer || false;

	let startPoint = { x: 0, y: 0 };
	let distance = { x: 0, y: 0 };
	let currentDimension = { w: 0, h: 0 };

	let shouldResize = false;
	let resizerCursor;
	let selectedResizer;

	$: horizontalResizerWidth = width - resizerSize * 2 + resizerOffset * 2;
	$: verticalResizerHeight = height - resizerSize * 2 + resizerOffset * 2;

	function onmousedown(e) {
		startPoint = { x: e.clientX, y: e.clientY };
		distance = { x: startPoint.x - left, y: startPoint.y - top };
	}

	function resize(e) {
		/* note: this function will be called on mouse move. */

		if (!selectedResizer) return;

		if (selectedResizer.includes('n')) {
			if (currentDimension.h - (e.clientY - startPoint.y) - minHeight > 0) {
				height = currentDimension.h - (e.clientY - startPoint.y);
				top = e.clientY - distance.y;
			}
		} else if (selectedResizer.includes('s')) {
			if (currentDimension.h + (e.clientY - startPoint.y) - minHeight > 0) {
				height = currentDimension.h + (e.clientY - startPoint.y);
			}
		}

		if (selectedResizer.includes('w')) {
			if (currentDimension.w - (e.clientX - startPoint.x) - minWidth > 0) {
				width = currentDimension.w - (e.clientX - startPoint.x);
				left = e.clientX - distance.x;
			}
		} else if (selectedResizer.includes('e')) {
			if (currentDimension.w + (e.clientX - startPoint.x) - minWidth > 0) {
				width = currentDimension.w + (e.clientX - startPoint.x);
			}
		}
	}

	function onmousemove(e) {
		if (!shouldResize) return;

		resize(e);
	}

	function onmouseup() {
		document.body.style.cursor = 'auto';
		resizerCursor = undefined;
		selectedResizer = undefined;
	}

	function startResize(e, newSelectedResizer) {
		shouldResize = true;
		selectedResizer = newSelectedResizer;
		startPoint = { x: e.clientX, y: e.clientY };
		distance = { x: startPoint.x - left, y: startPoint.y - top };
		currentDimension = { w: width, h: height };
	}
</script>

<svelte:window on:mousemove={onmousemove} on:mouseup={onmouseup} on:mouseleave={onmouseup} />

<div
	bind:this={dom}
	class="rectangle"
	style="width: {width}px; height: {height}px; left: {left}px; top: {top}px; min-width: {minWidth}px; min-height: {minHeight}px;"
>
	<!-- North West -->
	<div
		class="resizer resizer--nw resizer--corner"
		class:transparentResizer
		style="width: {resizerSize}px; height: {resizerSize}px; left: {0 - resizerOffset}px; top: {0 -
			resizerOffset}px; cursor: {resizerCursor || 'nw-resize'};"
		on:mousedown={(e) => startResize(e, 'nw')}
	/>

	<!-- North -->
	<div
		class="resizer resizer--n"
		class:transparentResizer
		style="width: {horizontalResizerWidth}px; height: {resizerSize}px; left: {resizerSize -
			resizerOffset}px; top: {0 - resizerOffset}px; cursor: {resizerCursor || 'n-resize'};"
		on:mousedown={(e) => startResize(e, 'n')}
	/>

	<!-- North East -->
	<div
		class="resizer resizer--ne resizer--corner"
		class:transparentResizer
		style="width: {resizerSize}px; height: {resizerSize}px; right: {0 - resizerOffset}px; top: {0 -
			resizerOffset}px; cursor: {resizerCursor || 'ne-resize'};"
		on:mousedown={(e) => startResize(e, 'ne')}
	/>

	<!-- East -->
	<div
		class="resizer resizer--e"
		class:transparentResizer
		style="width: {resizerSize}px; height: {verticalResizerHeight}px; top: {resizerSize -
			resizerOffset}px; right: {0 - resizerOffset}px; cursor: {resizerCursor || 'e-resize'};"
		on:mousedown={(e) => startResize(e, 'e')}
	/>

	<!-- South East -->
	<div
		class="resizer resizer--se resizer--corner"
		class:transparentResizer
		style="width: {resizerSize}px; height: {resizerSize}px; right: {0 -
			resizerOffset}px; bottom: {0 - resizerOffset}px; cursor: {resizerCursor || 'se-resize'};"
		on:mousedown={(e) => startResize(e, 'se')}
	/>

	<!-- South -->
	<div
		class="resizer resizer--s"
		class:transparentResizer
		style="width: {horizontalResizerWidth}px; height: {resizerSize}px; left: {resizerSize -
			resizerOffset}px; bottom: {0 - resizerOffset}px; cursor: {resizerCursor || 's-resize'};"
		on:mousedown={(e) => startResize(e, 's')}
	/>

	<!-- South West -->
	<div
		class="resizer resizer--sw resizer--corner"
		class:transparentResizer
		style="width: {resizerSize}px; height: {resizerSize}px; bottom: {0 -
			resizerOffset}px; left: {0 - resizerOffset}px; cursor: {resizerCursor || 'sw-resize'};"
		on:mousedown={(e) => startResize(e, 'sw')}
	/>

	<!-- West -->
	<div
		class="resizer resizer--w"
		class:transparentResizer
		style="width: {resizerSize}px; height: {verticalResizerHeight}px; top: {resizerSize -
			resizerOffset}px; left: {0 - resizerOffset}px; cursor: {resizerCursor || 'w-resize'};"
		on:mousedown={(e) => startResize(e, 'w')}
	/>

	<!-- Content -->
	<div
		class="rectangle__content"
		style="margin: {resizerSize - resizerOffset}px;"
		on:mousedown={onmousedown}
	>
		<slot />
	</div>
</div>

<style>
	.rectangle {
		background-color: #ddd;
		position: absolute;
	}

	.resizer {
		position: absolute;
		background-color: #000;
		opacity: 0.1;
		user-select: none;
	}

	.resizer.transparentResizer {
		opacity: 0;
	}

	.resizer--corner {
		opacity: 0.2;
	}

	.resizer:hover {
		opacity: 0.3;
	}

	.resizer:active {
		opacity: 0.5;
	}

	.resizer.transparentResizer:hover,
	.resizer.transparentResizer:active {
		opacity: 0;
	}

	.rectangle__content {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow: auto;
		padding: 8px;
	}
</style>
