<script>
	let dom;
	export const getDOM = () => dom;

	let top = 0;
	let left = 0;
	let isMoving = false;
	let shouldMove = false;
	let distance = { x: 0, y: 0 };
	let startPoint = { x: 0, y: 0 };
	let isFloating = true; // true = absolute; false = relative;

	const onmousedown = (e) => {
		shouldMove = true;
		isMoving = true;
		startPoint = { x: e.clientX, y: e.clientY };
		distance = { x: startPoint.x - left, y: startPoint.y - top };
	};

	const onmousemove = (e) => {
		if (!shouldMove) return;

		document.body.style.cursor = 'grabbing';
		left = e.clientX - distance.x;
		top = e.clientY - distance.y;
	};

	const onmouseup = () => {
		shouldMove = false;
		isMoving = false;

		document.body.style.cursor = 'auto';
	};
</script>

<svelte:window on:mousemove={onmousemove} on:mouseup={onmouseup} on:mouseleave={onmouseup} />

<div
	bind:this={dom}
	class:isMoving
	class:isFloating
	class="rectangle"
	style="left: {left}px; top: {top}px;"
>
	<div class="rectangle__head" on:mousedown={onmousedown}>
		<slot name="head" />
	</div>

	<div class="rectangle__body">
		<slot />
	</div>
</div>

<style>
	.rectangle {
		background-color: #ddd;
		user-select: none;
		overflow: auto;
		position: relative;
		width: 100px;
		height: 100px;
	}

	.rectangle.isFloating {
		position: absolute;
	}

	.rectangle__head {
		cursor: grab;
		border-bottom: 1px solid #666;
		padding: 4px;
	}

	.rectangle__body {
		padding: 4px;
	}

	.isMoving {
		outline: 1px solid #666;
	}

	.isMoving .rectangle__head {
		cursor: grabbing;
	}
</style>
