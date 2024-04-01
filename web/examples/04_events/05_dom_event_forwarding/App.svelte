<script type="application/dart">
	import 'package:web/web.dart';

	import 'CustomButton.svelte';

	void handleClick() {
		window.alert('clicked');
	}
</script>

<CustomButton on:click={handleClick} />
