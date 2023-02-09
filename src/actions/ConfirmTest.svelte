<script>
	import { customConfirm } from './confirm';

	let isFileDeleted = false;
</script>

{#if isFileDeleted}
	<p style="font-style: italic">File deleted.</p>
	<button on:click={() => (isFileDeleted = false)}>Undo</button>
{:else}
	<p>File No. 321874</p>
{/if}

{#if !isFileDeleted}
	<button
		use:customConfirm={{
			message: 'Are you sure?',
			positiveText: 'Yes.',
			negativeText: 'NO!'
		}}
		on:confirm={(e) => (e.detail.result ? (isFileDeleted = true) : {})}
	>
		Delete
	</button>
{/if}
