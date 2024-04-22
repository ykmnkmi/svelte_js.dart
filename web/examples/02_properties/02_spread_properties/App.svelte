<script type="application/dart">
	import 'Info.svelte';

	var properties = $object(
		name: 'svelte',
		version: 5,
		speed: 'blazing',
		website: 'https://svelte.dev'
	);
</script>

<Info {...properties} />