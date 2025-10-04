<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import favicon from '$lib/assets/favicon.svg';
	import DarkToggle from "$lib/DarkToggle.svelte";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher/>
<header class='flex justify-end px-4 py-2 bg-sidebar shadow-md'>
    <DarkToggle/>
</header>
<main class='flex-1'>
	{@render children?.()}
</main>
<footer class='bg-accent px-4 py-2 text-[10pt]'>
	&copy; 2025 Daniel Becher
</footer>