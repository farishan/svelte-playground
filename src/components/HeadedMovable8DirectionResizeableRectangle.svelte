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
	let movable = settings.movable === false ? false : true;
	let resizable = settings.resizable === false ? false : true;

	let startPoint = { x: 0, y: 0 };
	let distance = { x: 0, y: 0 };
	let currentDimension = { w: 0, h: 0 };

	let shouldResize = false;
	let shouldMove = false;
	let resizerCursor;
	let selectedResizer;

	let headHeight = 0;
	let bodyMaxHeight = height;

	$: horizontalResizerWidth = width - resizerSize * 2 + resizerOffset * 2;
	$: verticalResizerHeight = height - resizerSize * 2 + resizerOffset * 2;

	function onmousedown(e) {
		startPoint = { x: e.clientX, y: e.clientY };
		distance = { x: startPoint.x - left, y: startPoint.y - top };
	}

	function resize(e) {
		/* note: this function will be called on mouse move. */

		if (!resizable || !selectedResizer) return;

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

		bodyMaxHeight = height - headHeight - 1;
	}

	function move(e) {
		if (!movable) return;
		left = e.clientX - distance.x;
		top = e.clientY - distance.y;
	}

	function onmousemove(e) {
		if (shouldResize) resize(e);
		else if (shouldMove) move(e);
	}

	function onmouseup() {
		document.body.style.cursor = 'auto';
		resizerCursor = undefined;
		selectedResizer = undefined;
		shouldResize = false;
		shouldMove = false;
	}

	function startResize(e, newSelectedResizer) {
		shouldResize = true;
		selectedResizer = newSelectedResizer;
		startPoint = { x: e.clientX, y: e.clientY };
		distance = { x: startPoint.x - left, y: startPoint.y - top };
		currentDimension = { w: width, h: height };
	}

	function handleMove() {
		if (shouldResize) return;

		shouldMove = true;
	}
</script>

<svelte:window on:mousemove={onmousemove} on:mouseup={onmouseup} on:mouseleave={onmouseup} />

<div
	bind:this={dom}
	class="rectangle"
	style="width: {width}px; height: {height}px; left: {left}px; top: {top}px; min-width: {minWidth}px; min-height: {minHeight}px;"
>
	{#if resizable}
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
			style="width: {resizerSize}px; height: {resizerSize}px; right: {0 -
				resizerOffset}px; top: {0 - resizerOffset}px; cursor: {resizerCursor || 'ne-resize'};"
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
	{/if}

	<!-- Content -->
	<div class="rectangle__content" style="margin: {resizerSize - resizerOffset}px;">
		<div
			class="rectangle__head"
			class:movable
			on:mousedown={(e) => {
				onmousedown(e);
				handleMove(e);
			}}
			bind:offsetHeight={headHeight}
		>
			<slot name="head" />
		</div>

		<div class="rectangle__body" style="max-height: {bodyMaxHeight}px;">
			<slot />
		</div>
	</div>
</div>

<style>
	.rectangle {
		background-color: #ddd;
		position: absolute;
	}

	.resizer {
		position: absolute;
		opacity: 1;
		user-select: none;
		background-color: #ccc;
	}

	.resizer:hover {
		background-color: #bbb;
	}

	.resizer:active {
		background-color: #aaa;
	}

	.resizer.transparentResizer {
		opacity: 0;
	}

	.resizer--corner {
		background-color: #bbb;
	}

	.resizer--corner:hover {
		background-color: #666;
	}

	.resizer--corner:active {
		background-color: #000;
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
	}

	.rectangle__head,
	.rectangle__body {
		box-sizing: border-box;
	}

	.rectangle__head {
		border-bottom: 1px solid #aaa;
		padding: 4px;
	}

	.rectangle__head.movable {
		cursor: grab;
		user-select: none;
	}

	.rectangle__head.movable:hover {
		background-color: #ccc;
	}

	.rectangle__head.movable:active {
		background-color: #bbb;
		cursor: grabbing;
	}

	.rectangle__body {
		padding: 4px;
		overflow: auto;
	}
</style>
