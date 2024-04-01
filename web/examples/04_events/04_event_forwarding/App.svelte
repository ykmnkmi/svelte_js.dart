<script type="application/dart">
	import 'package:svelte_js/svelte_js.dart' show TypedEvent;
	import 'package:web/web.dart';

	import 'message.dart';
	import 'Outer.svelte';

	void handleMessage(TypedEvent<Message> event) {
		window.alert(event.detail.text);
	}
</script>

<Outer on:message={handleMessage} />