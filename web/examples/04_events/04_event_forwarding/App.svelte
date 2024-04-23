<script type="application/dart">
	import 'package:web/web.dart';

	import 'Outer.svelte';

	void handleMessage(({String text}) message) {
		window.alert(message.text);
	}
</script>

<Outer message={handleMessage} />