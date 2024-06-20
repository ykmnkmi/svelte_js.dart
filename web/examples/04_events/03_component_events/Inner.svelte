<script type="application/dart">
	import 'package:svelte_js/svelte_js.dart';

	var dispatch = createEventDispatcher();

	void sayHello() {
		dispatch('message', (text: 'Hello!'));
	}
</script>

<button on:click={sayHello}>Click to say hello</button>