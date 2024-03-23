<script type="application/dart">
	import 'package:svelte_js/svelte_js.dart' show TypedEvent;
	import 'package:web/web.dart';

	import 'Inner.svelte';

	void handleMessage(TypedEvent<Message> event) {
		window.alert(event.detail.text);
	}
</script>

<Inner on:message={handleMessage} />