<script type="application/dart">
	import 'package:web/web.dart';

	void Function() once(void Function()? handler) {
		return () {
			if (handler != null) {
				handler!();
				handler = null;
			}
		};
	}

	void handleClick(Event event) {
		window.alert('no more alerts');
	}
</script>

<button onclick={once(handleClick)}>Click me</button>