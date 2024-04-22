<script type="application/dart">
	import 'package:web/web.dart';

	import 'Inner.svelte';

	void handleMessage(({String text}) message) {
		window.alert(message.text);
	}
</script>

<Inner message={handleMessage} />