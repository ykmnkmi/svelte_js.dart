<script type="application/dart">
	import 'Info.svelte';

	var properties = InfoProperties(
		name: 'svelte',
		version: 5,
		speed: 'blazing',
		website: 'https://svelte.dev'
	);
</script>

<Info {...properties} />