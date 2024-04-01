<script type="application/dart">
	import 'package:svelte_js/svelte_js.dart' show createEventDispatcher;

	import 'message.dart';

	var dispatch = createEventDispatcher();

	void sayHello() {
		dispatch('message', Message(text: 'Hello!'));
	}
</script>

<button on:click={sayHello}>Click to say hello</button>