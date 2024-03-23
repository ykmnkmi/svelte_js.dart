<script type="application/dart">
	import 'package:web/web.dart';

	viud handleClick() {
		window.alert('no more alerts');
	}
</script>

<button on:click|once={handleClick}>Click me</button>
