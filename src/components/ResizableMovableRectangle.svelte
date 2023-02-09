<script>
	import { onMount } from 'svelte';

	export let settings = {};

	const MIN_SIZE = 40;

	let minWidth = settings.minWidth || MIN_SIZE;
	let minHeight = settings.minHeight || MIN_SIZE;
	let resizerSize = 8;
	let resizable = settings.resizable || false;
	let movable = settings.movable || false;
	let width = settings.width || 100;
	let height = settings.height || 100;
	let left = settings.left || 0;
	let top = settings.top || 0;
	let backgroundColor = settings.backgroundColor || '#ddd';
	let resizerOffset = 8;
	let floating = settings.floating || false;

	$: horizontalResizerWidth = width - resizerSize * 2 + resizerOffset * 2;
	$: verticalResizerHeight = height - resizerSize * 2 + resizerOffset * 2;

	let startPoint = { x: 0, y: 0 };
	let distance = { x: 0, y: 0 };
	let currentDimension = { w: 0, h: 0 };

	let shouldMove = false;
	let shouldResize = false;
	let isMoving = false;
	let isResizing = false;
	let resizerCursor;
	let selectedResizer;

	function handleMousedown(e) {
		shouldMove = true;
		startPoint = { x: e.clientX, y: e.clientY };
		distance = { x: startPoint.x - left, y: startPoint.y - top };
	}

	function resize(e) {
		if (!selectedResizer) return;

		if (selectedResizer.includes('n')) {
			if (currentDimension.h - (e.clientY - startPoint.y) - minHeight > 0) {
				height = currentDimension.h - (e.clientY - startPoint.y);
				top = e.clientY - distance.y;
			}
			// self.body.style.maxHeight =
			//     self.container.offsetHeight -
			//     self.head.offsetHeight +
			//     "px";
		} else if (selectedResizer.includes('s')) {
			if (currentDimension.h + (e.clientY - startPoint.y) - minHeight > 0) {
				height = currentDimension.h + (e.clientY - startPoint.y);
			}
			// self.body.style.maxHeight =
			//     self.container.offsetHeight -
			//     self.head.offsetHeight +
			//     "px";
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

	function handleMousemove(e) {
		if (shouldMove) {
			isMoving = true;
			document.body.style.cursor = 'grabbing';
			resizerCursor = 'grabbing';
			left = e.clientX - distance.x;
			top = e.clientY - distance.y;
		} else if (shouldResize) {
			isResizing = true;
			resize(e);
		}
	}

	function handleMouseup() {
		shouldMove = false;
		isMoving = false;
		isResizing = false;

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

	onMount(() => {
		window.addEventListener('mousemove', handleMousemove);
		window.addEventListener('mouseup', handleMouseup);
		window.addEventListener('mouseleave', handleMouseup);
		return () => {
			window.removeEventListener('mousemove', handleMousemove);
			window.removeEventListener('mouseup', handleMouseup);
			window.removeEventListener('mouseleave', handleMouseup);
		};
	});
</script>

<div
	class="rectangle"
	style="width: {width}px; height: {height}px; background-color: {backgroundColor}; position: {floating
		? 'absolute'
		: 'relative'}; left: {left}px; top: {top}px; min-width: {minWidth}px; min-height: {minHeight}px;"
>
	{#if resizable}
		<!-- North West -->
		<div
			class="resizer resizer--nw resizer--corner"
			style="width: {resizerSize}px; height: {resizerSize}px; left: {0 - resizerOffset}px; top: {0 -
				resizerOffset}px; cursor: {resizerCursor || 'nw-resize'};"
			on:mousedown={(e) => startResize(e, 'nw')}
		/>

		<!-- North -->
		<div
			class="resizer resizer--n"
			style="width: {horizontalResizerWidth}px; height: {resizerSize}px; left: {resizerSize -
				resizerOffset}px; top: {0 - resizerOffset}px; cursor: {resizerCursor || 'n-resize'};"
			on:mousedown={(e) => startResize(e, 'n')}
		/>

		<!-- North East -->
		<div
			class="resizer resizer--ne resizer--corner"
			style="width: {resizerSize}px; height: {resizerSize}px; right: {0 -
				resizerOffset}px; top: {0 - resizerOffset}px; cursor: {resizerCursor || 'ne-resize'};"
			on:mousedown={(e) => startResize(e, 'ne')}
		/>

		<!-- East -->
		<div
			class="resizer resizer--e"
			style="width: {resizerSize}px; height: {verticalResizerHeight}px; top: {resizerSize -
				resizerOffset}px; right: {0 - resizerOffset}px; cursor: {resizerCursor || 'e-resize'};"
			on:mousedown={(e) => startResize(e, 'e')}
		/>

		<!-- South East -->
		<div
			class="resizer resizer--se resizer--corner"
			style="width: {resizerSize}px; height: {resizerSize}px; right: {0 -
				resizerOffset}px; bottom: {0 - resizerOffset}px; cursor: {resizerCursor || 'se-resize'};"
			on:mousedown={(e) => startResize(e, 'se')}
		/>

		<!-- South -->
		<div
			class="resizer resizer--s"
			style="width: {horizontalResizerWidth}px; height: {resizerSize}px; left: {resizerSize -
				resizerOffset}px; bottom: {0 - resizerOffset}px; cursor: {resizerCursor || 's-resize'};"
			on:mousedown={(e) => startResize(e, 's')}
		/>

		<!-- South West -->
		<div
			class="resizer resizer--sw resizer--corner"
			style="width: {resizerSize}px; height: {resizerSize}px; bottom: {0 -
				resizerOffset}px; left: {0 - resizerOffset}px; cursor: {resizerCursor || 'sw-resize'};"
			on:mousedown={(e) => startResize(e, 'sw')}
		/>

		<!-- West -->
		<div
			class="resizer resizer--w"
			style="width: {resizerSize}px; height: {verticalResizerHeight}px; top: {resizerSize -
				resizerOffset}px; left: {0 - resizerOffset}px; cursor: {resizerCursor || 'w-resize'};"
			on:mousedown={(e) => startResize(e, 'w')}
		/>
	{/if}

	<div
		class="rectangle__content"
		style="margin: {resizable ? resizerSize - resizerOffset : 0}px; cursor: {movable && isMoving
			? 'grabbing'
			: movable
			? 'grab'
			: 'auto'}"
		on:mousedown={handleMousedown}
	>
		<slot />
	</div>
</div>

<style>
	/* .rectangle {
        overflow: auto;
    } */

	.resizer {
		position: absolute;
		background-color: #eee;
		opacity: 0.5;
		user-select: none;
	}

	.rectangle__content {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow: auto;
		padding: 8px;
	}

	.resizer:hover {
		background-color: #222;
	}

	.resizer:active {
		background-color: yellow;
	}

	.resizer--corner {
		background-color: #ddd;
	}

	/* .resizer--nw {
        cursor: nw-resize;
    }

    .resizer--n {
        cursor: n-resize;
    }

    .resizer--ne {
        cursor: ne-resize;
    }

    .resizer--e {
        cursor: e-resize;
    }

    .resizer--se {
        cursor: se-resize;
    }

    .resizer--s {
        cursor: s-resize;
    }

    .resizer--sw {
        cursor: sw-resize;
    }

    .resizer--w {
        cursor: w-resize;
    } */
</style>
