<script type="application/dart">
	import 'package:web/web.dart';

	void handleClick(Event event) {
		window.alert('no more alerts');
	}
</script>

<button on:click|once={handleClick}>Click me</button>