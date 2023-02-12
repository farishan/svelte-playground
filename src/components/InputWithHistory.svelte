<script>
	import { createEventDispatcher } from 'svelte';

	export let value = '';

	const dispatch = createEventDispatcher();
	const history = [];
	let inputElement;
	let pointer = -1;
	let cache = '';

	const onsubmit = () => {
		console.log(history);
		dispatch('submit', value);

		if (value === '') return;

		history.push(value);
		value = '';
		cache = '';
		pointer = -1;
	};

	const handlePrev = () => {
		const isEmpty = !value || value === '';
		const isFirst = pointer === -1;

		if (isFirst && !isEmpty) {
			cache = value;
		}

		if (isFirst) {
			pointer = history.length - 1;
		} else {
			if (pointer > 0) {
				pointer = pointer - 1;
			}
		}

		value = history[pointer];
		window.requestAnimationFrame(function () {
			inputElement.select();
		});
	};

	const handleNext = () => {
		if (pointer === -1) return;

		if (pointer < history.length - 1) {
			pointer = pointer + 1;
			value = history[pointer];
			window.requestAnimationFrame(function () {
				inputElement.select();
			});
		} else {
			pointer = -1;
			value = cache;
		}
	};

	const KEY_ACTION_MAP = {
		Enter: onsubmit,
		ArrowUp: handlePrev,
		ArrowDown: handleNext
	};

	function onkeydown(e) {
		if (!KEY_ACTION_MAP[e.key]) return;
		KEY_ACTION_MAP[e.key]();
	}
</script>

<input bind:this={inputElement} bind:value on:keydown={onkeydown} />
