<script type="application/dart">
	import 'Info.svelte';

	var properties = $object(
		name: 'svelte',
		version: 3,
		speed: 'blazing',
		website: 'https://svelte.dev'
	);
</script>

<Info {...properties} />