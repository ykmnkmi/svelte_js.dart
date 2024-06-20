<script type="application/dart">
	import 'package:svelte_js/svelte_js.dart';
	import 'package:web/web.dart';

	import 'Outer.svelte';

	void handleMessage(ComponentEvent<({String text})> event) {
		window.alert(event.detail.text);
	}
</script>

<Inner on:message={handleMessage} />